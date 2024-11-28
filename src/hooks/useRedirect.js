import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom"

/**
 * Custom hook that handles user redirection based on authentication status.
 * 
 * This hook uses the `useHistory` hook from `react-router-dom` to navigate
 * the user to the home page ("/") depending on their authentication status.
 * It attempts to refresh the authentication token using an Axios POST request
 * to the "/dj-rest-auth/token/refresh/" endpoint.
 * 
 * @param {string} userAuthStatus - The current authentication status of the user,
 *                                  expected to be either "loggedIn" or "loggedOut".
 */
export const useRedirect = (userAuthStatus) => {
    const history = useHistory();

    useEffect(() => {
        const handleMount = async () => {
            try {
                await axios.post("/dj-rest-auth/token/refresh/");
                // if user is logged in, the code below will run
                if (userAuthStatus === "loggedIn") {
                    history.push("/");
                }
            } catch (err) {
                // if user is not logged in, the code below will run
                if (userAuthStatus === "loggedOut") {
                    history.push("/");
                }
            }
        };

        handleMount();
    }, [history, userAuthStatus]);
};