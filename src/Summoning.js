import React from 'react'
import { connect } from "react-redux"
import { nextBenjo, setCatalog, roll } from "./redux/actions"
import Catalog from "./Catalog"
import BenjoHandler from "./BenjoHandler"
import "./styles.css"

const Summoning = ({mode, display, nextBenjo, setCatalog, roll} ) =>
{

  if (mode.displayedBenjo != null)
  {
    return ( <BenjoHandler benjo={mode.displayedBenjo} display={display} /> )
  }
  else if (mode.catalog)
  {
    return ( <Catalog />)
  }
  else {
    return (
      <div className="summon_container">
        <div className="summon_system" >
          {process.env.NODE_ENV === "development" ?
          (<img id="title_screen" src={process.env.PUBLIC_URL + "/FGOCG集_製品版/04ビューワ用/ピックアップタイトル.jpg"}/>) :
          (<img id="title_screen" src="04ビューワ用/ピックアップタイトル.jpg"/>)}
          <div className="title_buttons">
            <a href="#" className="button blueButton" onClick={() => setCatalog(true)}>便女図鑑</a>
            <a href="#" className="button blueButton" onClick={() => roll()}>{"10回召喚"}</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { mode: state.mode, display: state.display};
};

export default connect(
  mapStateToProps,
  {nextBenjo, setCatalog, roll}
)(Summoning);
