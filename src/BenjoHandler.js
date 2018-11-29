import React from 'react'
import { connect } from "react-redux"
import BenjoDisplay from "./BenjoDisplay"
import {toggleDisplay, nextBenjo} from "./redux/actions"

const BenjoHandler = ({benjo, display, toggleDisplay, nextBenjo}) =>
{
  return(
    <div className="benjo_handler" >
      <div className="sideBar">
        <a href="#" className="button pinkButton" onClick={() => toggleDisplay("hair")} >{display.hair ? "陰毛消して"  : "陰毛生えて"}</a>
        <a href="#" className="button pinkButton" onClick={() => toggleDisplay("tan")} >{display.tan ? "肌色"  : "褐色"}</a>
        <a href="#" className="button pinkButton" onClick={() => toggleDisplay("rakugaki")} >{display.rakugaki ? "独り占め"  : "フレンドポイント稼ぐ"}</a>
        <a href="#" className="button pinkButton" onClick={() => toggleDisplay("clothes")} >{display.clothes ? "裸にして"  : "着衣を着て"}</a>
        <a href="#" className="button pinkButton" onClick={() => toggleDisplay("text")} >{display.text ? "声を封印" : "声を開放"}</a>
        <a href="#" className="button pinkButton" onClick={() => toggleDisplay("contracted")} >{display.contracted ? "記憶改竄"  : "契約"}</a>
        <a href="#" className="button blueButton" onClick={() => nextBenjo()} >次の便女</a>
        <a href="#" className="button pinkButton" onClick={() => toggleDisplay("special")} style={{visibility: benjo.special ? "visible" : "hidden" }} >{display.special ? "裸にして"  : "便女霊衣を着て"}</a>
      </div>
      <BenjoDisplay {...display} name={benjo.name} special_allowed={benjo.special}/>
    </div>
  );
}

export default connect(
  null,
  {toggleDisplay, nextBenjo}
)(BenjoHandler);
