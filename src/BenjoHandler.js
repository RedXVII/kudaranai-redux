import React from 'react'
import { connect } from "react-redux"
import { Keyframes,animated } from 'react-spring'
import BenjoDisplay from "./BenjoDisplay"
import {toggleDisplay, nextBenjo, flashScreen} from "./redux/actions"

const BenjoHandler = ({benjo, display, toggleDisplay, nextBenjo, flashScreen}) =>
{

  const Container = Keyframes.Spring({
    default: {opacity: 1},
    spinning: async (next, cancel, ownProps) => {
      let slowDown = { tension: 120, friction: 80, precision: 0.005};
      await next({ transform: "perspective(1500px) rotateY(1800deg)", from: {transform: "perspective(1500px) rotateY(0deg)"}, config: slowDown });
    }
  });

  const contract = () => {
    if (!display.contracted) {
      flashScreen();
    } else {
      toggleDisplay("contracted");
    }
  };

  return(
    <div className="benjo_handler" >
      <div className="sideBar">
        <button className="button pinkButton" onClick={() => toggleDisplay("hair")} >{display.hair ? "陰毛消して"  : "陰毛生えて"}</button>
        <button className="button pinkButton" onClick={() => toggleDisplay("tan")} >{display.tan ? "肌色"  : "褐色"}</button>
        <button className="button pinkButton" onClick={() => toggleDisplay("rakugaki")} >{display.rakugaki ? "独り占め"  : "フレンドポイント稼ぐ"}</button>
        <button className="button pinkButton" onClick={() => toggleDisplay("clothes")} >{display.clothes ? "裸にして"  : "着衣を着て"}</button>
        <button className="button pinkButton" onClick={() => toggleDisplay("text")} >{display.text ? "声を封印" : "声を開放"}</button>
        <button className="button pinkButton" onClick={contract} >{display.contracted ? "記憶改竄"  : "契約"}</button>
        <button className="button blueButton" onClick={() => nextBenjo()} >次の便女</button>
        <button className="button pinkButton" onClick={() => toggleDisplay("special")}
          style={{visibility: benjo.special ? "visible" : "hidden" }} >{display.special ? "裸にして"  : "便女霊衣を着て"}</button>
      </div>

      <Container native state="spinning">
        {styles => <animated.div id="benjo" style={styles}> 
          <button  className="benjo_link" onClick={() => display.contracted ? nextBenjo() : flashScreen()} >
              <BenjoDisplay {...display} name={benjo.name} special_allowed={benjo.special}/>
            </button>
        </animated.div>}
      </Container>
      
      
    </div>
  );
}

export default connect(
  null,
  {toggleDisplay, nextBenjo, flashScreen}
)(BenjoHandler);
