/// <reference types="cypress" />

describe('Table Search', () => {
  beforeEach(() => {
    cy.setCookie('exit_popup_dismissed', 'closed');
  
    Cypress.on('uncaught:exception', () => {
      // Log the error or perform any custom handling
      // Returning false prevents Cypress from failing the test
      return false;
    });
  
    cy.visit(
      'https://www.lambdatest.com/selenium-playground/table-search-filter-demo'
    );
  })
  
  it('Searching By Any Criterion Returns The Correct Records', () => {
    const tests = [
      {
        searchCriteria: 'John',
        results: 2
      },
      {
        searchCriteria: 'xs#',
        results: 0
      },
      {
        searchCriteria: 'in',
        results: 4
      },
      {
        searchCriteria: 'Holden Charles',
        results: 1
      }
    ]
  
    // cy.wrap() is used to convert a plain JavaScript object 
    // or element into a Cypress object, allowing you to utilize 
    // Cypress commands and assertions on that object
    tests.forEach((test) => {         
      cy.get('#task-table-filter').click().clear().type(test.searchCriteria);
      cy.get('#task-table > tbody')
              .find('tr:visible')            
              .should('have.length', test.results)
              .each((row) => {
                cy.wrap(row).contains(test.searchCriteria);
              })
    })
  })
})
