# FikaSnap - Frontend
The live app can be found at [FikaSnap](https://fikasnap-frontend-b2471d63280f.herokuapp.com/)

## Table of contents
*   [User Experience Design](#user-experience-design)
    *   [User Stories](#user-stories)
*   [Technologies](#technologies)
*   [Testing](#testing)
    *   [Test Types](#test-types)
    
## User experience design
*   ### User stories
    As a **(role)** I can **(capability)**, so that **(received benefit)**

    | User story ID | As A/An  | I want to be able | So that I can...  |
    |---------------|----------|-------------------|-------------------|
    | Navigation and Authentication|             |           |                   |
    | 1 | User |  View a navbar from every page | Navigate easeily between pages |
    | 2 | User | Navigate through pages quickly | View content seamlessly without page refresh |
    | 3 | User | Create a new account | Access all the features for signed up users |
    | 4 | User | Sign in to the app | Access functionality for logged in users |
    | 5 | User | Can see if I'm logged in or not | Login if I need to |
    | 6 | User | Maintain logged in status until I choose to logout | My user experience is not compromised |
    | 7 | User | Logged out user can see sign up and sign in options | Sign up / in |
    | 8 | User | View user avatar | Easily identify users of the application |
    | Adding and Liking posts |  |  |  |
    | 9 | User | Logged in usercan create posts | Share my images with the world |
    | 10 | User | View the details of a single post | Learn more about it |
    | 11 | User | Logged in user can like a post | Show my support for the post that interest me |
    | Posts page |  |  |  |
    | 12 | User |View all the most recent posts, ordered by most recently created first | Stay up to date with the newest content |
    | 13 | User |Search for posts with keywords | Find posts and user profiles I am most interested in |
    | 14 | User | Logged in user can view the post I liked | Find the posts I enjoy the most |
    | 15 | User | Logged in user can view content filtered by users I follow | Keep up to date with what they are posting |
    | 16 | User | Keep scrolling through the images on the site, loaded automatically | No need to click "Next Page" button |
    | Detailed Post Page |  |  |  |
    | 17 | User | Can view posts page | Read the comments about the post |
    | 18 | Post Owner | Edit my posts title and description | Make correctionsor update my post after it was created |
    | 19 | User | Logged in user can add comments to a post | Share thoughts about the post |
    | 20 | User | Can see how long ago a comment was made | Know how old are the comments |
    | 21 | User | Read the comments on posts | Know what other users think about a specific post |
    | 22 | Post owner | Delet my comment | Control Removal of my comment from the application |
    | 23 | Post Owner | Edit my comment | Fix or update my existing comment |
    | Profile Page |  |  |  |
    | 24 | User | View other users profiles | See their post and learn more about them |
    | 25 | User | See a list of the most followed profiles | See which profiles are popular |
    | 26 | User | View statistics about a specific user: bio, number of posts, follows and users followed | Learn more about the user |
    | 27 | User | Logged in user can follow / unfollow other users | See and remove posts by specific users in my posts feed |
    | 28 | User | View all the posts by a specific user | Catch up on their latest posts or follow them |
    | 29 | Profile Owner | Logged in user can edit own profile | Change profile picture and bio |
    | 30 | Profile Owner | Logged in user can update username and password | Change my display name and keep my profile secure |

## Technologies
*   Javascript
*   ReactJs
*   React-Bootstrap
*   Axios

## Testing
Use Mock Service Worker for testing React components.

1. Create a server instance with all the handlers defined in handlers.js
2. Start the server before all test are run
3. Reset the handlers after each test
4. Close the server after all the test are run

### Test types
*   Tests to check that a component can be rendered without any errors
*   Tests to check that certain elements such as links are rendered on mount within the component
*   Tests to check that certain elements such as links are rendered as a result of an asynchronous request after mounting
*   Tests that simulate user interactions such as clicks