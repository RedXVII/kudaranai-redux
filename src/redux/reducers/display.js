import {TOGGLE_DISPLAY, NEXT_BENJO, SET_DISPLAY} from "../actionTypes"

const initialState = {
  contracted: false,
  hair: true,
  tan: false,
  rakugaki: false,
  clothes: true,
  text: true,
  special: false
};

export default function (state = initialState, action) {
  let copy, property, value;
  switch (action.type) {
    
    case NEXT_BENJO:
      if (state.contracted) {
        return {...state,
          contracted: false
        };
      }
      return state;
    case TOGGLE_DISPLAY:
      ({property} = action.payload);

      copy = Object.assign({}, state);
      copy[property] = !copy[property];
      return copy;
    case SET_DISPLAY:
      ({property, value} = action.payload);

      copy = Object.assign({}, state);
      copy[property] = value;
      return copy;
    default:
      return state;
  }


}
