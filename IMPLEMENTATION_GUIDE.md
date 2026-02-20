# MYCAS Portal - Implementation & Deployment Guide

## Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- MongoDB (via Docker)
- git

### Local Development Setup

#### 1. Clone & Install
```bash
cd college-portal

# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install
```

#### 2. Environment Configuration

**Backend** (`backend/.env`):
```
MONGODB_URI=mongodb://mongodb:27017/mycas
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=noreply@mycas.edu
CORS_ALLOWED_ORIGINS=http://localhost:3000
FRONTEND_ORIGIN=http://localhost:3000
NODE_ENV=development
PORT=5000
```

**Frontend** (`frontend/.env.local`):
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

#### 3. Start Services with Docker Compose
```bash
# From college-portal root directory
docker-compose up

# Or in background
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

**Access Points:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/v1
- Health Check: http://localhost:5000/api/v1/health

#### 4. Initial Data Setup

**Create Test Accounts:**

```bash
# Login as super admin first
Email: mohammeddaniyal848@gmail.com
Password: Admin@123456
```

**Teacher Account:**
```
Email: teacher@mycas.edu
Password: Teacher@123456
Role: teacher
```

**Student Account (Requires Pre-Approval):**
1. Login as teacher
2. Go to teacher dashboard
3. Use "Add Student Email" to approve email
4. Then student can register with that email

---

## Architecture Overview

### Backend Structure
```
backend/
├── src/
│   ├── app.js                    # Express app setup
│   ├── server.js                 # Server startup
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── env.js                # Env validation
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (REFACTORED)
│   │   ├── emailController.js    # Bulk email
│   │   ├── timetableController.js
│   │   └── emailManagementController.js    # NEW - Teacher email mgmt
│   ├── models/
│   │   ├── User.js
│   │   ├── TimetableEvent.js
│   │   └── ApprovedEmail.js      # NEW - Email pre-approval
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── emailRoutes.js
│   │   ├── timetableRoutes.js
│   │   └── emailManagementRoutes.js    # NEW - Teacher endpoints
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── roleMiddleware.js
│   ├── services/
│   │   └── authService.js        # NEW - Auth business logic
│   └── utils/
│       ├── AppError.js
│       ├── asyncHandler.js
│       ├── emailService.js
│       └── token.js
└── docker-compose.yml
```

### Frontend Structure
```
frontend/src/
├── app/
│   ├── page.jsx                  # Landing page
│   ├── login/
│   ├── register/                 # REFACTORED - removed classCode
│   ├── dashboard/page.jsx        # REFACTORED - role-specific dashboards
│   ├── about/page.jsx            # NEW
│   ├── departments/page.jsx      # NEW
│   ├── faculty/page.jsx          # NEW
│   ├── contact/page.jsx          # NEW
│   ├── admission/page.jsx        # NEW
│   ├── layout.jsx                # REFACTORED - ThemeProvider
│   └── globals.css               # REFACTORED - dark mode
├── components/
│   ├── AuthGuard.jsx
│   ├── PublicLanding.jsx         # REFACTORED - new nav links
│   ├── ThemeToggle.jsx           # NEW - dark mode button
│   └── ... (existing components)
└── providers/
    ├── AuthProvider.jsx
    ├── QueryProvider.jsx
    └── ThemeProvider.jsx         # NEW - dark mode context
```

---

## Key Features Breakdown

### 1. Email Pre-Approval System

**Database Model:**
```javascript
ApprovedEmail {
  email: String (unique, lowercase)
  classCode: String (uppercase)
  fullName?: String
  rollNumber?: String
  approvedBy: ObjectId (Teacher._id)
  status: 'pending' | 'approved' | 'registered'
  registeredAt?: Date
  timestamps: true
}
```

**Registration Flow:**
```
Teacher adds email →
ApprovedEmail created (status: approved) →
Student registers with email →
System checks ApprovedEmail.findOne({ email, status: approved }) →
If found: Create User, mark email as registered →
If not found: Throw 403 error
```

### 2. Role-Based Dashboards

**Dashboard Selection Logic:**
```javascript
const role = user.role; // 'student', 'teacher', 'promo_admin', 'super_admin'

