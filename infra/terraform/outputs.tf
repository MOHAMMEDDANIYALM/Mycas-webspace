output "resource_group_name" {
  value = azurerm_resource_group.main.name
}

output "acr_name" {
  value = azurerm_container_registry.main.name
}

output "acr_login_server" {
  value = azurerm_container_registry.main.login_server
}

output "frontend_webapp_name" {
  value = azurerm_linux_web_app.frontend.name
}

output "frontend_url" {
  value = "https://${azurerm_linux_web_app.frontend.default_hostname}"
}

output "backend_webapp_name" {
  value = azurerm_linux_web_app.backend.name
}

output "backend_url" {
  value = "https://${azurerm_linux_web_app.backend.default_hostname}"
}

output "frontend_image_name" {
  value = var.frontend_image_name
}

output "backend_image_name" {
  value = var.backend_image_name
}

output "next_public_api_base_url" {
  value = var.next_public_api_base_url
}
