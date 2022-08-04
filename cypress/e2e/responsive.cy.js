/// <reference types="cypress" />

context("Responsive", () => {
context("Header is responsive", () => {
	it("Header ", () => {
		cy.get(".header-nav").should("be.visible");
		// Update the viewport size to mobile so we can test responsive stuff
		cy.viewport(320, 480);

		// the navbar should have collapse since our screen is smaller
		cy.get(".header-nav").should("not.be.visible");

		// The header logo should still be visible
		cy.get(".header-logo").should("be.visible");
	});
});
