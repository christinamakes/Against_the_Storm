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
  const [checkedState, setCheckedState] = useState(
    new Array(resources.length).fill(false)
  );

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault()
  };

  // setCheckedState()

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
    <h3>Select resources</h3>
    <ul className="resources-list">
      {resources.map((resource, index) => {
        return (
          <li key={index}>
            <input
              type='checkbox'
              id={`resource-checkbox-${index}`}
              name={resource.name}
              key={resource.resource_id}
              value={resource.name}
              checked={checkedState[index]}
              onChange={handleCheck}
            />
            <label htmlFor={`custom-checkbox-${index}`}>{resource.name}</label>
          </li>
        )
      })
      }
    </ul>
  </div>
}

export default App
