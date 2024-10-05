import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from "axios";

const API_KEY = "46312976-051d72b45cfaa84800b7fd140";
export async function getPicturesByQuery(query, page = 1) {
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`
    try {
        const res = await axios.get(url);
        return res.data
    }  
    
    catch (error) {iziToast.error({
    title: 'Error',
    message: 'Sorry, there are no images matching your search query. Please try again!',
    });
    }
}