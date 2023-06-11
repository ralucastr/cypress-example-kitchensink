/// <reference types="cypress" />

describe('Table Search', () => {
    beforeEach(() => {
      cy.setCookie('exit_popup_dismissed', 'closed')
      cy.visit(
        'https://www.lambdatest.com/selenium-playground/table-sort-search-demo'
      )
    })

    const testCases = [
        {
          title: 'Partial Match',
          searchCriteria: '2',
          results: 4
        },
        {
          title: 'Exact Match',
          searchCriteria: 'Integration Specialist',
          results: 2
        },
        {
          title: 'Numerical Inputs',
          searchCriteria: '22',
          results: 3
        },
        {
          title: 'Case Insensitivity',
          searchCriteria: 'edinburgh',
          results: 4
        }
      ]
    
    testCases.forEach((testCase) => {
        const { title } = testCase;
        let text = testCase.searchCriteria;
        it(`Search Should Be Performed With ${title}`, () => {            
            cy.get('input[type="search"][aria-controls="example"]')               
                .clear()
                .type(text);
            cy.get('#example > tbody')
                .find('tr:visible')            
                .should('have.length', testCase.results)
                .each((row) => {
                    cy.wrap(row).contains(text, { matchCase: false });                   
            })
        })
    })

    it('Search Returns No Results For Non-existent Values', () => {
        cy.get('input[type="search"][aria-controls="example"]')               
          .clear()
          .type('cat');
        cy.get('#example > tbody')
          .find('tr:visible')            
          .should('have.length', 1);        
        })
})
