# MYCAS Portal - Quick Reference Card

## 🚀 Start Local Development

```bash
# Terminal 1: Start all services
cd college-portal
docker-compose up

# Terminal 2: Watch logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Access points:
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api/v1
# Health: http://localhost:5000/api/v1/health
```

## 🔐 Test Credentials

**Super Admin (Full Access):**
```
Email: mohammeddaniyal848@gmail.com
Password: Admin@123456
Role: super_admin
```

**Teacher Account:**
```
Email: teacher@mycas.edu
Password: Teacher@123456
Role: teacher
```

## 🎯 Key Features Quick Start

### Teacher: Add Student Email (Pre-Approval)
```bash
1. Login as teacher
2. Dashboard → "Add Student Emails" card
3. Enter student email + class code
4. Student can now register with that email
```

### Student: Register With Pre-Approved Email
```bash
1. Go to /register
2. See message: "Your email must be approved by MYCAS Institute"
3. Enter: name, pre-approved email, password
4. Registration succeeds
```

### Everyone: Toggle Dark Mode
```bash
1. Top right of any page → Sun/Moon icon
2. Page switches light ↔ dark
3. Theme persists on reload (localStorage)
```

## 📍 Pages Map

### Public Pages (No Login Required)
```
/                 → Landing page
/about            → About section
/departments      → Departments & programs
/faculty          → Faculty directory
/contact          → Contact form
/admission        → Admission application
/login            → Sign in
/register         → Sign up (requires email approval)
```

### Private Pages (Login Required)
```
/dashboard        → Role-specific dashboard
                    - Student: View classes, timetable, attendance
                    - Teacher: Manage classes, emails, timetable
                    - Admin: Manage users and classes
                    - SuperAdmin: Full system control
```

## 🔌 API Endpoints Cheat Sheet

### Authentication
```bash
# Login
POST /api/v1/auth/login
Body: { email, password }

# Register (email must be pre-approved)
POST /api/v1/auth/register
Body: { fullName, email, password }

# Get current user
GET /api/v1/auth/me
Header: Authorization: Bearer {token}

# Refresh expired token
POST /api/v1/auth/refresh
Header: Authorization: Bearer {refreshToken}

# Logout
POST /api/v1/auth/logout
```

### Email Management (Teacher+ Only)
```bash
# Add single student email
POST /api/v1/email-management/add
Header: Authorization: Bearer {token}
Body: { email, classCode, fullName?, rollNumber? }

# Bulk add emails
POST /api/v1/email-management/bulk-add
Body: { emails: [...], classCode? }

# List approved emails for class
GET /api/v1/email-management/list?classCode=BCA-SEM1

# Check if email is approved (public - no auth needed)
GET /api/v1/email-management/check-status?email=student@example.com

# Delete approved email
DELETE /api/v1/email-management/:id
```

## 🛠️ Common Commands

### In `college-portal/` root directory:

```bash
# Start services
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f [service_name]
  # service_name: backend, frontend, mongodb

# Restart service
docker-compose restart backend

# Remove containers and volumes
docker-compose down -v
```

### In `backend/` directory:

```bash
# Install dependencies
npm install

# Start in development
npm run dev

# Run tests (if configured)
npm test

# Build for production
npm run build
```

### In `frontend/` directory:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production build
npm start
```

## 📊 Database: ApprovedEmail Schema

```javascript
{
  email: "student@example.com",           // Unique, lowercase
  classCode: "BCA-SEM1",                  // Uppercase
  fullName: "John Doe",                   // Optional
  rollNumber: "BCA21001",                 // Optional
  approvedBy: "teacher_user_id",          // Who approved it
  status: "approved",                     // or "registered"
  registeredAt: null,                     // Set when student registers
  createdAt: "2026-02-20T10:00:00Z",
  updatedAt: "2026-02-20T10:00:00Z"
}
```

## 🚨 Troubleshooting Quick Fixes

### "Email has not been approved" error
```
Fix: Login as teacher → Add Student Email → Try registering again
```

### Dark mode not persisting
```
Fix: Clear localStorage → localStorage.clear() in console → Reload
```

### Backend not responding
```
Fix: docker-compose restart backend
```

### MongoDB connection error
```
Fix: docker-compose down -v
     docker-compose up
