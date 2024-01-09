import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/products')
      .then((response) => setProducts(response.data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* Existing content */}
        <p>Products: {products ? JSON.stringify(products) : 'Loading...'}</p>
      </header>
    </div>
  );
}

export default App;
