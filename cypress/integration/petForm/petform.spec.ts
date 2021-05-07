/// <reference types="cypress" />

describe('Pet form', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
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
            .should("have.text", "Add my pet");          

    });

    it("Should submit a new cat", () => {
        cy.get(".myapp-petform [data-testid='name-input'] input[type='text']").type("My new dog");
        
        cy.get(".myapp-pet-selector label[for='dog']").click();
        
        cy.get(".myapp-petform .btn-primary").click();

        
    });

    it("Should submit a new dog", () => {
        cy.get(".myapp-petform [data-testid='name-input'] input[type='text']").type("My new dog");
        
        cy.get(".myapp-pet-selector label[for='dog']").click();
        
        cy.get(".myapp-petform .btn-primary").click();
    });
});