renderRoleSpecificContent(role) {
  switch(role) {
    case 'student': return <StudentDashboard />;
    case 'teacher': return <TeacherDashboard />;
    case 'promo_admin': return <AdminDashboard />;
    case 'super_admin': return <SuperAdminDashboard />;
  }
}
```

**Dashboard Features by Role:**
- **Student**: Classes, Timetable, Attendance, Fees, Announcements, Settings
- **Teacher**: Classes, Timetable Editor, **Add Emails**, Bulk Email, Attendance, Settings
- **Admin**: Users, Classes, Reports, Settings
- **Super Admin**: Users, Permissions, Analytics, Maintenance, Logs, Config

### 3. Dark/Light Mode

**Implementation:**
```javascript
// Context: useTheme hook
const { isDark, toggleTheme } = useTheme();

// Persistence
localStorage.setItem('theme', isDark ? 'dark' : 'light');

// System Preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// DOM Application
document.documentElement.classList.add('dark');
```

**Styling Pattern:**
```jsx
<div className="bg-white dark:bg-gray-900 text-slate-900 dark:text-gray-100">
  {/* Content */}
</div>
```

### 4. Teacher Email Management

**Single Email Addition API:**
```javascript
POST /api/v1/email-management/add
Content-Type: application/json
Authorization: Bearer {token}

{
  "email": "student@example.com",
  "classCode": "BCA-SEM1",
  "fullName": "John Doe",
  "rollNumber": "001"
}

Response (201):
{
  "success": true,
  "data": {
    "id": "...",
    "email": "student@example.com",
    "status": "approved",
    "approvedBy": "...",
    "createdAt": "..."
  }
}
```

**Bulk Upload API:**
```javascript
POST /api/v1/email-management/bulk-add
Content-Type: application/json
Authorization: Bearer {token}

{
  "emails": [
    { "email": "student1@example.com", "classCode": "BCA-SEM1" },
    { "email": "student2@example.com", "classCode": "BCA-SEM1" },
    ...
  ]
}

Response (201):
{
  "successful": [
    { "email": "student1@example.com", "status": "approved" },
    ...
  ],
  "failed": [
    { "email": "invalid", "reason": "Invalid email format" },
    ...
  ],
  "duplicates": [
    { "email": "existing@example.com", "reason": "Already approved" }
  ]
}
```

---

## Common Development Tasks

### Add a New Public Page

**Step 1:** Create page file
```bash
mkdir -p frontend/src/app/newpage
touch frontend/src/app/newpage/page.jsx
```

**Step 2:** Use template
```jsx
'use client';

export default function NewPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow">
        {/* Add PublicLanding nav here or import */}
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Your content */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center">
        <p>&copy; 2026 MYCAS Institute. All rights reserved.</p>
      </footer>
    </div>
  );
}
```

**Step 3:** Add navigation link in `PublicLanding.jsx`
```jsx
<Link href="/newpage" className="...">New Page</Link>
```

### Create a New API Endpoint

**Step 1:** Create controller function
```javascript
// controllers/newController.js
export const getNewData = asyncHandler(async (req, res, next) => {
  const data = await Model.find();
  res.status(200).json({
    success: true,
    data
  });
});
```

**Step 2:** Create route
```javascript
// routes/newRoutes.js
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { getNewData } from "../controllers/newController.js";

router.get("/data", protect, authorizeRoles("student", "teacher"), getNewData);
```

**Step 3:** Mount route in app.js
```javascript
import newRoutes from "./routes/newRoutes.js";
app.use("/api/v1/new", newRoutes);
```

### Add a New Database Field

**Step 1:** Update model schema
```javascript
// models/User.js
const userSchema = new Schema({
  // ... existing fields
  newField: {
    type: String,
    required: false,
    default: null
  }
});
```

**Step 2:** Update controller to handle field
```javascript
// In relevant controller
const user = await User.create({
  // ... other fields
  newField: req.body.newField
});
```

**Step 3:** Update frontend form (if applicable)
```jsx
<input 
  type="text" 
  name="newField"
  onChange={handleChange}
  value={formData.newField}
/>
```

### Test Email Pre-Approval Flow

**CLI Test:**
```bash
# Terminal 1: Start services
docker-compose up

# Terminal 2: Login as teacher
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teacher@mycas.edu","password":"Teacher@123456"}'

# Extract accessToken from response

# Terminal 2: Add student email with teacher token
curl -X POST http://localhost:5000/api/v1/email-management/add \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "email":"newstudent@example.com",
    "classCode":"BCA-SEM1",
    "fullName":"New Student"
  }'

