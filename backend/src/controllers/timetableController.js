const TimetableEvent = require('../models/TimetableEvent');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const buildConflictQuery = ({ classCode, start, end, ignoreId }) => {
  const query = {
    classCode,
    start: { $lt: end },
    end: { $gt: start }
  };

  if (ignoreId) {
    query._id = { $ne: ignoreId };
  }

  return query;
};

const normalizeClassCode = (classCode) => classCode?.trim().toUpperCase();

const validateDates = (start, end) => {
  if (!start || !end) {
    throw new AppError('start and end are required.', 400);
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    throw new AppError('Invalid start/end datetime format.', 400);
  }

  if (endDate <= startDate) {
    throw new AppError('end must be after start.', 400);
  }

  return { startDate, endDate };
};

const listEvents = asyncHandler(async (req, res) => {
  const classCode = normalizeClassCode(req.query.classCode);

  if (!classCode) {
    throw new AppError('classCode query parameter is required.', 400);
  }

  const events = await TimetableEvent.find({ classCode }).sort({ start: 1 });

  res.status(200).json({
    success: true,
    events
  });
});

const createEvent = asyncHandler(async (req, res) => {
  const { title, classCode, room, start, end } = req.body;

  if (!title || !classCode) {
    throw new AppError('title and classCode are required.', 400);
  }

  const normalizedClassCode = normalizeClassCode(classCode);
  const { startDate, endDate } = validateDates(start, end);

  const conflict = await TimetableEvent.findOne(
    buildConflictQuery({
      classCode: normalizedClassCode,
      start: startDate,
      end: endDate
    })
  );

  if (conflict) {
    throw new AppError('Time conflict detected for this class.', 409);
  }

  const event = await TimetableEvent.create({
    title,
    classCode: normalizedClassCode,
    room: room || '',
    start: startDate,
    end: endDate,
    createdBy: req.user._id,
    updatedBy: req.user._id
  });

  res.status(201).json({
    success: true,
    message: 'Timetable event created.',
    event
  });
});

const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existingEvent = await TimetableEvent.findById(id);

  if (!existingEvent) {
    throw new AppError('Timetable event not found.', 404);
  }

  const nextTitle = req.body.title ?? existingEvent.title;
  const nextRoom = req.body.room ?? existingEvent.room;
  const nextClassCode = normalizeClassCode(req.body.classCode ?? existingEvent.classCode);
  const rawStart = req.body.start ?? existingEvent.start;
  const rawEnd = req.body.end ?? existingEvent.end;

  const { startDate, endDate } = validateDates(rawStart, rawEnd);

  const conflict = await TimetableEvent.findOne(
    buildConflictQuery({
      classCode: nextClassCode,
      start: startDate,
      end: endDate,
      ignoreId: id
    })
  );

  if (conflict) {
    throw new AppError('Time conflict detected for this class.', 409);
  }

  existingEvent.title = nextTitle;
  existingEvent.room = nextRoom;
  existingEvent.classCode = nextClassCode;
  existingEvent.start = startDate;
  existingEvent.end = endDate;
  existingEvent.updatedBy = req.user._id;

  await existingEvent.save();

  res.status(200).json({
    success: true,
    message: 'Timetable event updated.',
    event: existingEvent
  });
});

const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const event = await TimetableEvent.findByIdAndDelete(id);

  if (!event) {
    throw new AppError('Timetable event not found.', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Timetable event deleted.'
  });
});

module.exports = {
  listEvents,
  createEvent,
  updateEvent,
  deleteEvent
};
