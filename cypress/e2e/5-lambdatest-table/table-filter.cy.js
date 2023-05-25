/// <reference types="cypress" />

describe('Table Filters', () => {
  beforeEach(() => {
    cy.setCookie('exit_popup_dismissed', 'closed');

    Cypress.on('uncaught:exception', () => {
      // Log the error or perform any custom handling
      // Returning false prevents Cypress from failing the test
      return false;
    });

    cy.visit(
      'https://www.lambdatest.com/selenium-playground/table-records-filter-demo'
    );
  })

  it('Filtering By Any Option Returns The Correct Records', () => {
    const tests = [
      {
        filter: 'button[data-target="all"]',
        result: 5 
      },
      {
        filter: 'button[data-target="pagado"]',
        result: 2,
        label: 'span.pull-right.pagado',
        text: '(Green)'
      },
      {
        filter: 'button[data-target="pendiente"]',
        result: 2,
        label: 'span.pull-right.pendiente',
        text: '(Orange)'
      },
      {
        filter: 'button[data-target="cancelado"]',
        result: 1,
        label: 'span.pull-right.cancelado',
        text: '(Red)'
      }
    ]

    tests.forEach((test) => {         
      cy.get(test.filter).click();
      cy.get('table.table.table-filter')
            .find('tr')
            .filter(':visible')
            .should('have.length', test.result)
            .then(() => {
                return test.filter !== 'button[data-target="all"]'
                  ? cy.get(test.label).should('contain', test.text)
                  : null;
              });
    //   if (test.filter !== 'button[data-target="all"]') {
    //     cy.get(test.label).should('contain', test.text);
    //   }       
    })
  })
})