import React from 'react'
import _ from 'lodash'

import BenjoMapping from './BenjoMapping'

const rootFolder = process.env.NODE_ENV == "development"  ? process.env.PUBLIC_URL + "/FGOCG集_製品版/" : ""

function optionsToNumber(options)
{
  var a = [options.special, options.contracted, options.hair, options.tan, options.rakugaki, options.clothes, options.text];
  var b = a.reduce((res, x) => res << 1 | x);
  return b;
}



const BenjoDisplay = (props) => {
  var url = rootFolder;

  var myOptions = _.clone(props);

  if (!props.special_allowed)
  {
    myOptions.special = false;
  }

  var numberKey = optionsToNumber(myOptions);

  var pathMap = _.find(BenjoMapping, {name: myOptions.name}).pathMap;
  var path = _.find(pathMap, {bitmap: numberKey}).path;

  return (
    <img id="benjo" src={url + path} />
  );
}

export default BenjoDisplay;
