import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from '../../common/apis/movieApi';
import { APIKEY } from '../../common/apis/MovieApiKey'

// we will fetch all the movies with the help of async thunk
export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term) => {
    const response = await MovieApi.get(`?apikey=${APIKEY}&s=${term}&type=movie`);
    return response.data;
}
);
export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (term) => {
    const response = await MovieApi.get(`?apikey=${APIKEY}&s=${term}&type=series`);
    return response.data;
}
);

export const fetchAsyncMovieOrShowDetails = createAsyncThunk('movies/fetchAsyncMovieOrShowDetails', async (id) => {
    const response = await MovieApi.get(`?apikey=${APIKEY}&i=${id}&Plot=full`);
    return response.data;
}
);

const initialState = {
    movies: {},
    shows: {},
    selectedMovieOrShow: {},
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        // Now we are going to create action inside reducers

        addMovies: (state, { payload }) => {
            // Whenever I get the movies from the payload I just need to update my state of the movies.
            state.movies = payload;
            // So the difference between redux and redux-toolkit is in redux toolkit it uses a internal library called maimme, so we just take the state and just update the property (in our case its property is 'movies') you want to update.
        },
        removeSelectedMovieOrShows: (state) => {
            state.selectedMovieOrShow = {};
        },
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log('pending');
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log('fulfilled');
            return { ...state, movies: payload }
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log('Rejected');
        },
        // so the above fetchAsyncMovies will have some additional action creators and that action creators will actually define the life cycle of an async request.
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log('fulfilled');
            return { ...state, shows: payload }
        },
        [fetchAsyncMovieOrShowDetails.fulfilled]: (state, { payload }) => {
            console.log('fulfilled');
            return { ...state, selectedMovieOrShow: payload }
        },
    },
});

export const { addMovies, removeSelectedMovieOrShows } = movieSlice.actions;

// If I want to fetch a value from the store..... we are going to create a function
// state.movies(this is slice name or the name of the Reducers).movies(this is property oe state (initialstate))
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;

export default movieSlice.reducer;