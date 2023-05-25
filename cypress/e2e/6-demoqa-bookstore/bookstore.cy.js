/// <reference types="cypress" />

describe('Bookstore List', () => {
  // The bookstore should have 8 books on 1 page
  // The books can be sorted by author and publisher
  // Clicking on a book link takes the user to the book's detail page
  // The book's detail page has the correct info and 2 URLs
  // Clicking on the Back To Book Store button takes the user to the books list
  // Searching for an entry returns a 1 book list
  
  beforeEach(() => {
    cy.visit('https://demoqa.com/login');
    Cypress.on('uncaught:exception', () => {
      // Log the error or perform any custom handling
      // Returning false prevents Cypress from failing the test
      return false;
    });
    cy.bookstoreLogin();
    cy.get('span.text').contains('Book Store', { exact: true }).click();
  })
    
  it('The bookstore should have 8 books on 1 page', () => {
    cy.get('#rt-tbody').should('have.length', 8);      
  })    
})