```

### Port 3000 or 5000 already in use
```
Fix: Change port in docker-compose.yml
     Or: lsof -i :3000  (find process, kill it)
```

## 📝 Files to Modify (Common Tasks)

**To add a new public page:**
```
1. Create: frontend/src/app/pagename/page.jsx
2. Update: frontend/src/components/PublicLanding.jsx (add link)
3. Copy structure from /about/page.jsx
```

**To add a new API endpoint:**
```
1. Create: backend/src/controllers/newController.js
2. Create: backend/src/routes/newRoutes.js
3. Update: backend/src/app.js (mount route)
4. Update: models if needed
```

**To add a new dashboard card:**
```
Edit: frontend/src/app/dashboard/page.jsx
Search for StudentDashboard component and add card
```

**To change colors:**
```
Light mode: frontend/src/app/globals.css (CSS variables)
Dark mode: Same file, html.dark section
Tailwind: Use dark:... prefix in className
```

## 📚 Documentation Files

All in `college-portal/` root:

1. **REFACTORING_SUMMARY.md** - What changed and why
2. **IMPLEMENTATION_GUIDE.md** - How to develop and deploy
3. **TECHNICAL_ARCHITECTURE.md** - Design decisions and data flows
4. **COMPLETION_CHECKLIST.md** - Testing and deployment steps
5. **README.md** - Original project documentation

## ✅ Pre-Deployment Checklist

Before `git push origin main`:

- [ ] `docker-compose up` ✅ All services start
- [ ] Login works (test credentials above)
- [ ] Teacher can add student email
- [ ] Student can register with approved email
- [ ] Dark/light toggle works
- [ ] All pages load without errors
- [ ] No console errors (F12 → Console tab)
- [ ] Responsive on mobile (DevTools, 375px width)

## 🚀 Deploy to Production

```bash
# 1. Test locally (run checklist above)
docker-compose up
# ... test everything ...

# 2. Commit code
git add .
git commit -m "feat: [describe your changes]"

# 3. Push to main
git push origin main

# 4. Watch GitHub Actions
# GitHub → Actions tab → Wait for both workflows to complete (~5 min)

# 5. Verify production
curl https://mycasinstitue-e8dchhexb4exasgy.centralindia-01.azurewebsites.net/api/v1/health
open https://mycasinstitute.azurewebsites.net
```

## 💡 Pro Tips

1. **Use `Ctrl+K` in VSCode** to access Command Palette
2. **`Ctrl+Shift+D`** to open Debug tab
3. **`F12`** to open DevTools (check network, console, storage)
4. **`localStorage`** in console to check theme persistence
5. **`db.approvedemails.find()`** in MongoDB to debug approvals
6. **`npm run build && npm start`** to test production build locally
7. **`git log --oneline`** to see commit history

## 🔗 URLs Reference

### Local Development
```
Frontend:     http://localhost:3000
Backend:      http://localhost:5000
Health Check: http://localhost:5000/api/v1/health
MongoDB:      mongodb://localhost:27017 (internal only)
```

### Production (Azure)
```
Frontend:  https://mycasinstitute.azurewebsites.net
Backend:   https://mycasinstitue-e8dchhexb4exasgy.centralindia-01.azurewebsites.net
Health:    https://mycasinstitue-e8dchhexb4exasgy.centralindia-01.azurewebsites.net/api/v1/health
```

## 📞 Need Help?

1. **Check docs:** IMPLEMENTATION_GUIDE.md (section: Troubleshooting)
2. **Read code:** Comments in relevant files
3. **Git history:** `git log -p` to see what changed
4. **Azure portal:** Check Web App logs for deployment issues

---

**Print this card and keep it handy!**
Version: 2.0.0 | Last Updated: February 20, 2026

