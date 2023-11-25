import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaTwitter, FaGooglePlus, FaUser } from 'react-icons/fa';
import './navbar.css';

const NavbarPage = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollingUp(scrollTop < (window.lastScrollTop || 0));
      window.lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.querySelector('nav').style.height = collapsed ? '50px' : 'auto';
  }, [collapsed]);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleTogglerClick = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Navbar
      style={{
        // backgroundColor: scrollingUp ? 'transparent' : '#f8bbd0',
        transition: 'background-color 0.3s ease-out',
        boxShadow: scrollingUp ? '0px 5px 10px rgba(0, 0, 0, 0.2)' : 'none',
 
        backgroundColor: scrollingUp ? 'transparent' : '#fbb5d6',
        transition: 'background-color 0.3s ease-out',
      }}
      variant="dark"
      expand="md"
      fixed="top"
      expanded={expanded}
      className={scrollingUp ? 'scrolling-up' : ''}
    >
      <Navbar.Brand>
        <strong className="black-text" style={{ color: 'black' }}>
          Todo List
        </strong>
      </Navbar.Brand>
      <Navbar.Toggle onClick={handleToggle} aria-controls="navbar-collapse"  style={{ color: 'black' }}/>
      <Navbar.Collapse id="navbar-collapse" isOpen={collapsed}>
        <Nav className="mr-auto" style={{ color: 'black' }}>
          {/* <Nav.Link href="#!" style={{ color: 'black' }}>
            Home
          </Nav.Link>
          <Nav.Link href="#!" style={{ color: 'black' }}>
            Features
          </Nav.Link>
          <Nav.Link href="#!" style={{ color: 'black' }}>
            Pricing
          </Nav.Link> */}
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link href="#!">
            <FaTwitter style={{ color: 'black' }}/>
          </Nav.Link>
          <Nav.Link href="#!">
            <FaGooglePlus style={{ color: 'black' }}/>
          </Nav.Link>
          <NavDropdown
            title={<FaUser  style={{ color: 'black' }}/>}
            id="basic-nav-dropdown"
            style={{ marginLeft: '-100%', width: 'auto' }}
          >
            <NavDropdown.Item href="#!">Sign up</NavDropdown.Item>
            <hr />
            <NavDropdown.Item href="#!">Login</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarPage;
