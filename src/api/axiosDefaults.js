import axios from "axios";

axios.defaults.baseURL = 'https://fikasnap-app-d28b6f6fbe1b.herokuapp.com/';
// multipart header is required to send text and image
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;