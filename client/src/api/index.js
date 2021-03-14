import axios from 'axios'

const url = 'http://localhost:5000/';

export const fetchProducts = ()=> axios.get(url+'products');