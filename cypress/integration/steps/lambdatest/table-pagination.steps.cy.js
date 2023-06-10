import TablePaginationPage from '../support/pages/lambdatest/table-pagination-page';
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const tablePaginationPage = new TablePaginationPage();

Given('I am on the table pagination page', () => {
  tablePaginationPage.setCookie();
  tablePaginationPage.visitPaginationUrl();
});

When('I select a pagination option from the dropdown', () => {
    
});

Then('I should be able to see the expected number of rows per page', () => {
  // Write code here that turns the phrase above into concrete actions
})
  