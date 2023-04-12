/**
 * - Register spec
 *   - should display register page correctly
 *   - should display alert when name is empty
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email is already used
 *   - should display navigate to login page when user registered
 */

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('should display register page correctly', () => {
    cy.get('input[placeholder="Nama"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="******"]').should('be.visible');
    cy.get('button').contains(/^Daftar$/).should('be.visible');
  });

  it('should display alert when name is empty', () => {
    cy.get('button').contains(/^Daftar$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('should display alert when email is empty', () => {
    cy.get('input[placeholder="Nama"]').type('Example Name');
    cy.get('button').contains(/^Daftar$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Nama"]').type('Example Name');
    cy.get('input[placeholder="Email"]').type('email@gmail.com');
    cy.get('button').contains(/^Daftar$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  // Disconnected
  // it('should display navigate to login page when user registered', () => {
  //   cy.get('input[placeholder="Nama"]').type('Example');
  //   cy.get('input[placeholder="Email"]').type('exampleexa3m@gmail.com');
  //   cy.get('input[placeholder="******"]').type('example123');
  //   cy.get('button').contains(/^Daftar$/).click();
  //
  //   cy.url().should('include', '/login');
  //   cy.get('button').contains(/^Masuk$/).should('be.visible');
  // });
});