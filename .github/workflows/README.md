# GitHub Workflows

CI/CD workflows are configured for:

- Backend container: Docker build -> ACR push -> Azure Web App deploy
- Frontend container: Docker build -> ACR push -> Azure Web App deploy

Required repository variables:

- ACR_NAME
- ACR_LOGIN_SERVER
- RESOURCE_GROUP
- BACKEND_IMAGE_NAME
- FRONTEND_IMAGE_NAME
- BACKEND_WEBAPP_NAME
- NEXT_PUBLIC_API_BASE_URL

Required GitHub secrets:

- AZURE_CREDENTIALS (service principal JSON for azure/login)
- MONGODB_URI
- ACCESS_TOKEN_SECRET
- REFRESH_TOKEN_SECRET
- CORS_ALLOWED_ORIGINS
- FRONTEND_ORIGIN
- SENDGRID_API_KEY
- EMAIL_FROM
