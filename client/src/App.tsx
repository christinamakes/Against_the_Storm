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
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({});

  const handleOnCheck = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const isChecked = checkboxes[value];
    console.log(`${value} ${isChecked}`)

    setCheckboxes(prevState => ({
      ...prevState,
      [value]: !isChecked
    }))
  };


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
              checked={checkboxes[resource.name] || false}
              onChange={handleOnCheck}
            />
            <label htmlFor={`resource-checkbox-${index}`}>{resource.name}</label>
          </li>
        )
      })
      }
    </ul>
  </div>
}

export default App
