
import './App.css';
import { useQuery,gql } from '@apollo/client';


const query = gql`
  query ExampleQuery {
    getTodos {
        title
        user {
          name
        }
    }
}
`

function App() {

  const {data,loading} = useQuery(query)
  if(loading) return <h1>Loading.....</h1>
  return (
    <div className="App">
      <p>
      {JSON.stringify(data)}
      </p>
     
    </div>
  );
}

export default App;
