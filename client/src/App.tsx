import { useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('');

  function handleInput(e: React.FormEvent) {
    e.preventDefault();
    fetch('http:localhost:5000', {
      method: 'GET'
    })
  }

  return <div className="App">
    <form onSubmit={handleInput}>
      <label htmlFor='title'>Hello</label>
      <input id='title'
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value)
        }}
      />
      <button>Submit</button>
    </form>
  </div>
}

export default App
