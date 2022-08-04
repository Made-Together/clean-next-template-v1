/// <reference types="cypress" />

describe("Navigation", () => {
	it("should navigate to the get started page", () => {
		// Start from the index page
		cy.visit("/");

		// Find a link with an href attribute containing "get-started" and click it
		cy.get('header .space-x-3 a[href*="/get-started/"]').click();

		// The new url should include "/get-started/"
		cy.url().should("include", "/get-started/");

		// The new page should contain an h3 with "get-started page"
		cy.get(".right h3").contains("Speak to our team");
	});
});
