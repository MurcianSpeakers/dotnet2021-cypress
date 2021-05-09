terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.46.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "dotnet2021-cypress"
    storage_account_name = "dotnet2021tfstate"
    container_name       = "dotnet2021cypress"
    key                  = "dotnet2021cypress.tfstate"
  }
}

provider "azurerm" {
  features {}
  skip_provider_registration = true
}

data "azurerm_client_config" "current" {}

# Input variables 
variable "registry_username" {
  type      = string
  sensitive = true
}

variable "registry_password" {
  type      = string
  sensitive = true
}

# Resource Group
resource "azurerm_resource_group" "dotnet2021cypress" {
  name     = "dotnet2021-cypress"
  location = "North Europe"
}

# App Service Plan
resource "azurerm_app_service_plan" "dotnet2021cypress" {
  name                = "dotnet2021-cypress-sp"
  location            = "West Europe"
  resource_group_name = azurerm_resource_group.dotnet2021cypress.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Free"
    size = "F1"
  }
}

# Azure Container Registry
resource "azurerm_container_registry" "acr" {
  name                = "dotnet2021cypress"
  resource_group_name = azurerm_resource_group.dotnet2021cypress.name
  location            = "West Europe"
  sku                 = "Basic"
  admin_enabled       = true
}

# Web App
resource "azurerm_app_service" "dotnet2021cypress" {
  name                = "dotnet2021-cypress"
  location            = "West Europe"
  resource_group_name = azurerm_resource_group.dotnet2021cypress.name
  app_service_plan_id = azurerm_app_service_plan.dotnet2021cypress.id

  app_settings = {
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = false
    DOCKER_REGISTRY_SERVER_URL          = "https://${azurerm_container_registry.acr.login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME     = var.registry_username
    DOCKER_REGISTRY_SERVER_PASSWORD     = var.registry_password
  }

  site_config {
    use_32_bit_worker_process = true
    always_on                 = false
    linux_fx_version          = "DOCKER|${azurerm_container_registry.acr.login_server}/spa:latest"
  }
}