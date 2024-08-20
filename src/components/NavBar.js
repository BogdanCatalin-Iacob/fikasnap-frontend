import { Container, Nav, Navbar } from "react-bootstrap";
import styles from "../styles/NavBar.module.css"
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import logo from "../assets/camera-shutter.png";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavBar = () => {
    const currentUser = useCurrentUser();

    const addPostIcon = (
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to='/posts/create'
        >
            <i className="far fa-plus-square">Add post</i>
        </NavLink>
    );
    const loggedInIcons = (
        <>
            {/* feed link and icon */}
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to='/feed'
            >
                <i className="fas fa-stream">Feed</i>
            </NavLink>

            {/* liked link and icon */}
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to='/liked'
            >
                <i className="fas fa-heart">Liked</i>
            </NavLink>

            {/* sign out link and icon */}
            <NavLink
                className={styles.NavLink}
                to='/'
                onClick={() => {}}
            >
                <i className="fas fa-sign-out-alt">Sign out</i>
            </NavLink>

            {/* redirect user to own profile */}
            <NavLink
                className={styles.NavLink}
                to={`/profiles/${currentUser?.profile_id}`}
                onClick={() => {}}
            >
                <img src={currentUser?.profile_image}
                    alt="user's profile" />
            </NavLink>
        </>
    );
    const loggedOutIcons = (
        <>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/signin"
            >
                <i className="fas fa-sign-in-alt"></i>Sign in
            </NavLink>
            <NavLink
                to="/signup"
                className={styles.NavLink}
                activeClassName={styles.Active}
            >
                <i className="fas fa-user-plus"></i>Sign up
            </NavLink>
        </>
    );

    return (
        <Navbar className={styles.NavBar} expand="md" fixed="top">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="logo" height="45" />
                    </Navbar.Brand>
                </NavLink>
                {/* show add post if the current user exists */}
                {currentUser && addPostIcon}

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <NavLink
                            exact
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                            to="/"
                        >
                            <i className="fas fa-home"></i>Home
                        </NavLink>

                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;