import { http, HttpResponse } from 'msw';

const baseURL = 'https://fikasnap-app-d28b6f6fbe1b.herokuapp.com/';

export const handlers = [
    http.get(`${baseURL}dj-rest-auth/user`, () => {
        return HttpResponse.json({
            "pk": 1,
            "username": "bogdan",
            "email": "",
            "first_name": "",
            "last_name": "",
            "profile_id": 1,
            "profile_image": "https://res.cloudinary.com/dx8eiynnh/image/upload/v1/media/images/default_profile_anfetn"
        })
    })
]