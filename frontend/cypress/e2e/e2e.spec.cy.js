describe('Users App E2E Test', () => {
  it('loads the page and adds a user', () => {
    cy.visit('/users'); // ✅ ROUTE in the browser, not a file path

    cy.get('input[placeholder="Name"]').type('Alice');
    cy.get('input[placeholder="Email"]').type('alice@example.com');
    cy.get('input[placeholder="Password"]').type('password123');

    cy.contains('Add User').click();

    cy.contains('Alice').should('exist');
    cy.contains('alice@example.com').should('exist');
  });
});