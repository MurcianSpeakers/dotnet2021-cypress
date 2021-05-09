terraform {
  backend "azurerm" {
    resource_group_name  = "dotnet2021-cypress"
    storage_account_name = "dotnet2021tfstate"
    container_name       = "dotnet2021cypress"
    key                  = "dotnet2021cypress.tfstate"
  }
}

provider "azurerm" {
  version = "~>2.0"
  features {}
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

