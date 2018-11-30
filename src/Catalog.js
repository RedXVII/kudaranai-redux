import React from 'react';
import { connect } from "react-redux";
import { showBenjo, setCatalog } from "./redux/actions";
import BenjoList from "./BenjoList"
import BenjoCardMapping from "./BenjoCardMapping";
import _ from 'lodash';

const rootFolder = process.env.NODE_ENV === "development"  ? process.env.PUBLIC_URL + "/FGOCG集_製品版/" : ""

const getPath = (benjoName) =>
{
  var path = _.find(BenjoCardMapping, {name: benjoName}).path;
  return rootFolder + path;
};


const Catalog = ({showBenjo, setCatalog}) =>
{
  return (
    <div className="catalog">
      {BenjoList.map((benjo, i) => {
          return (
            <button className="benjo_link" key={i} onClick={() => showBenjo(benjo)} >
              <img className="benjo_card" src={getPath(benjo.name)} alt={benjo.name} />
            </button>
          )
          ;})}
      <button className="button blueButton" onClick={() => setCatalog(false)}>タイトルを戻る</button>
    </div>
  );
}


export default connect(
  null,
  {showBenjo, setCatalog}
)(Catalog);
