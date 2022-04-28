export
    async function graphQLFetch(query, variables = {}) {
    try {
      console.log("log variables")
      console.log('Bearer' + variables)
        const response = await fetch('http://localhost:8081/graphql', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + variables
          },
          body: JSON.stringify({ query })
        });
        const body = await response.text();
        const result = JSON.parse(body);
     // console.log(`body is ${body}`)
  
        if (result.errors) {
          const error  = result.errors[0]
          alert(`${error.message}`);
          return null
        }
        
        return result.data;
      } catch (e) {
        alert(`Error in sending data to server: ${e.message}`);
        return null;
      }
  }
