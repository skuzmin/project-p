describe('Login page', () => {
    it('should check front-end validation', () => {
        cy.visit('http://localhost:8080/login');
        cy.contains('Login').click();

        cy.get('p.help.is-danger')
            .eq(0)
            .should('contain', 'Email is required');
        cy.get('p.help.is-danger')
            .eq(1)
            .should('contain', 'Password is required');
    });

    it('should check back-end validation', () => {
        cy.visit('http://localhost:8080/login');
        cy.get('input[type="text"]').type('erngorn@gmail.com');
        cy.get('input[type="password"]').type('pewpew');
        cy.contains('Login').click();

        cy.get('.toast.is-danger.is-top').should('contain', 'Wrong login or password');
    });

    it('should login to the app', () => {
        cy.get('input[type="text"]')
            .clear()
            .type('erngorn@gmail.com');
        cy.get('input[type="password"]')
            .clear()
            .type('Passw0rd');
        cy.contains('Login').click();

        cy.url().should('include', '/dashboard');
        cy.get('.title').should('contain', 'Dashboard');
    });

    it('should logout from the app', () => {
        cy.contains('Log out').click();

        cy.url().should('include', '/login');
        cy.get('.title').should('contain', 'Project-P');
    });
});
