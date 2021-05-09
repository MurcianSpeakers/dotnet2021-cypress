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

  site_config {
    always_on        = true
    linux_fx_version = "DOCKER|${data.azurerm_container_registry.acr.login_server}/spa:latest"
  }

  app_settings {
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = "false"
    DOCKER_REGISTRY_SERVER_URL          = "https://${data.azurerm_container_registry.acr.login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME     = data.azurerm_container_registry.acr.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD     = data.azurerm_container_registry.acr.admin_password
  }
}