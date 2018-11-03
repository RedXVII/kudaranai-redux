import React from 'react';
import { connect } from "react-redux";
import BenjoList from "./BenjoList"
import { nextBenjo, displayCatalog, roll } from "./redux/actions";
import "./styles.css";
var BenjoHandler = require("./BenjoHandler");
var Catalog = require("./Catalog");




const Summoning = ({mode, nextBenjo, displayCatalog, roll} ) =>
{
  if (mode.catalog)
  {
    return ( <Catalog benjoList={BenjoList} />)
  }
  else if (mode.displayedBenjo != null)
  {
    return <BenjoHandler name={mode.displayedBenjo.name} special={mode.displayedBenjo.special} nextHandler={nextBenjo} />
  }
  else {
    return (
      <div className="summon_container">
        <div className="summon_system" >
          {process.env.NODE_ENV == "development" ?
          (<img id="title_screen" src={process.env.PUBLIC_URL + "/FGOCG集_製品版/04ビューワ用/ピックアップタイトル.jpg"}/>) :
          (<img id="title_screen" src="04ビューワ用/ピックアップタイトル.jpg"/>)}
          <div className="title_buttons">
            <a href="#" className="button blueButton" onClick={() => displayCatalog()}>便女図鑑</a>
            <a href="#" className="button blueButton" onClick={() => roll()}>{"10回召喚"}</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { mode: state.mode };
};

const mapDispatchToProps = dispatch => {
  return {
    nextBenjo: () => {
      dispatch(nextBenjo())
    },
    displayCatalog: () => {
      dispatch(displayCatalog())
    },
    roll: () => {
      dispatch(roll())
    },
  }
}

var connectResult = connect(mapStateToProps,mapDispatchToProps)(Summoning);
console.log(connectResult);


export default connectResult;
