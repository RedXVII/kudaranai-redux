import React from 'react';
import { connect } from "react-redux";
import { showBenjo, setCatalog } from "./redux/actions";
import BenjoList from "./BenjoList"
import {getCardPath} from "./util/BenjoFileAccess";

const Catalog = ({showBenjo, setCatalog}) =>
{
  return (
    <div className="catalog">
      {BenjoList.map((benjo, i) => {
          return (
            <button className="benjo_link" key={i} onClick={() => showBenjo(benjo)} >
              <img className="benjo_card" src={getCardPath(benjo.name)} alt={benjo.name} />
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
