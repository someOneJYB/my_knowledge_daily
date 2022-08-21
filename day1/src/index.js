// async await 在 forEach 中无法异步
 function forEachFn() {
    function displayValuesWithWait(value) {
        console.log("The current value is: ", value);
      }
      
      async function valueLogger() {
        const values = [1, 2, 3, 4, 5];
      
        console.log("Starting to display values");
      
        values.forEach(async (value) => {

            console.log('About to run displayValuesWithWait() process for value ', value);
        
            await displayValuesWithWait(value);
        
            console.log('Finished displayValuesWithWait() for value ', value);
          });
        
        console.log("Finished displaying values");
      }
      
      valueLogger();
 }
 forEachFn()
 function forFn() {
    function displayValuesWithWait(value) {
        console.log("The current value is: ", value);
      }
      
      async function valueLogger() {
        const values = [1, 2, 3, 4, 5];
      
        console.log("Starting to display values");
      
        for (let i = 0; i < values.length; i++) {
          const value = values[i];
          console.log(
            "About to run displayValuesWithWait() process for value ",
            value
          );
      
          await displayValuesWithWait(value);
      
          console.log("Finished displayValuesWithWait() for value ", value);
        }
      
        console.log("Finished displaying values");
      }
      
      valueLogger();
 }
 forFn()
//  Starting to display values
// VM223:13 About to run displayValuesWithWait() process for value  1
// VM223:3 The current value is:  1
// VM223:20 Finished displayValuesWithWait() for value  1
// VM223:13 About to run displayValuesWithWait() process for value  2
// VM223:3 The current value is:  2
// VM223:20 Finished displayValuesWithWait() for value  2
// VM223:13 About to run displayValuesWithWait() process for value  3
// VM223:3 The current value is:  3
// VM223:20 Finished displayValuesWithWait() for value  3
// VM223:13 About to run displayValuesWithWait() process for value  4
// VM223:3 The current value is:  4
// VM223:20 Finished displayValuesWithWait() for value  4
// VM223:13 About to run displayValuesWithWait() process for value  5
// VM223:3 The current value is:  5
// VM223:20 Finished displayValuesWithWait() for value  5
// VM223:23 Finished displaying values

function forOfFn() {
  function displayValuesWithWait(value) {
      console.log("The current value is: ", value);
    }
    
    async function valueLogger() {
      const values = [1, 2, 3, 4, 5];
    
      console.log("Starting to display values");
    
      for (const value of values) {
        console.log(
          "About to run displayValuesWithWait() process for value ",
          value
        );
    
        await displayValuesWithWait(value);
    
        console.log("Finished displayValuesWithWait() for value ", value);
      }
    
      console.log("Finished displaying values");
    }
    
    valueLogger();
}
forOfFn()