import { useEffect, useState, createContext, useContext } from 'react'
import './App.css'
import Multiselect from './components/Multiselect'

// declare types
type TResource = {
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

type TProps = {
  children: React.ReactNode
}

// create context for mapping data
const MappingContext = createContext<TMapping[]>([]);

// create provider; React.FC = functional component
const MappingProvider = ({ children }: TProps) => {
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
  const [transformedResources, setTransformedResources] = useState<TResource[]>([]);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [selectedResources, setSelectedResources] = useState<TResource[]>([])
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
      const transformedResources = newResources.map((resource: { name: string; raw_resource_id: string }) => {
        return {
          value: resource.name,
          label: resource.name,
          raw_resource_id: resource.raw_resource_id
        };
      });
      setTransformedResources(transformedResources)
    }
    fetchProducts();
    fetchResources();
  }, []);

  const filteredProducts = products.filter(product =>
    mappingData.some(data =>
      selectedResources.some(Resource =>
        Resource.raw_resource_id === data.raw_resource_id &&
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
          {products.map(product => (
            <li key={product.refined_resource_id}
              className={filteredProducts.length === 0 ? 'product' : filteredProducts.includes(product) ? 'filtered-product' : 'not-filtered-product'}>
              {product.name}
            </li>
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
