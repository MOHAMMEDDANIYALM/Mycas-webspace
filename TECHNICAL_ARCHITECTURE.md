# MYCAS Portal - Technical Architecture Document

## Table of Contents
1. [System Overview](#system-overview)
2. [Authentication & Email Pre-Approval](#authentication--email-pre-approval)
3. [Data Models](#data-models)
4. [API Architecture](#api-architecture)
5. [Frontend Architecture](#frontend-architecture)
6. [Dark Mode Implementation](#dark-mode-implementation)
7. [Deployment Architecture](#deployment-architecture)

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    MYCAS College Portal                          │
├─────────────────────┬───────────────────────────────────────────┤
│      Frontend       │            Backend                        │
│   (Next.js 14)      │        (Express.js 4.19)                 │
├─────────────────────┼───────────────────────────────────────────┤
│  Public Pages       │  Auth Routes                              │
│  ├── Landing        │  ├── POST /register (with approval)       │
│  ├── About          │  ├── POST /login                          │
│  ├── Departments    │  ├── POST /refresh                        │
│  ├── Faculty        │  └── POST /logout                         │
│  ├── Contact        │                                           │
│  └── Admission      │  Email Management Routes (Teacher+)       │
│                     │  ├── POST /add (single email)             │
│  Private Pages      │  ├── POST /bulk-add (batch)               │
│  ├── Register       │  ├── GET /list (by classCode)             │
│  ├── Login          │  ├── DELETE /:id (remove approval)        │
│  └── Dashboard      │  └── GET /check-status (public)           │
│      ├── Student    │                                           │
│      ├── Teacher    │  Other Routes                             │
│      ├── Admin      │  ├── Timetable Management                 │
│      └── SuperAdmin │  ├── Bulk Email                          │
│                     │  └── User Management                      │
│  Dark/Light Mode    │                                           │
│  ├── ThemeProvider  │  Middleware                               │
│  └── ThemeToggle    │  ├── Auth (JWT validation)                │
│                     │  ├── Error Handling                       │
│                     │  └── Role-Based Access                    │
│                     │                                           │
│                     │  Models                                   │
│                     │  ├── User                                 │
│                     │  ├── ApprovedEmail (NEW)                  │
│                     │  ├── TimetableEvent                       │
│                     │  └── Others                               │
│                     │                                           │
│                     │  MongoDB/Cosmos DB                        │
│                     │  └── 4+ Collections                       │
└─────────────────────┴───────────────────────────────────────────┘
```

---

## Authentication & Email Pre-Approval

### Design Philosophy

**Problem Statement:**
- Previous system: Students could register freely with any email
- Risk: Unauthorized users, spam accounts, no institutional control
- Solution: Teacher-controlled email pre-approval before student registration

### High-Level Flow Diagram

```
ACTOR: Teacher                    ACTOR: Student
│                                 │
│ Step 1: Add Email               │
├─────────────────────────────────┤
│ Navigate: POST /email-mgmt/add  │
│ Payload: {email, classCode}     │
│ Response: ApprovedEmail created │
│                                 │
│                                 │ Step 2: Attempt Registration
│                                 ├──────────────────────────────
│                                 │ Navigate: POST /auth/register
│                                 │ Payload: {email, password, name}
│                                 │
│                                 ├─ Server checks: ApprovedEmail.findOne
│                                 │
│                                 │ Step 3a: Approved
│                                 │ ├─ Create User with role: 'student'
│                                 │ ├─ Auto-set classCode from approved email
│                                 │ ├─ Mark ApprovedEmail.status = 'registered'
│                                 │ └─ Return accessToken + refreshToken
│                                 │
│                                 │ Step 3b: Not Approved
│                                 │ └─ Return 403 error (not approved)
│                                 │
│                                 │ Step 4: Login
│                                 ├──────────────────────────────
│                                 │ POST /auth/login
│                                 │ Response: {accessToken, refreshToken}
│                                 │
│                                 │ Step 5: Access Dashboard
│                                 ├──────────────────────────────
│                                 │ GET /dashboard (with token)
│                                 │ Response: Student dashboard rendered
```

### Request/Response Cycles

#### Registration Request (NEW - with Approval Check)
```
CLIENT REQUEST:
POST /api/v1/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass@123"
}

SERVER PROCESSING:
1. Validate input
2. Normalize email (lowercase)
3. Check: ApprovedEmail.findOne({ email })
4. If not found → throw 403
5. If found but registered → throw 409
6. If approved:
   a. Hash password
   b. Create User { role: 'student', classCode: approvedEmail.classCode }
   c. Update ApprovedEmail { status: 'registered', registeredAt: now }
   d. Generate tokens (15m access, 14d refresh)

SUCCESS RESPONSE (201):
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "classCode": "BCA-SEM1"
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}

ERROR RESPONSE (403):
{
  "success": false,
  "error": "This email has not been approved for registration. Contact your institution."
}

ERROR RESPONSE (409):
{
  "success": false,
  "error": "This email has already been used to register."
}
```

#### Email Approval Request (NEW - Teacher Only)
```
CLIENT REQUEST:
POST /api/v1/email-management/add
Authorization: Bearer {teacherToken}
Content-Type: application/json

{
  "email": "student@example.com",
  "classCode": "BCA-SEM1",
  "fullName": "Jane Smith",
  "rollNumber": "BCA2024001"
}

SERVER PROCESSING:
1. Validate: protect middleware (JWT valid?)
2. Validate: authorizeRoles('teacher', 'promo_admin', 'super_admin')
3. Validate: email format
4. Check: ApprovedEmail.findOne({ email }) - prevent duplicates
5. Create ApprovedEmail {
   email: normalized,
   classCode: uppercase,
   fullName,
   rollNumber,
   approvedBy: teacher._id,
   status: 'approved'
}

SUCCESS RESPONSE (201):
{
  "success": true,
  "message": "Student email approved successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "student@example.com",
    "classCode": "BCA-SEM1",
    "status": "approved",
    "approvedBy": "507f1f77bcf86cd799439010",
    "createdAt": "2026-02-20T10:00:00Z"
  }
}

ERROR RESPONSE (400 - Duplicate):
{
  "success": false,
  "error": "This email has already been approved."
}
```

### Authentication State Machine

```
┌─────────────────┐
│   Not Signed   │
│      In        │
└────────┬────────┘
         │
         │ POST /login with credentials
         ↓
    ┌─────────────┐
    │ Validating  │
    └────┬────────┘
         │
         │ Email + Password valid?
         ├─── NO ──→ Return 401 ──┐
         │                        │
         │ YES                     │
         ↓                        │
    ┌──────────────┐              │
    │   Generate  │              │
    │   Tokens    │              │
    └────┬────────┘              │
         │                        │
         │ Access (15m)           │
         │ Refresh (14d)          │
         ↓                        │
    ┌──────────────┐              │
    │   Signed    │              │
    │     In      │←─────────────┘
    └────┬────────┘
         │
         │ accessToken expired?
         │
         ├─ YES ──→ POST /refresh ──→ New Access Token
         │
         │ refreshToken expired?
         │
         └─ YES ──→ Return to "Not Signed In"
```

### Token Structure

```javascript
ACCESS TOKEN (JWT)
{
  header: {
    alg: "HS256",
    typ: "JWT"
  },
  payload: {
    userId: "507f1f77bcf86cd799439011",
    email: "user@example.com",
    role: "student", // or teacher, promo_admin, super_admin
    iat: 1708416000,
    exp: 1708417900 // 15 minutes later
  },
  signature: HMAC(
    base64(header) + "." + base64(payload),
    ACCESS_TOKEN_SECRET
  )
}

REFRESH TOKEN (JWT)
{
  header: { alg: "HS256", typ: "JWT" },
  payload: {
    userId: "507f1f77bcf86cd799439011",
    iat: 1708416000,
    exp: 1710835200 // 14 days later
  },
  signature: HMAC(...)
}
```

---

## Data Models

### User Model

```javascript
{
  _id: ObjectId,
  fullName: String (required),
  email: String (required, unique, lowercase),
  password: String (hashed with bcryptjs),
  role: Enum ['student', 'teacher', 'promo_admin', 'super_admin'],
  classCode: String (auto-set from ApprovedEmail for students),
  classId: String (same as classCode),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- email (unique)
- role
- classCode
```

### ApprovedEmail Model (NEW)

```javascript
{
  _id: ObjectId,
  email: String (required, unique, lowercase, trim),
  classCode: String (required, uppercase, trim),
  fullName: String (optional, trim),
  rollNumber: String (optional, trim),
  approvedBy: ObjectId (ref: 'User', required),
  status: Enum ['pending', 'approved', 'registered'],
  registeredAt: Date (null until student registers),
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- email: { unique: true }
- classCode: 1
- approvedBy: 1, classCode: 1 (for teacher's class emails)
- status: 1 (for queries like "find all registered")

Lifecycle:
1. Created: status='approved' (by teacher)
2. Registered: status='registered' + registeredAt set (when student signs up)
3. Deleted: removed by teacher (if needed) - only if status != 'registered'
```

### TimetableEvent Model

```javascript
{
  _id: ObjectId,
  classCode: String,
  subject: String,
  instructor: String,
  day: String,
  startTime: String,
  endTime: String,
  room: String,
  semester: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Entity Relationships

```
User (Teacher/Admin)
  ↓ (1-to-Many)
  ApprovedEmail
    ↓
  User (Student)
    ↓ (1-to-Many through classCode)
    TimetableEvent

Example:
Teacher "Mr. Smith" (userId: A)
  → Approves 30 students in "BCA-SEM1"
    → Creates 30 ApprovedEmail documents with approvedBy: A
    → Each student registers using approved email
    → User created with classCode: "BCA-SEM1"
    → ApprovedEmail marked as registered
    → Student can view timetable where classCode matches
```

---

## API Architecture

### Route Hierarchy & Protection

```
/api/v1/
│
├── auth/ (Public access)
│   ├── POST /register (email must be in ApprovedEmail)
│   ├── POST /login (any registered user)
│   ├── POST /refresh (auth required)
│   ├── POST /logout (auth required)
│   └── GET /me (auth required)
│
├── email-management/ (Teacher+ only)
│   ├── POST /add (protect + authorizeRoles('teacher', ...))
│   ├── POST /bulk-add (protect + authorizeRoles('teacher', ...))
│   ├── GET /list (protect + authorizeRoles('teacher', ...))
│   ├── DELETE /:id (protect + authorizeRoles('teacher', ...))
│   └── GET /check-status (public - no auth)
│
├── timetable/ (Auth required)
│   ├── GET / (student views own timetable)
│   ├── POST / (teacher/admin adds event)
│   └── DELETE /:id (teacher/admin removes event)
│
├── email/ (Auth required)
│   ├── POST /send-bulk (teacher+ only)
│   └── POST /verify (confirmation step)
│
└── (Future)
    ├── attendance/
    ├── fees/
    ├── announcements/
    └── user/
```

### Middleware Stack

```
Request → Request Object
    ↓
[1] CORS Middleware
    - Allows requests from FRONTEND_ORIGIN only
    ↓
[2] Body Parser (express.json)
    - Parses JSON body
    ↓
[3] Route Handler
    ↓
[4] protect Middleware (if required)
    - Extracts JWT from Authorization header
    - Verifies signature
    - Attaches user object to req.user
    - If no token: return 401
    ↓
[5] authorizeRoles Middleware (if required)
    - Checks req.user.role
    - Matches against allowed roles
    - If not authorized: return 403
    ↓
[6] Controller Function
    - asyncHandler wraps in try-catch
    - Handles business logic
    - Throws AppError for errors
    ↓
[7] Error Middleware
    - Catches all errors (sync & async)
    - Formats error response
    - Returns status + error message

Response → Client
```

### Error Handling Pattern

```javascript
// AppError utility
class AppError {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

// Throwing errors
throw new AppError('Email not approved', 403);
throw new AppError('Unauthorized', 401);

// Catching errors
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message
  });
});
```

---

## Frontend Architecture

### Component Hierarchy

```
RootLayout [has ThemeProvider]
├── Providers (AuthProvider, QueryProvider, ThemeProvider)
│   └── Page Components
│       ├── Public Pages
│       │   ├── LandingPage (PublicLanding.jsx)
│       │   │   ├── Navigation [ThemeToggle]
│       │   │   ├── Hero Section
│       │   │   └── CTA Buttons
│       │   ├── About (/about/page.jsx)
│       │   ├── Departments (/departments/page.jsx)
│       │   ├── Faculty (/faculty/page.jsx)
│       │   ├── Contact (/contact/page.jsx)
│       │   └── Admission (/admission/page.jsx)
│       │
│       ├── Auth Pages
│       │   ├── Login (/login/page.jsx)
│       │   └── Register (/register/page.jsx) [email pre-approval note]
│       │
│       └── Private Pages [wrapped in AuthGuard]
│           └── Dashboard (/dashboard/page.jsx)
│               ├── StudentDashboard [6 cards]
│               ├── TeacherDashboard [6 cards + email mgmt]
│               ├── AdminDashboard [4 cards]
│               └── SuperAdminDashboard [6 cards]
```

### State Management Pattern

```
Global State:
├── Auth (via AuthProvider)
│   └── { user, token, login(), logout(), register() }
│
├── Theme (via ThemeProvider)
│   └── { isDark, toggleTheme() }
│
└── Queries (via QueryProvider - React Query)
    └── Caching & Background refetch

Component State:
└── Local useState for form data, UI toggles
```

### Dark Mode CSS Pattern

```jsx
// Component example
<div className="
  bg-white dark:bg-gray-900
  text-slate-900 dark:text-gray-100
  border border-gray-200 dark:border-gray-700
">
  Content
</div>

// CSS applies when:
// 1. document.documentElement.classList contains 'dark'
// 2. OR system prefers-color-scheme: dark
```

### Navigation Flow

```
User lands on /
    ↓ [Not authenticated]
Landing page (public)
    ├─ Click "About" → /about (public)
    ├─ Click "Login" → /login → POST /auth/login
    │   ↓ [Success]
    │   Store token in localStorage
    │   Redirect to /dashboard
    │   ↓ [Dashboard render]
    │   Check user.role
    │   ├─ student → StudentDashboard
    │   ├─ teacher → TeacherDashboard
    │   ├─ promo_admin → AdminDashboard
    │   └─ super_admin → SuperAdminDashboard
    │
    └─ Click "Register" → /register
        ├─ See email pre-approval notice
        ├─ Enter email (must be approved)
        └─ Form submission → POST /auth/register
            ├─ Success → Redirect to /login
            └─ Error (403) → Show "Email not approved" message
```

---

## Dark Mode Implementation

### ThemeProvider System

```javascript
// Context creation
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialize theme
    const saved = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialDark = saved ? saved === 'dark' : systemDark;
    setIsDark(initialDark);
    applyTheme(initialDark);
    setMounted(true);
  }, []);

  const applyTheme = (dark) => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleTheme = () => {
    applyTheme(!isDark);
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {mounted ? children : <div>Loading...</div>}
    </ThemeContext.Provider>
  );
}
```

### CSS Variables Approach (Optional - Not Currently Used)

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1f2937;
}

html.dark {
  --color-bg: #111827;
  --color-text: #f3f4f6;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: background-color 300ms, color 300ms;
}
```

### Tailwind Dark Mode Classes

```jsx
// Tailwind applies styles when .dark class exists on html

// Light mode
<div className="bg-white text-slate-900">

// Dark mode (replaces above)
<div className="dark:bg-gray-900 dark:text-gray-100">

// Combined
<div className="bg-white dark:bg-gray-900 text-slate-900 dark:text-gray-100">
```

---

## Deployment Architecture

### Development Environment

```
Developer Machine
├── docker-compose.yml
│   ├── mongodb (container)
│   ├── backend (Node.js, port 5000)
│   └── frontend (Next.js, port 3000)
│
Local Files
├── .env (backend config)
├── frontend/.env.local (frontend config)
└── volumes
    └── mongodb_data (persistent)
```

### Production Environment (Azure)

```
GitHub Repository
    ↓ [git push main]
GitHub Actions Workflows
    ├── workflow_backend.yml
    │   ├── Build Docker image
    │   ├── Push to ACR (Azure Container Registry)
    │   └── Deploy to Azure Web App (mycasinstitue)
    │
    └── workflow_frontend.yml
        ├── Build Next.js
        ├── Build Docker image
        ├── Push to ACR
        └── Deploy to Azure Web App (mycasinstitute)

Azure Stack
├── Container Registry (mycas.azurecr.io)
│   ├── backend:latest
│   └── frontend:latest
│
├── Cosmos DB (MongoDB API)
│   ├── users collection
│   ├── approvedemails collection
│   ├── timetableevents collection
│   └── indexes
│
└── Web Apps
    ├── mycasinstitute (HTTPS)
    └── mycasinstitue (API server)
```

### CI/CD Pipeline

```
[Developer]
    ↓ git push origin main
[GitHub Repository]
    ↓ webhook trigger
[GitHub Actions]
    ├─ Checkout code
    ├─ Setup environment
    ├─ Install dependencies
    ├─ Build Docker image
    ├─ Authenticate to ACR
    ├─ Push image
    └─ Trigger Azure deployment
        ↓
[Azure Web App]
    ├─ Pull new image from ACR
    ├─ Stop old container
    ├─ Start new container
    └─ Health check
        ├─ Success: Done
        └─ Failure: Rollback to previous
```

---

## Security Considerations

### Authentication Security
- ✅ Passwords hashed with bcryptjs
- ✅ JWT tokens with secret
- ✅ AccessToken short-lived (15 min)
- ✅ RefreshToken longer-lived (14 days)
- ✅ Token stored in httpOnly cookie (if configured)

### Authorization Security
- ✅ Role-based access control
- ✅ `protect` middleware verifies JWT
- ✅ `authorizeRoles` middleware checks role
- ✅ Email pre-approval prevents unauthorized signups

### Data Security
- ✅ MongoDB indexes on sensitive fields
- ✅ Email field unique constraint
- ✅ Input validation on all routes
- ✅ XSS protection via Next.js sanitization

### Network Security
- ✅ CORS restricted to frontend origin
- ✅ HTTPS in production
- ✅ No hardcoded secrets in code
- ✅ Secrets in Azure Key Vault

---

## Scalability Considerations

### Database Optimization
- Current: Single MongoDB instance
- Optimization: Query indexes on email, classCode, approvedBy+classCode
- Future: Sharding if student count > 100k

### API Performance
- Current: Single backend instance
- Optimization: Load balancer in front of multiple instances
- Caching: Redis for session/token caching

### Frontend Performance
- Current: Next.js with SSR
- Optimization: Static generation for public pages
- Caching: CDN for static assets

---

**Document Version:** 2.0.0
**Last Updated:** February 20, 2026

