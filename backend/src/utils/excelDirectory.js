const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const DEFAULT_EXCEL_PATH = path.resolve(__dirname, '..', '..', 'emails.xlsx');

let cachedPath = null;
let cachedMtimeMs = null;
let cachedRows = [];

const normalizeString = (value) => String(value || '').trim();
const normalizeEmail = (value) => normalizeString(value).toLowerCase();

const normalizeClassCode = (value) => {
  const raw = normalizeString(value);
  if (!raw) {
    return '';
  }

  return raw.toUpperCase().replace(/\s+/g, '-');
};

const normalizeHeader = (header) => normalizeString(header).toLowerCase().replace(/\s+/g, '');

const getByAliases = (row, aliases) => {
  const entries = Object.entries(row || {});

  for (const [key, value] of entries) {
    if (aliases.includes(normalizeHeader(key))) {
      return value;
    }
  }

  return '';
};

const mapRoleFromExcel = ({ roleValue, courseValue, fullNameValue }) => {
  const roleText = normalizeString(roleValue).toLowerCase();
  const courseText = normalizeString(courseValue).toLowerCase();
  const fullNameText = normalizeString(fullNameValue).toLowerCase();

  const teacherLike =
    roleText.includes('teacher') ||
    roleText.includes('faculty') ||
    roleText.includes('developer') ||
    courseText.includes('teacher') ||
    courseText.includes('faculty') ||
    courseText.includes('developer') ||
    fullNameText.includes('teacher');

  return teacherLike ? 'teacher' : 'student';
};

const parseWorkbookRows = (excelPath) => {
  if (!fs.existsSync(excelPath)) {
    return [];
  }

  const workbook = xlsx.readFile(excelPath);
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    return [];
  }

  const rows = xlsx.utils.sheet_to_json(workbook.Sheets[firstSheetName], {
    defval: '',
    raw: false
  });

  return rows
    .map((row) => {
      const fullName = normalizeString(
        getByAliases(row, ['name', 'fullname', 'full name', 'studentname'])
      );
      const email = normalizeEmail(getByAliases(row, ['email', 'mail']));
      const course = normalizeString(
        getByAliases(row, ['course', 'class', 'classcode', 'class code', 'department'])
      );
      const role = mapRoleFromExcel({
        roleValue: getByAliases(row, ['role', 'designation']),
        courseValue: course,
        fullNameValue: fullName
      });

      if (!fullName || !email) {
        return null;
      }

      const classCode = role === 'student' ? normalizeClassCode(course) : normalizeClassCode(course);

      return {
        fullName,
        email,
        role,
        course,
        classCode
      };
    })
    .filter(Boolean);
};

const getExcelPath = () => process.env.EXCEL_DIRECTORY_PATH || DEFAULT_EXCEL_PATH;

const loadExcelDirectory = () => {
  const excelPath = getExcelPath();

  if (!fs.existsSync(excelPath)) {
    cachedPath = excelPath;
    cachedMtimeMs = null;
    cachedRows = [];
    return cachedRows;
  }

  const stat = fs.statSync(excelPath);
  const mtimeMs = stat.mtimeMs;

  if (cachedPath === excelPath && cachedMtimeMs === mtimeMs) {
    return cachedRows;
  }

  cachedRows = parseWorkbookRows(excelPath);
  cachedPath = excelPath;
  cachedMtimeMs = mtimeMs;

  return cachedRows;
};

const findExcelContactByEmail = (email) => {
  const normalized = normalizeEmail(email);
  const rows = loadExcelDirectory();

  return rows.find((row) => row.email === normalized) || null;
};

module.exports = {
  findExcelContactByEmail,
  loadExcelDirectory
};
