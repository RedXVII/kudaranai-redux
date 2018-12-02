import {FLASH_SCREEN, ANIMATION_ACK} from "../actionTypes"

const initialState = {
  contractFlash: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FLASH_SCREEN:
      return {...state,
        contractFlash: true
      };
    case ANIMATION_ACK:
      return  {...initialState};
    default:
      return state;
  }


}
