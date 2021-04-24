import React, { useState, useEffect } from "react";
import "./header.css";
import { Container } from "react-bootstrap";
import {  Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import * as actionType from '../../../constants/actionTypes';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from 'jwt-decode';

// import logo from "./logo.png";
function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }


    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location]); 
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/');

    setUser(null);
  };
  const profile =()=>
  { history.push('/profile');};
  return (
    <>
      <header className="header">
        <Container fluid={true}>
          <div className="row">
            <div className="col-xl-3 col-lg-2">
              <div className="header__logo">
                <a href="./index.html">
                  {/* <img src={logo} alt="" /> */}
                </a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-7">
              <nav className="header__menu">
                <ul>
                  <li className="active">
                <Link to='/Home'>Home</Link>

                  </li>
                  <li>
                <Link to='/Shop'>Shop</Link>

                  </li>
                  <li>
                <Link to='/addclaim'>Claims</Link>

                  </li>
                  <li>
                <Link to='/Myclaims'> My Claims</Link>
                  </li>
                  <li>
                    <a href="#">Pages</a>
                    <ul className="dropdown">
                      <li>
                        <a href="./product-details.html">Product Details</a>
                      </li>
                      <li>
                        <a href="./shop-cart.html">Shop Cart</a>
                      </li>
                      <li>
                        <a href="./checkout.html">Checkout</a>
                      </li>
                      <li>
                        <a href="./blog-details.html">Blog Details</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="./blog.html">Blog</a>
                  </li>
                  <li>
                <Link to='/contact'>Contact</Link>
                  
                
                  </li>
                  <li>
                <Link to='/avatar'>Your Avatar</Link>
                  
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="header__right">
                <div className="header__right__auth">
                { user?  (
              <a
              className="nav-link dropdown-toggle inline"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >

              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              
              </span>
              {/* <img
                className="img-profile rounded-circle"
                src={user.result.imageUrl}
              /> */}
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} onClick={profile} >{user.result.name.charAt(0)}</Avatar>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>

            </a>
                 ):(
                   <span>

                  <Link to='/auth'>Login</Link>
                  <Link to='/auth'>Register</Link>
                   </span>
                    
                  )}
                  

                  
                </div>
                <ul className="header__right__widget">
                  <li>
                    <span className="ei ei-icon_search search-switch"></span>
                  </li>
                  <li>
                    <a href="#">
                      <span className="ei ei-icon_heart_alt"></span>
                      <div className="tip">2</div>
                    </a>
                  </li>
                  <li>
                  <Link to='/Basket'>
                    <span className="ei ei-icon_bag_alt"></span>
                    <div className="tip">2</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="canvas__open">
            <FontAwesomeIcon icon={faBars} />
          </div>
        </Container>
      </header>
      <div className="search-model">
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="search-close-switch">+</div>
          <form className="search-model-form">
            <input
              type="text"
              id="search-input"
              placeholder="Search here....."
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Header;
