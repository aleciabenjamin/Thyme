/// <reference types="Cypress" />

describe("User can create time recording", () => {
	it("successfully", () => {
		cy.server();
		cy.route({
			method: "POST",
			url: "https://demo-stable.kimai.org/api/timesheets",
			response: "fixtures:save_data.json",
			headers: {
				"X-AUTH-USER": "susan_super",
				"X-AUTH-TOKEN": "api_kitten"
			}
		});
		cy.route({
			method: "GET",
			url: "https://demo-stable.kimai.org/api/customers?visible=1",
			response: "fixtures:customer_index.json",
			headers: {
				"X-AUTH-USER": "susan_super",
				"X-AUTH-TOKEN": "api_kitten"
			}
		});
		cy.route({
			method: "GET",
			url: "https://demo-stable.kimai.org/api/activities?visible=1",
			response: "fixtures:activities_index.json",
			headers: {
				"X-AUTH-USER": "susan_super",
				"X-AUTH-TOKEN": "api_kitten"
			}
		});
		cy.route({
			method: "GET",
			url: "https://demo-stable.kimai.org/api/projects?visible=1",
			response: "fixtures:projects_index.json",
			headers: {
				"X-AUTH-USER": "susan_super",
				"X-AUTH-TOKEN": "api_kitten"
			}
		});
		cy.visit("http://localhost:3000");
		cy.get("input[type=name]").type("anna_admin");
		cy.get("input[type=password]").type("api_kitten");
		cy.get("button[type=submit]").click();
		cy.get("#customer > .dropdown").click();
		cy.contains("Berge-Klocko").click();
		cy.get("#projects > .dropdown").click();
		cy.contains("Object-based non-volatile architecture").click();
		cy.get("#activity > .dropdown").click();
		cy.contains("deliver 24/7 infrastructures").click();
		cy.get('input[name="begin"]').type("07:00");
		cy.get('input[name="end"]').type("08:00");
		cy.get('input[name="rate"]').type("25");
		cy.get('button[name="create"]').click();
		cy.get('p[name="save-message"]').should("contain", "Your time was saved");
	});

	it("unsuccessfully", () => {
		cy.server();
		cy.route({
			method: "POST",
			url: "https://demo-stable.kimai.org/api/timesheets",
			response: "fixtures:failed_saving_data.json",
			headers: {
				"X-AUTH-USER": "susan_super",
				"X-AUTH-TOKEN": "api_kitten"
			},
			status: 400
		});
		cy.visit("http://localhost:3000");
		cy.get("input[type=name]").type("anna_admin");
		cy.get("input[type=password]").type("api_kitten");
		cy.get("button[type=submit]").click();
		cy.get("#customer > .dropdown").click();
		cy.contains("Bashirian, Schaden and Ratke").click();
		cy.get('input[name="begin"]').type("abcd");
		cy.get('input[name="end"]').type("abcd");
		cy.get('button[name="create"]').click();
		cy.get('p[name="error-message"]').should(
			"contain",
			"Your time was not saved, make sure that you use the correct format"
		);
	});
});
