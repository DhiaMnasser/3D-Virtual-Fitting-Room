import React from "react";
import "./header.css";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import logo from "./logo.png";
function Header() {
  return (
    <>
      <header className="header">
        <Container fluid={true}>
          <div className="row">
            <div className="col-xl-3 col-lg-2">
              <div className="header__logo">
                <a href="./index.html">
                  <img src={logo} alt="" />
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
                    <a href="#">Women’s</a>
                  </li>
                  <li>
                    <a href="#">Men’s</a>
                  </li>
                  <li>
                <Link to='/Shop'>Shop</Link>

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
                    <a href="./contact.html">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="header__right">
                <div className="header__right__auth">
                <Link to='/auth'>Login</Link>
                <Link to='/auth'>Register</Link>
                  
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
