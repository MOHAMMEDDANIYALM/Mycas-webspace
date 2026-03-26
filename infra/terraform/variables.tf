variable "location" {
  description = "Azure region"
  type        = string
  default     = "East US"
}

variable "resource_group_name" {
  description = "Resource group name"
  type        = string
}

variable "app_service_plan_name" {
  description = "App Service plan name"
  type        = string
}

variable "acr_name" {
  description = "Azure Container Registry name (must be globally unique, alphanumeric only)"
  type        = string
}

variable "frontend_webapp_name" {
  description = "Frontend App Service name (must be globally unique)"
  type        = string
}

variable "backend_webapp_name" {
  description = "Backend App Service name (must be globally unique)"
  type        = string
}

variable "frontend_image_name" {
  description = "Frontend image repository name inside ACR"
  type        = string
  default     = "frontend"
}

variable "backend_image_name" {
  description = "Backend image repository name inside ACR"
  type        = string
  default     = "backend"
}

variable "frontend_image_tag" {
  description = "Frontend image tag to run"
  type        = string
  default     = "latest"
}

variable "backend_image_tag" {
  description = "Backend image tag to run"
  type        = string
  default     = "latest"
}

variable "next_public_api_base_url" {
  description = "Public API URL used by frontend"
  type        = string
}

variable "mongodb_uri" {
  description = "MongoDB connection string"
  type        = string
  sensitive   = true
}

variable "access_token_secret" {
  description = "JWT access token secret"
  type        = string
  sensitive   = true
}

variable "refresh_token_secret" {
  description = "JWT refresh token secret"
  type        = string
  sensitive   = true
}

variable "cors_allowed_origins" {
  description = "CORS allowed origins, comma-separated"
  type        = string
}

variable "frontend_origin" {
  description = "Canonical frontend origin URL"
  type        = string
}

variable "sendgrid_api_key" {
  description = "SendGrid API key"
  type        = string
  sensitive   = true
}

variable "email_from" {
  description = "Verified sender email"
  type        = string
}
