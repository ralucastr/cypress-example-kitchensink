describe('Table Sort & Search Demo', () => {
    beforeEach(() => {
      cy.setCookie('exit_popup_dismissed', 'closed')
      cy.visit(
        'https://www.lambdatest.com/selenium-playground/table-sort-search-demo'
      )
    })
  
    // Define the 'testCases' array which contains a set of test cases with 
    // properties 'column', 'clicks' and 'descending' for sorting the table.
    let testCases = [{
      column: 'Name',
      clicks: 0,
      descending: false
    }, {
      column: 'Position',
      clicks: 1,
      descending: false
    }, {
      column: 'Office',
      clicks: 1,
      descending: false
    }, {
      column: 'Age',
      clicks: 1,
      descending: false
    }]
  
    // The 'map' method iterates over each test case and transforms it into a new object. 
    // The resulting transformed objects are returned from the arrow function and collected into a new array.
    // The concat method is used to concatenate this new array of 
    // transformed test cases with the original testCases array. The result 
    // is assigned back to the testCases variable, effectively adding the 
    // new test cases to the existing array.
    
    testCases = testCases.concat(testCases.map((testCase) => ({
      column: testCase.column,
      clicks: testCase.clicks + 1,
      descending: true
    })))

    testCases.forEach((testCase) => {
    // Object destructuring extracts specific properties from the 'testCase' object 
    // and assigns them to variables.
      const { column, clicks, descending } = testCase
   
    // A template literal string that constructs the title of the test based on the 
    // properties extracted above.
    // ${column} will be replaced with the value of the column variable.
    // ${descending ? 'descending' : 'ascending'} is a ternary operator that 
    // checks the value of the descending variable. If it evaluates to true, 
    // the string 'descending' will be used. Otherwise, the string 'ascending' will be used.
      it(`Should sort ${column} ${descending ? 'descending' : 'ascending'}`, () => {
        for (let i = 0; i < clicks; i++) {
          cy.contains(column).click();
        }
        
        for (let i = 0; i < 3; i++) {        
          let prevItem = '';
          cy.get('#example td.sorting_1').each((td) => {

            const currentItem = td.text();
            const testItems = [prevItem, currentItem];

            // The spread syntax ([...]) creates a new shallow copy of 
            // the testItems array. In this 
            // case, it creates a new array with the same elements as 'testItems'.
            // The sort() method arranges the elements of the array in ascending 
            // order based on their string representations.
            let sortedItems = [...testItems].sort();

            // This condition checks if the descending variable is truthy (evaluates 
            // to true) and if there is a previous item (prevItem). If both conditions 
            // are met, the sortedItems array is reversed using the .reverse() method. 
            // This ensures that the array is sorted in descending order.
            if (descending && prevItem) {
              sortedItems = sortedItems.reverse();
            }
  
            expect(testItems).to.have.ordered.members(sortedItems);

            // Updates the prevItem variable with the value of the current 
            // item, preparing it for the next iteration.
            prevItem = currentItem;
          })
  
          i < 3 && cy.get('#example_next').click();
        }
      })
    })
  })
 
    
    

   

  