# Now student can register with that email
```

---

## Troubleshooting

### Issue: "Email has not been approved" on registration

**Cause:** ApprovedEmail not created for student email

**Solution:**
1. Login as teacher account
2. Navigate to teacher dashboard
3. Click "Add Student Emails"
4. Enter student email and class code
5. Submit
6. Student can now register

### Issue: Dark mode not persisting

**Debug:**
```javascript
// Check localStorage
console.log(localStorage.getItem('theme'));

// Check HTML element
console.log(document.documentElement.classList);
```

**Solution:**
1. Clear browser cache/localStorage
2. Reload page
3. Check ThemeProvider component is wrapping the app

### Issue: Duplicate middleware import error

**Cause:** Using `/middleware/` instead of `/middlewares/`

**Solution:** 
```javascript
// WRONG
import authMiddleware from "../middleware/authMiddleware.js";

// CORRECT
import authMiddleware from "../middlewares/authMiddleware.js";
```

### Issue: ApprovedEmail not created (MongoDB error)

**Debug:**
```javascript
// In MongoDB console
use mycas
db.approvedemails.find().pretty()
```

**Solution:**
1. Ensure MongoDB is running: `docker-compose up`
2. Check schema definition in ApprovedEmail.js
3. Verify indexes were created

---

## Performance Optimization Tips

### Database Queries
```javascript
// Good - with index
await ApprovedEmail.findOne({ email: normalizedEmail });
await ApprovedEmail.find({ approvedBy: teacherId, classCode });

// Bad - full table scan
await ApprovedEmail.find({ status: "approved" });
```

### Frontend Rendering
```jsx
// Good - lazy loading
const StudentDashboard = lazy(() => import('./StudentDashboard'));

// Good - memoization
const DashboardCard = memo(({ title, children }) => {
  return <div>{children}</div>;
});

// Bad - unnecessary re-renders
const renderCard = () => <DashboardCard />;
```

### API Calls
```javascript
// Good - query parameters
GET /api/v1/email-management/list?classCode=BCA-SEM1

// Bad - fetching all then filtering client-side
GET /api/v1/email-management/list (no params, filters in frontend)
```

---

## Security Checklist

Before pushing to production:

- [ ] All secrets in `.env`, not in code
- [ ] JWT secrets are strong (32+ chars)
- [ ] CORS origin matches frontend URL only
- [ ] Password validation enforces stronger rules (if needed)
- [ ] Rate limiting on auth endpoints
- [ ] SQL injection not possible (using MongoDB)
- [ ] XSS protection (Next.js has built-in)
- [ ] HTTPS enabled in production
- [ ] Database backups scheduled
- [ ] Audit logging for admin/teacher actions

---

## Production Deployment

### via GitHub Actions

**Push to main branch:**
```bash
git add .
git commit -m "Feature: Email pre-approval system"
git push origin main
```

**Workflow:**
1. GitHub Actions triggers
2. Backend: Build Docker image → Push to ACR → Update Web App
3. Frontend: Build Next.js → Push to ACR → Update Web App
4. Both deploy simultaneously

**Monitor:**
- GitHub Actions tab for logs
- Azure Portal for Web App status
- Application Insights for errors

### Manual Troubleshooting

**Azure Portal:**
1. Go to Resource Group → Multi-container app
2. Check "settings" → "Configuration"
3. Verify environment variables
4. Check "Logs" for startup errors
5. May need to "Restart" the web app

---

## Support Resources

### Documentation
- `/REFACTORING_SUMMARY.md` - Complete feature list
- Code comments in each file
- Git commit history for context

### Key Files to Review
- `backend/src/models/ApprovedEmail.js` - Email schema
- `backend/src/controllers/emailManagementController.js` - Email logic
- `frontend/src/providers/ThemeProvider.jsx` - Dark mode system
- `frontend/src/app/dashboard/page.jsx` - Dashboard logic

### When to Contact Support
1. Database connection issues → Check MongoDB connection string
2. API not responding → Check backend health endpoint
3. Frontend blank → Check console for errors
4. Deployment failed → Check GitHub Actions logs

---

## Version History

- **v2.0.0** (Current) - Email pre-approval, role dashboards, dark mode
- **v1.0.0** - Initial scaffold with basic auth

---

**Last Updated:** February 20, 2026
**Maintainer:** Development Team

