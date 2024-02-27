import { useEffect, useState, createContext, useContext } from 'react'
import './App.css'
import Multiselect from './components/Multiselect'

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

// create context for mapping data
const MappingContext = createContext<TMapping[]>([]);

// create provider; React.FC = functional component
const MappingProvider: React.FC = ({ children }) => {
  const [mappingData, setMappingData] = useState<TMapping[]>([]);

  // fetch mapping on mount
  useEffect(() => {
    async function fetchMapping() {
      const newMapping = await fetch('http://localhost:5000/mapping')
        .then(response => response.json());
      setMappingData(newMapping)
    }

    fetchMapping();
  }, []);
  return <MappingContext.Provider value={mappingData}>{children}</MappingContext.Provider>
};



const App = () => {
  const [resources, setResources] = useState<TResouce[]>([]);
  const [transformedResources, setTransformedResources] = useState<TResouce[]>([]);
  const [products, setProducts] = useState<TProduct[]>([]);
  // checkboxes handled via state obj e.g., {1: false, 2: true}
  // const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({});
  const [selectedResources, setSelectedResources] = useState([])
  // mappingContext hook
  const mappingData = useContext(MappingContext);


  // on interaction with checkbox negate its current state and update 'checkboxes'
  // const handleOnCheck = (e: React.FormEvent<HTMLInputElement>) => {
  //   const { value } = e.currentTarget;
  //   const isChecked = checkboxes[value];

  //   setCheckboxes(prevState => ({
  //     ...prevState,
  //     [value]: !isChecked
  //   }))
  // };

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
      const transformedResources = newResources.map(resource => {
        return {
          value: resource.name,
          label: resource.name,
          raw_resource_id: resource.raw_resource_id
        };
      });
      setTransformedResources(transformedResources)
      setResources(newResources);
    }
    fetchProducts();
    fetchResources();
  }, []);

  /**
   * Filter products using some() to find at least one product
   * where the checkbox[raw_resource_id] == true and the 
   * refined_resouce_id from mapping matches the product refined_resource_id
   */
  // const filteredProducts = products.filter(product =>
  //   mappingData.some(mapping => selectedResources[raw_resource_id] === mapping.raw_resource_id &&
  //     mapping.refined_resource_id === product.refined_resource_id)
  // );


  return <div className="App">
    <h3>Select resources</h3>
    <div className='products-and-resources'>
      {/* <ul className="resources-list">
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
      </ul> */}
      <Multiselect options={transformedResources} defaultValue={selectedResources} onChange={setSelectedResources} />
      <div className='refined-resources'>
        <ul className='refined-resources-list'>
          {filteredProducts.map(product => (
            <li key={product.refined_resource_id}>{product.name}</li>
          ))}
        </ul>
      </div>
    </div>
  </div >
}

export default function WrappedApp() {
  return (
    <MappingProvider>
      <App />
    </MappingProvider>
  )
}
