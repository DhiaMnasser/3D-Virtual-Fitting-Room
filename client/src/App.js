
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Products from './components/products/Products.js';
import Shop from './components/shop/Shop';
import {useDispatch} from 'react-redux'
import {fetchProducts} from './redux/slices/productsSlice'
import { useEffect } from 'react';
function App() {
 const dispatch = useDispatch();
  useEffect(() => {
   dispatch(fetchProducts());
  }, [dispatch])
  
  return (
    <div className="App">
 
<Header></Header>
<Products></Products>
<Footer></Footer>
<Shop></Shop>

    </div>
  );
}

export default App;
