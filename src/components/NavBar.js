import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import styles from "../styles/NavBar.module.css"
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="md" fixed="top">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>FikaSnap</Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">
                            <i className="fas fa-home">Home</i>
                        </NavLink>
                        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">
                            <i className="fas fa-sign-in">Sign in</i>
                        </NavLink>
                        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
                            <i className="fas fa-user-plus">Sign up</i>
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;
