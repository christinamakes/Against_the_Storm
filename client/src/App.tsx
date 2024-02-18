import { useEffect, useState } from 'react'
import './App.css'

type TResouce = {
  resource_id: string
  name: string,
  description: string,
  is_food: boolean
}

function App() {
  const [resources, setResources] = useState<TResouce[]>([]);

  // run when mount
  useEffect(() => {
    async function fetchResources() {
      const newResources = await fetch('http://localhost:5000/')
        .then(response => response.json());
      setResources(newResources);
    }
    fetchResources();
  }, []);

  return <div className="App">
    <ul className="resources">
      {resources.map((resource) => (
        <li key={resource.resource_id}>{resource.name}</li>
      ))}
    </ul>
  </div>
}

export default App
