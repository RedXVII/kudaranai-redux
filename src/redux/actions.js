import {TOGGLE_DISPLAY, NEXT_BENJO, DISPLAY_CATALOG, ROLL} from "./actionTypes";



export const toggleDisplay = property => ({
  type: TOGGLE_DISPLAY,
  payload: { property }
});

export const nextBenjo = () => ({
  type: NEXT_BENJO,
  payload: {}
})

export const displayCatalog = () => ({
  type: DISPLAY_CATALOG,
  payload: {}
})

export const roll = () => ({
  type: ROLL,
  payload: {}
})
