import {FLASH_SCREEN, ANIMATION_ACK} from "../actionTypes"

const initialState = {
  shouldFlash: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FLASH_SCREEN:
      return {... state,
        shouldFlash: true
      };
    case ANIMATION_ACK:
      return initialState;
    default:
      return state;
  }


}
