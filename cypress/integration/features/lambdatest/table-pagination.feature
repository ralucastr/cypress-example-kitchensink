Feature: Table Pagination
  Scenario: Can change the number of rows per page, should update number of pages accordingly
    Given I am on the table pagination page
    When I select a pagination option from the dropdown
    Then I should be able to see the expected number of rows per page
