

import axios from "axios";

const BASE_URL="https://api.themoviedb.org/3"
const TMDB_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTNjNmQxNjNiOGE5MTRiOTgyYTYzMGIyMTQ2NWRjMyIsInN1YiI6IjY2M2QwZDE4NTQ4ZDhkN2RhZDBlYTIzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e_PYc2J_5hdXbmiumlrObg0ybj0_xHpsc0uCTL1-Mbs"


const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};