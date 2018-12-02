import React from 'react'
import { connect } from "react-redux"
import { Keyframes,animated } from 'react-spring'
import BenjoDisplay from "./BenjoDisplay"
import {getCardPath} from "./util/BenjoFileAccess";
import {toggleDisplay, nextBenjo, flashScreen, animationAck} from "./redux/actions"
import delay from "delay";


const BenjoHandler = ({mode, display, toggleDisplay, nextBenjo, flashScreen, animationAck}) =>
{
  let benjo = mode.displayedBenjo;
  const Container = Keyframes.Spring({
    default: {opacity: 0},
    spinning: async (next, cancel, ownProps) => {
      let slowDown = { tension: 120, friction: 80, precision: 0.005};
      let normal = { tension: 170, friction: 20, clamp:true };
      let fast = { tension: 200, friction: 10, clamp:true };
      let slow = { duration: 1300, clamp:true};
      let slower = { duration: 1500, clamp:true};


      await next({ transform: "perspective(1500px) rotateY(1800deg)", from: { transform: "perspective(1500px) rotateY(0deg)"}, config: slowDown });
      if (benjo.rarity === 3) {
        await next({ opacity: 1, from: { opacity: 0}, config: slow});
      } else if (benjo.rarity === 4) {
        await next({ opacity: 0.5 , config: normal})
        await next({ opacity: 1, config: normal})
        await next({ opacity: 0.5 , config: normal})
        await next({ opacity: 1, config: normal})
        await next({ opacity: 0.2 , config: normal})
        await next({ opacity: 1, config: slow})
      } else if (benjo.rarity === 5) {
        await next({ opacity: 0.5 , config: normal})
        await next({ opacity: 1, config: normal})
        await next({ opacity: 0.5 , config: normal})
        await next({ opacity: 1, config: normal})
        await next({ opacity: 0.2 , config: normal})
        await next({ opacity: 1, background:"#FAFCCA", config: slower})
      }

      animationAck();
    }
  });

  const contract = () => {
    if (!display.contracted) {
      flashScreen();
    } else {
      toggleDisplay("contracted");
    }
  };
  let animationState = mode.isSpinning ? "spinning" : "default";

  let benjoContainer;
  if (mode.isSpinning) {
    benjoContainer = (
      <Container native state={animationState} >
        {styles => <React.Fragment>
          <animated.div id="benjo" style={{transform: styles.transform}} >

            <img src={getCardPath(benjo.name)} alt={benjo.name}/>
            
          </animated.div>
          <animated.div className="contractFlash" style={{opacity: styles.opacity, background: styles.background}}  onClick={() => animationAck()} > </animated.div>
        </React.Fragment>}
      </Container>
    );
  }

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
      {benjoContainer}
      <button id="benjo" className="benjo_link" style={{display:mode.isSpinning ? "none" : "block"}} onClick={() => display.contracted ? nextBenjo() : flashScreen()} >
        <BenjoDisplay {...display} name={benjo.name} special_allowed={benjo.special}/>
      </button>
    </div>
  );
}

export default connect(
  null,
  {toggleDisplay, nextBenjo, flashScreen, animationAck}
)(BenjoHandler);
