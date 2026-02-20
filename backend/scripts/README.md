# Backend Scripts

## Create Super Admin

To create a super admin account, run:

```bash
npm run seed:admin
```

You will be prompted to enter:
- Full name
- Email address
- Password (minimum 8 characters)

The script will:
- Connect to your MongoDB database
- Check if the email already exists
- Create a new user with `super_admin` role
- Display confirmation with the created user details

**Important Notes:**
- Make sure your `.env` file is configured with `MONGODB_URI`
- The email will be normalized (lowercase, trimmed)
- Passwords are hashed with bcrypt before storage
- You can only create one user per email address
- Use this script for initial admin setup or adding additional admin accounts

## Security

- Never commit admin credentials to version control
- Use strong passwords for admin accounts
- Store admin credentials securely
- Limit the number of super admin accounts
