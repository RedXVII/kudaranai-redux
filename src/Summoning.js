import React from 'react'
import { connect } from "react-redux"
import { nextBenjo, setCatalog, roll } from "./redux/actions"
import AnimationComponent from "./AnimationComponent";
import Catalog from "./Catalog"
import BenjoHandler from "./BenjoHandler"
import "./styles.css"

const Summoning = ({mode, display, nextBenjo, setCatalog, roll} ) =>
{
  var main;
  if (mode.displayedBenjo != null)
  {
    main = ( <BenjoHandler mode={mode} display={display} /> )
  }
  else if (mode.catalog)
  {
    main = ( <Catalog />)
  }
  else {
    var url = process.env.NODE_ENV === "development" ? process.env.PUBLIC_URL + "/FGOCG集_製品版/04ビューワ用/ピックアップタイトル.jpg" : "04ビューワ用/ピックアップタイトル.jpg";
    main = (
      <div className="summon_container">
        <div className="summon_system" >
          <img id="title_screen" src={url} alt="pickup" />
          <div className="title_buttons">
            <button className="button blueButton" onClick={() => setCatalog(true)}>便女図鑑</button>
            <button className="button blueButton" onClick={() => roll()}>{"10回召喚"}</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <AnimationComponent/>
      {main}
    </div>
  )
}

const mapStateToProps = state => {
  return { mode: state.mode, display: state.display};
};

export default connect(
  mapStateToProps,
  {nextBenjo, setCatalog, roll}
)(Summoning);
