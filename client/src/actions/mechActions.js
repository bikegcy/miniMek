import axios from 'axios';
import { GET_MECHS, UPDATE_MECH, DELETE_MECH} from "./types";

export const getMechs = () => dispatch => {
  axios.get('api/mechs').then(res => {
    dispatch({
      type: GET_MECHS,
      payload: res.data
    })
  })
};

export const updateMech = mech => dispatch => {
  axios.put(`api/mechs/${mech._id}`, mech).then(res => {
    dispatch({
      type: UPDATE_MECH,
      payload: res.data
    })
  })
};

export const deleteMech = id => dispatch => {
  axios.delete(`api/mechs/${id}`).then(res => {
    dispatch({
      type: DELETE_MECH,
      payload: id
    })
  })
};