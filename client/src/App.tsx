import { useEffect, useState } from 'react'
import './App.css'

type TResouce = {
  raw_resource_id: string
  name: string,
  description: string,
  is_food: boolean
}

type TProduct = {
  refined_resource_id: string,
  name: string
}

type TMapping = {
  raw_resource_id: string,
  refined_resource_id: string,
  quantity_required: string
}

function App() {
  const [resources, setResources] = useState<TResouce[]>([]);
  const [products, setProducts] = useState<TProduct[]>([]);
  // checkboxes handled via state obj e.g., {1: false, 2: true}
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({});
  const [mappingData, setMappingData] = useState<TMapping[]>([]);


  // on interaction with checkbox negate its current state and update 'checkboxes'
  const handleOnCheck = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const isChecked = checkboxes[value];
    console.log(value)
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

    async function fetchMapping() {
      const newMapping = await fetch('http://localhost:5000/mapping')
        .then(response => response.json());
      setMappingData(newMapping)
    }
    fetchProducts();
    fetchResources();
    fetchMapping();
  }, []);

  return <div className="App">
    <h3>Select resources</h3>
    <ul className="resources-list">
      {/* create all resource checkboxes */}
      {resources.map((resource) => {
        return (
          <li key={resource.raw_resource_id}>
            <input
              type='checkbox'
              id={resource.raw_resource_id}
              name={resource.name}
              key={resource.raw_resource_id}
              value={resource.raw_resource_id}
              checked={checkboxes[resource.raw_resource_id] || false}
              onChange={handleOnCheck}
            />
            <label htmlFor={resource.raw_resource_id}>{resource.name}</label>
          </li>
        )
      })
      }
    </ul>
    <div className='refined-resources'>
      <ul className='refined-resources-list'>
        {products.map((product) => {
          return (
            <li key={product.refined_resource_id}>{product.name}</li>
          )
        })}
      </ul>
    </div>
  </div>
}

export default App
