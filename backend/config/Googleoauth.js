import axios from "axios";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.google.apis.com/oauth2/v3/userinfo";

// function to build a URL to send to the user
export function getGoogleAuthURL(){
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'consent',
    });
    return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

//funciton to swap code into tokens
export async function getGoogleTokens(code){
    const { data } = await axios.post(
        GOOGLE_TOKEN_URL,
        {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code',
            code,
        },
        {headers: {'Content-Type': 'application/json' } }
    );
    return data;
}


//function to use the token to get the user profile
export async function getGoogleUser(access_token) {
    const {data} = await axios.get(GOOGLE_USERINFO_URL, {
        headers: {Authorization: `Bearer ${access_token}` },
    });
    return data;
}