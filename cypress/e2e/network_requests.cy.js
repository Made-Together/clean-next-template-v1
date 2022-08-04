/// <reference types="cypress" />

context("Network Requests", () => {
	it("Can get jobs from API", () => {
		cy.request("/api/jobs").should((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property("jobs");
			expect(response).to.have.property("headers");
		});
	});
});
