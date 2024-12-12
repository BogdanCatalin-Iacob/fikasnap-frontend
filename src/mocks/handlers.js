import { rest } from 'msw';

const baseURL = 'http://127.0.0.1:8000/';

export const handlers = [
    // login endpoint
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json({
            id: 1,
            owner: "bogdan",
            created_at: "29 Jul 2024",
            updated_at: "29 Jul 2024",
            name: "",
            content: "",
            image: "https://res.cloudinary.com/dx8eiynnh/image/upload/v1/media/../default_profile_utdxde.jpg",
            is_owner: false,
            following_id: null,
            posts_count: 3,
            following_count: 0,
            followers_count: 0
        }));
    }),

    // logout endpoint
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res,ctx) => {
        return res(ctx.status(200));
    }),
];