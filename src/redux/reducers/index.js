import { combineReducers } from "redux";
import display from "./display";
import mode from "./mode";
import animation from "./animation";

export default combineReducers({ display, mode, animation });
