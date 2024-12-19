import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import './api/axiosDefaults'
import SignUpForm from "./components/pages/auth/SignUpForm";
import SignInForm from "./components/pages/auth/SignInForm";
import PostCreateForm from "./components/pages/posts/PostCreateForm";
import PostPage from "./components/pages/posts/PostPage";
import PostsPage from "./components/pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./components/pages/posts/PostEditForm";
import ProfilePage from "./components/pages/profiles/ProfilePage";
import UsernameForm from "./components/pages/profiles/UsernameForm";
import UserPasswordForm from "./components/pages/profiles/UserPasswordForm";
import ProfileEditForm from "./components/pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";

/**
 * Main application component that sets up routing for different pages.
 * Utilizes React Router to define routes for various components such as
 * PostsPage, SignInForm, SignUpForm, PostCreateForm, PostPage, PostEditForm,
 * ProfilePage, UsernameForm, UserPasswordForm, ProfileEditForm, and NotFound.
 * Routes are conditionally rendered based on the current user's profile ID.
 * The NavBar and main content container are included in the layout.
 */
function App() {
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";
    return (
        <div className={styles.App}>
            <NavBar />
            <Container className={styles.Main}>
                <Switch>
                    <Route exact path="/" render={() => <PostsPage message="No results are found. Adjust search keyword!" />} />
                    <Route exact path="/feed" render={() => <PostsPage message="No results are found. Adjust search keyword or follow a user!" />}
                        filter={`owner__followed__owner__profile=${profile_id}&`} />
                    <Route exact path="/liked" render={() => <PostsPage message="No results are found. Adjust search keyword or like a post!"
                        filter={`likes__owner__profile=${profile_id}&ordering=-likes_created_at&`} />} />
                    <Route exact path="/signin" render={() => <SignInForm />} />
                    <Route exact path="/signup" render={() => <SignUpForm />} />
                    <Route exact path="/posts/create" render={() => <PostCreateForm />} />
                    <Route exact path="/posts/:id" render={() => <PostPage />} />
                    <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
                    <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
                    <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />} />
                    <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />} />
                    <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />
                    <Route render={() => <NotFound />} />
                </Switch>
            </Container>
        </div>
    );
}

export default App;