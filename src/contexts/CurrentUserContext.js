import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosRequest, axiosResponse } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory();

    const handleMount = async () => {
        try {
            await axiosResponse.get("/dj-rest-auth/user/").then(
                (response) => setCurrentUser(response.data)
            );
        } catch (err) {
            console.log('An error occurred, status: ', err.response.status);
        }
    };

    useEffect(() => {
        handleMount();
    }, []);

    // Here we are catching all incoming and outgoing requests
    // to check if the token is expired and if so, we refresh it.
    // and if the refresh token is expired, we redirect the user to the signin page
    // attach the axios interceptors before the children props mount
    // so the user can stay logged in for 24 hours
    useMemo(() => {
        axiosRequest.interceptors.request.use(
            async (config) => {
                if (shouldRefreshToken) {
                    try {
                        // refresh token before sending request
                        await axios.post('/dj-rest-auth/token/refresh/')
                    } catch (err) {
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                history.push('/signin')
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                        return config;
                    }
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        axiosResponse.interceptors.response.use(
            // no error return response
            (response) => response,
            async (err) => {
                if (err.response?.status === 401) {
                    // refresh the token
                    try {
                        await axios.post('/dj-rest-auth/token/refresh/')
                    } catch (err) {
                        // if the user was sign in redirect to signin page
                        setCurrentUser(prevCurrentUser => {
                            if (prevCurrentUser) {
                                history.push('/signin')
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                    }
                    // exit the interceptor
                    return axios(err.config)
                }
                // exit the interceptor if the error wasn't 401
                return Promise.reject(err);
            }
        )
    }, [history]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    );
};