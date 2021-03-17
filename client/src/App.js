
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Products from './components/products/Products.js';
import Shop from './components/shop/Shop';
import {useDispatch} from 'react-redux'
import {fetchProducts} from './redux/slices/productsSlice'
import { useEffect } from 'react';
import AddProduct from './components/addProduct/AddProduct';
import Register from './components/Register/Register';
import Login from './components/login/Login';
function App() {
 const dispatch = useDispatch();
  useEffect(() => {
   dispatch(fetchProducts());
  }, [dispatch])
  
  return (
    <div className="App">
 
<Header></Header>
<Login></Login>
<Footer></Footer>


    </div>
  );
}

export default App;
