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
  const [selectedResources, setSelectedResources] = useState([])
  // mappingContext hook
  const mappingData = useContext(MappingContext);


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

  const filteredProducts = products.filter(product =>
    mappingData.some(data =>
      selectedResources.some(resource =>
        resource.raw_resource_id === data.raw_resource_id &&
        product.refined_resource_id === data.refined_resource_id
      )
    )
  );

  return <div className="App">
    <h3>Select resources</h3>
    <div className='products-and-resources'>
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
