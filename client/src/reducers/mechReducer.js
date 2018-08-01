import { GET_MECHS, UPDATE_MECH, DELETE_MECH} from "../actions/types";

const initialState = {
   mechs: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_MECHS:
      return {
        ...state,
        mechs: action.payload
      };
    case UPDATE_MECH:
      return {
        ...state,
        mechs: action.payload
      };
    case DELETE_MECH:
      return {
        ...state,
        mechs: state.mechs.filter(mech => mech._id !== action.payload)
      };
    default:
      return state;
  }
}