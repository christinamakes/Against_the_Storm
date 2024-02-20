import { useEffect, useState } from 'react'
import './App.css'

type TResouce = {
  resource_id: string
  name: string,
  description: string,
  is_food: boolean
}

type TProduct = {
  product_id: string,
  name: string
}

function App() {
  const [resources, setResources] = useState<TResouce[]>([]);
  const [products, setProducts] = useState<TProduct[]>([]);
  // checkboxes handled via state obj e.g., {'Wood': false, 'Stone': true}
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({});


  // on interaction with checkbox negate its current state and update 'checkboxes'
  const handleOnCheck = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const isChecked = checkboxes[value];

    setCheckboxes(prevState => ({
      ...prevState,
      [value]: !isChecked
    }))
    // update products based on resource selection
    // updateCheckboxSelection()
  };

  // GET all resources when mount
  useEffect(() => {
    async function fetchProducts() {
      const newProducts = await fetch('http://localhost:5000/products')
        .then(response => response.json());
      setProducts(newProducts);
    }

    async function fetchResources() {
      const newResources = await fetch('http://localhost:5000/resources')
        .then(response => response.json());
      setResources(newResources);
    }
    fetchProducts();
    fetchResources();
  }, []);

  return <div className="App">
    <h3>Select resources</h3>
    <ul className="resources-list">
      {/* create all resource checkboxes */}
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
