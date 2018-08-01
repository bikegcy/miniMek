import { GET_HEROES, UPDATE_HERO, DELETE_HERO} from "../actions/types";

const initialState = {
  heroes: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HEROES:
      return {
        ...state,
        heroes: action.payload
      };
    case UPDATE_HERO:
      return {
        ...state,
        heroes: action.payload
      };
    case DELETE_HERO:
      return {
        ...state,
        heroes: state.heroes.filter(hero => hero._id !== action.payload)
      };
    default:
      return state;
  }
}
