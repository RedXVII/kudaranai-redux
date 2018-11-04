import {TOGGLE_DISPLAY, SHOW_BENJO, NEXT_BENJO, SET_CATALOG, ROLL} from "./actionTypes";



export const toggleDisplay = property => ({
  type: TOGGLE_DISPLAY,
  payload: { property }
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
