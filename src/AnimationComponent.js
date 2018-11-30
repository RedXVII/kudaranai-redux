import React from 'react'
import { Keyframes } from 'react-spring'
import { connect } from "react-redux"
import { animationAck, setDisplay } from "./redux/actions"

class AnimationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isBusy: false };
  }

  render() {
    const Container = Keyframes.Spring({
      hide: { opacity: 0, display:"none" },
      
      showAndHide: async (next, cancel, ownProps) => {
        let normal = { tension: 170, friction: 20, clamp:true };
        let fast = { tension: 200, friction: 10, clamp:true };
        let slow = { tension: 350, friction: 60, clamp:true };

        await next({ opacity: 0.5 , config: normal})
        await next({ opacity: 1, config: normal})
        await next({ opacity: 0.2 , config: normal})
        await next({ opacity: 1, config: normal})
        await next({ opacity: 0.5 , config: fast})
        await next({ opacity: 1, config: fast})
        await next({ opacity: 0.2 , config: normal})
        await next({ opacity: 1, config: slow})
        this.props.setDisplay("contracted", true);
        await next({ opacity: 0 , config: slow})
        this.props.animationAck();
      }
      
    });

    let state = this.props.shouldFlash ? "showAndHide" : "hide"
    return (
      <Container state={state}>
          {styles => <div className="flash_div" style={styles}/>}
      </Container>
    )
  }

}

const mapStateToProps = state => {
  return { shouldFlash: state.animation.shouldFlash };
};

export default connect(mapStateToProps, {animationAck, setDisplay})(AnimationComponent);
