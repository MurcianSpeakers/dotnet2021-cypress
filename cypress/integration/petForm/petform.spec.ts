/// <reference types="cypress" />

describe('Pet form', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it("Should show form", () => {
        cy.get(".myapp-petform")
            .find("[data-testid='name-input']")
            .find("input[type='text']");

        cy.get(".myapp-petform")
            .find("[data-testid='type-input']")
            .find(".myapp-pet-selector")
            .find("input[type='radio']").should("have.length", 2);

        cy.get(".myapp-petform")
            .find(".btn-primary")
            .should("have.text", "Add new pet");
    });

    it("Should show list", () => {
        cy.get(".myapp-pets-list")
            .find("figure")
            .should("have.length", 2);
    });

    it("Should submit a new dog", () => {
        cy.get(".myapp-petform [data-testid='name-input'] input[type='text']").type("My new dog");
        
        cy.get(".myapp-pet-selector label[for='dog']").click();

        cy.get(".myapp-petform .btn-primary").click();

        cy.get(".myapp-pets-list")
            .find("figure")
            .should("have.length", 3);

        cy.get(".myapp-pets-list")
        .children("figure")
        .eq(2)
        .find("figcaption")
        .should("have.text", "My new dog");

        cy.get(".myapp-pets-list")
        .children("figure")
        .eq(2)
        .find("img")
        .should("have.attr", "src")
        .should("include", "thedogapi");
    });
});