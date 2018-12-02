import _ from 'lodash';
import BenjoCardMapping from "./BenjoCardMapping";

const rootFolder = process.env.NODE_ENV === "development"  ? process.env.PUBLIC_URL + "/FGOCG集_製品版/" : ""

export const getCardPath = (benjoName) =>
{
  var path = _.find(BenjoCardMapping, {name: benjoName}).path;
  return rootFolder + path;
};