import { GET_UNIT, UPDATE_UNIT} from "../actions/types";

const initialState = {
  unit: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_UNIT:
      return {
        ...state,
        unit: action.payload
      };
    case UPDATE_UNIT:
      return {
        ...state,
        unit: action.payload
      };
    default:
      return state;
  }
}