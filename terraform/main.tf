terraform {
  backend "azurerm" {
    resource_group_name  = "dotnet2021-cypress"
    storage_account_name = "tfstatedevops"
    container_name       = "terraformdotnet2021"
    key                  = "terraformdotnet2021.tfstate"
  }
}

variable "acr_admin_username" {
  type = string
}

variable "acr_admin_password" {
  type = string
}

provider "azurerm" {
  version = "~>2.0"
  features {}
}
 
data "azurerm_client_config" "current" {}
 
# Resource Group
resource "azurerm_resource_group" "dotnet2021-cypress" {
  name     = "dotnet2021-cypress"
  location = "North Europe"
}

# Azure Container Registry
resource "azurerm_container_registry" "acr" {
  name                     = "dotnet2021-cypress"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = "West Europe"
  sku                      = "Basic"
  admin_enabled            = true
  admin_username           = var.acr_admin_username
  admin_password           = var.acr_admin_password
}
 

  