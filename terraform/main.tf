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

# Azure Container Registry
resource "azurerm_container_registry" "acr" {
  name                = "dotnet2021cypress"
  resource_group_name = azurerm_resource_group.dotnet2021cypress.name
  location            = "West Europe"
  sku                 = "Basic"
  admin_enabled       = true
}

