import qs from "qs";
import axios from "axios";
import {Buffer} from "buffer";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const CLIENT_ID  = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SECRET_ID  = process.env.REACT_APP_SPOTIFY_SECRET_ID;
const AUTH_TOKEN = Buffer(`${CLIENT_ID}:${SECRET_ID}`, "utf-8").toString("base64");
//Funcion asincrona para obtener el token desde el Api enviando en client y secret
export const getSpotifyToken = async () => {
    try{
        console.log("Se genera TOKEN EN COOKIE");
        const token_url= "https://accounts.spotify.com/api/token";
        const data = qs.stringify({ grant_type: "client_credentials" });
        const response = await axios.post(token_url, data, {
            headers: {
                Authorization: `Basic ${AUTH_TOKEN}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        //Se crea la Cookie 'token' donde se guarda nuestro token
        cookies.set("token", response.data.access_token, { path: "/" });
    } catch(error){
        console.log(error);
    }
};
//Funcion asincrona para consultar en la url de spotify
export const spotifySearch = async (type="artist", query="The Beatles") => {
    const access_token = cookies.get("token");
    if(type === "all"){
        type = ["album","artist","track"];
    }
    const api_url = `https://api.spotify.com/v1/search?type=${type}&q=${query}&include_external=audio`;
    try{
        const response = await axios.get(api_url, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data;
    } catch(error){
        console.log(error);
    }
};