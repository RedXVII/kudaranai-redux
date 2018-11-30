import React from 'react'
import _ from 'lodash'

import BenjoMapping from './BenjoMapping'

const rootFolder = process.env.NODE_ENV === "development"  ? process.env.PUBLIC_URL + "/FGOCG集_製品版/" : ""

function optionsToNumber(options)
{
  var a = [options.special, options.contracted, options.hair, options.tan, options.rakugaki, options.clothes, options.text];
  var b = a.reduce((res, x) => (res << 1) | x);
  return b;
}



const BenjoDisplay = (props) => {
  let url = rootFolder;

  let myOptions = _.clone(props);

  if (!props.special_allowed)
  {
    myOptions.special = false;
  }

  let pathMap = _.find(BenjoMapping, {name: myOptions.name}).pathMap;
  let numberKey = optionsToNumber(myOptions);
  let path = _.find(pathMap, {bitmap: numberKey}).path;

  if (!myOptions.contracted)
  {
    myOptions.contracted = true;
    numberKey = optionsToNumber(myOptions);
    let contractedPath = _.find(pathMap, {bitmap: numberKey}).path;
    const preloadImg = new Image();
    preloadImg.src = url + contractedPath;

  }

  return (
    <img src={url + path} alt={myOptions.name}/>
  );
}

export default BenjoDisplay;
