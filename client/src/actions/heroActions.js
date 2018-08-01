import axios from 'axios';
import { GET_HEROES, UPDATE_HERO, DELETE_HERO} from "./types";

export const getHeroes = () => dispatch => {
  axios.get('/api/heroes').then(res => {
    dispatch({
      type: GET_HEROES,
      payload: res.data
    })
  })
};

export const updateHero = hero => dispatch => {
  axios.put(`api/heroes/${hero._id}`, hero).then(res => {
    dispatch({
      type: UPDATE_HERO,
      payload: res.data
    })
  })
};

export const deleteHero = id => dispatch => {
  axios.delete(`api/heroes/${id}`).then(res => {
    dispatch({
      type: DELETE_HERO,
      payload: id
    })
  })
};


