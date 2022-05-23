import './App.css';
import { useQuery } from 'react-query'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DatasourceSelector />
        Juancho
      </header>
    </div>
  );
}

function DatasourceSelector() {

  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('http://127.0.0.1:8000/datasources').then(res =>
      res.json()
    )
  )

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>Select you datasource</h1>
    </div>
  )
}


export default App;
