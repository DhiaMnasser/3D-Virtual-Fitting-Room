import React, { useState, useEffect } from "react";
import "./header.css";
import { Container } from "react-bootstrap";
import { Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import * as actionType from "../../../constants/actionTypes";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import logo from "./img/logo1.png";
// import logo from "./logo.png";
function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
 
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/");

    setUser(null);
  };
  const profile = () => {
    history.push("/profile");
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };



  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <>
      <header className="header">
        <Container fluid={true}>
          <div className="row">
            <div className="col-xl-3 col-lg-2">
              <div className="header__logo">
                <a href=""><img src={logo} alt="" /></a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-7">
              <nav className="header__menu">
                <ul>
                  <li className="active">
                    <Link to="/Home">Home</Link>
                  </li>
                  <li>
                    <Link to="/Shop">Shop</Link>
                  </li>
                  {/* <li>
                    <Link to="/addclaim">Claims</Link>
                  </li>
                  <li>
                    <Link to="/Myclaims"> My Claims</Link>
                  </li> */}

                    <li>
                    <Link to="/AR">Fitting Room</Link>
                  </li>
                  <li>
                    <Link to="/myAvatar">My Avatar</Link>
                  </li>
                  {/* <li>
                    <Link to="/contact">Contact</Link>
                  </li> */}
                  <li>
                    <Link to="/contact">Customer Service</Link>
                  </li>
                  {/* <li>
                    <Link to="/skin">skin type Recommandation</Link>
                  </li>
                       <li>
                    <Link to="/comImg">comparateur par image</Link>
                  </li>
                       <li>
                    <Link to="/TakePicture">takePic</Link>
                  </li> */}
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="header__right">
                <div className="header__right__auth">
                  {user ? (
                    <a
                      className="nav-link dropdown-toggle inline"
                      href="#"
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small"></span>
                      {/* <img
                className="img-profile rounded-circle"
                src={user.result.imageUrl}
              /> */}
            
              <div className={classes.root}>
      
      <div   style= {{zIndex : "999"}}>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
         
        >
            <Avatar
                        className={classes.purple}
                        alt={user.result.name}
                        src={user.result.imageUrl}
                        onClick={handleToggle}
                      
                      >
                        {user.result.name.charAt(0)}
                      </Avatar>
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}> <Link to ="/profile" >  <strong> Profile</strong></Link></MenuItem>
                    <MenuItem onClick={handleClose}> <Link to ="/Myclaims"> <strong> My Claims</strong> </Link></MenuItem>
                    <MenuItem onClick={handleClose}> <Link to ="/admin"> <strong> Admin Dashboard</strong> </Link></MenuItem>
                    <MenuItem onClick={handleClose}> <span onClick={logout} >Logout</span></MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  
                      
                      
                    </a>
                  ) : (
                    <span>
                      <Link to="/auth">Login</Link>
                      <Link to="/auth">Register</Link>
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
                      {/* <div className="tip"></div> */}
                    </a>
                  </li>
                  <li>
                    <Link to="/Basket">
                      <span className="ei ei-icon_bag_alt"></span>
                      {/* <div className="tip"></div> */}
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

