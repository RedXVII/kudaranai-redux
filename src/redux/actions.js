import {TOGGLE_DISPLAY, SHOW_BENJO, NEXT_BENJO, SET_CATALOG,
  ROLL, FLASH_SCREEN, ANIMATION_ACK, SET_DISPLAY} from "./actionTypes";

export const flashScreen = () => ({
    type: FLASH_SCREEN,
    payload: { }
  });

export const animationAck = () => ({
  type: ANIMATION_ACK,
  payload: { }
});

export const toggleDisplay = property => ({
  type: TOGGLE_DISPLAY,
  payload: { property }
});

export const setDisplay = (property, value) => ({
  type: SET_DISPLAY,
  payload: { property, value }
});

export const showBenjo = (benjo) => ({
  type: SHOW_BENJO,
  payload: {benjo}
})

export const nextBenjo = () => ({
  type: NEXT_BENJO,
  payload: {}
})

export const setCatalog = (isVisible) => ({
  type: SET_CATALOG,
  payload: {isVisible}
})

export const roll = () => ({
  type: ROLL,
  payload: {}
})
