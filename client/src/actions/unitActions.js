import axios from 'axios';
import { GET_UNIT, UPDATE_UNIT} from "./types";

export const getUnit = () => dispatch => {
  axios.get('/api/unit').then(res => {
    dispatch({
      type: GET_UNIT,
      payload: res.data
    })
  })
};

export const updateUnit = unit => dispatch => {
  axios.put(`api/unit/${unit._id}`, unit).then(res => {
    dispatch({
      type: UPDATE_UNIT,
      payload: res.data
    })
  })
};



