import { environment } from "../../environments/environment.prod";

const  BASE_URL = environment.production ? "https://thawing-wildwood-92293.herokuapp.com/api" : "https://thawing-wildwood-92293.herokuapp.com/api";

export const Endpoint = {
    AUTH: {
        login: `${BASE_URL}/login/auth`,
        register: `${BASE_URL}/register`,
    },

    DASHBOARD: {
        excos: `${BASE_URL}/excos`,
    },

    BLOGS: {
        blogs: `${BASE_URL}/blogs`
    }

}