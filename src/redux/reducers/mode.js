import {SHOW_BENJO, NEXT_BENJO, SET_CATALOG, ROLL, ANIMATION_ACK} from "../actionTypes"
import BenjoList from "../../BenjoList"
import _ from 'lodash'

const initialState = {
  displayedBenjo: null,
  summonedBenjos: null,
  catalog: false,
  isSpinning: false
};

function shuffledList()
{
  return _.shuffle(BenjoList)
}

function roll(mode)
{
  var summonedBenjos;
  if (mode === "EVERYONE")
  {
    summonedBenjos =this.shuffledList();
  }
  else if (mode === "10ROLL")
  {
    summonedBenjos = this.shuffledList().slice(0,10);
  }
  else if (mode === "10ROLLRARITY")
  {
    var i;
    summonedBenjos = [];
    var previous = null
    for(i = 0; i < 10; i++)
    {
      var rng = _.random(100);
      var found;
      if (rng > 80){ //SSR
        found = _.find(shuffledList(), function(b) { return b.rarity === 5;});
      }
      else if (rng > 50){ //SR
        found = _.find(shuffledList(), function(b) { return b.rarity === 4;});
      }
      else{ // R
        found = _.find(shuffledList(), function(b) { return b.rarity === 3;});
      }

      if (found === previous) {
        i--;
      }
      else {
        summonedBenjos.push(found);
        previous = found;
      }
    }
  }
  console.log(summonedBenjos)
  return summonedBenjos;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case NEXT_BENJO:
      if (state.catalog === true) {
        return {...state,
          displayedBenjo: null
        };
      }
      else  {

        var newSummonedBenjos = Object.assign([], state.summonedBenjos);
        var nextBenjo = newSummonedBenjos.shift() || null;
        return {...state,
          displayedBenjo: nextBenjo,
          summonedBenjos: newSummonedBenjos,
          isSpinning: true
        };
      }
    case SHOW_BENJO: {
      var {benjo} = action.payload;
      return {...state,
        displayedBenjo: Object.assign({}, benjo)
      };
    }
    case SET_CATALOG:
      var {isVisible} = action.payload;
      return {...state,
        catalog: isVisible
      };
    case ROLL:
      var summonedBenjos = roll("10ROLLRARITY");
      var displayedBenjo = summonedBenjos.shift()
      return {...state,
        catalog:false,
        summonedBenjos: summonedBenjos,
        displayedBenjo: displayedBenjo,
        isSpinning: true
      };
    case ANIMATION_ACK:
      if (state.isSpinning) {
        return {...state,
          isSpinning:false
        }
      }
      return state;
    default:
      return state;
  }

}
