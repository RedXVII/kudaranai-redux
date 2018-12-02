import React from 'react'
import { Keyframes, animated } from 'react-spring'
import { connect } from "react-redux"
import { animationAck, setDisplay } from "./redux/actions"

class AnimationComponent extends React.Component {

  render() {
    const Container = Keyframes.Spring({
      hide: { opacity: 0, display:"none" },
      
      contractFlash: async (next, cancel, ownProps) => {
        let normal = { tension: 170, friction: 20, clamp:true };
        let fast = { tension: 200, friction: 10, clamp:true };
        let slow = { tension: 350, friction: 60, clamp:true };
        let slower = { tension: 10, friction: 9, clamp:true };

        await next({ opacity: 0.5 , config: normal})
        await next({ opacity: 1, config: normal})
        await next({ opacity: 0.2 , config: normal})
        await next({ opacity: 1, config: normal})
        await next({ opacity: 0.5 , config: fast})
        await next({ opacity: 1, config: fast})
        await next({ opacity: 0.2 , config: normal})
        await next({ opacity: 1, config: slow})
        this.props.setDisplay("contracted", true);
        await next({ opacity: 0 , config: slower})
        this.props.animationAck();
      }
      
    });

    let state = this.props.contractFlash ? "contractFlash" : "hide"
    return (
      <Container native state={state}>
          {styles => <animated.div onClick={() => {this.props.skipContract();}} className="flash_div" style={styles}/>}
      </Container>
    )
  }

}

const mapStateToProps = state => {
  return { contractFlash: state.animation.contractFlash };
};

const mapDispatchToProps = dispatch => {
  return {
    setDisplay: (property, value) => {
      dispatch(setDisplay(property, value));
    },
    animationAck: () => {
      dispatch(animationAck());
    },
    skipContract: () => {
      dispatch(setDisplay("contracted", true));
      dispatch(animationAck());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimationComponent);
