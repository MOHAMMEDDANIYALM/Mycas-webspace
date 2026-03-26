resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_service_plan" "main" {
  name                = var.app_service_plan_name
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  os_type             = "Linux"
  sku_name            = "B1"
}

resource "azurerm_container_registry" "main" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_linux_web_app" "frontend" {
  name                = var.frontend_webapp_name
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  service_plan_id     = azurerm_service_plan.main.id
  https_only          = true

  site_config {
    always_on = true

    application_stack {
      docker_image_name   = "${var.frontend_image_name}:${var.frontend_image_tag}"
      docker_registry_url = "https://${azurerm_container_registry.main.login_server}"
    }
  }

  app_settings = {
    WEBSITES_PORT                   = "3000"
    PORT                            = "3000"
    NODE_ENV                        = "production"
    NEXT_PUBLIC_API_BASE_URL        = var.next_public_api_base_url
    DOCKER_REGISTRY_SERVER_URL      = "https://${azurerm_container_registry.main.login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME = azurerm_container_registry.main.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = azurerm_container_registry.main.admin_password
  }
}

resource "azurerm_linux_web_app" "backend" {
  name                = var.backend_webapp_name
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  service_plan_id     = azurerm_service_plan.main.id
  https_only          = true
  depends_on          = [azurerm_linux_web_app.frontend]

  site_config {
    always_on = true

    application_stack {
      docker_image_name   = "${var.backend_image_name}:${var.backend_image_tag}"
      docker_registry_url = "https://${azurerm_container_registry.main.login_server}"
    }
  }

  app_settings = {
    WEBSITES_PORT                   = "8080"
    PORT                            = "8080"
    NODE_ENV                        = "production"
    MONGODB_URI                     = var.mongodb_uri
    ACCESS_TOKEN_SECRET             = var.access_token_secret
    REFRESH_TOKEN_SECRET            = var.refresh_token_secret
    CORS_ALLOWED_ORIGINS            = var.cors_allowed_origins
    FRONTEND_ORIGIN                 = var.frontend_origin
    COOKIE_SECURE                   = "true"
    COOKIE_SAME_SITE                = "none"
    SENDGRID_API_KEY                = var.sendgrid_api_key
    EMAIL_FROM                      = var.email_from
    DOCKER_REGISTRY_SERVER_URL      = "https://${azurerm_container_registry.main.login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME = azurerm_container_registry.main.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = azurerm_container_registry.main.admin_password
  }
}
