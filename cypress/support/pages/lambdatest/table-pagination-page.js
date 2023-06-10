/// <reference types="cypress" />

class TablePaginationPage {

    setCookie() {
        cy.setCookie('exit_popup_dismissed', 'closed');
    }

    visitPaginationUrl()
    {
        cy.visit('https://www.lambdatest.com/selenium-playground/table-pagination-demo');
    }   
}

export default TablePaginationPage;