import React from 'react'
import delay from 'delay'
import { Keyframes } from 'react-spring'
import { connect, config } from "react-redux"
import { animationAck, setDisplay } from "./redux/actions"

class AnimationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isBusy: false };
  }

  render() {
    const Container = Keyframes.Spring({
      // Single props
      hide: { opacity: 0, display:"none" },
      
      showAndHide: async (next, cancel, ownProps) => {
        console.log(ownProps);
        await next({ opacity: 1, from: { opacity: 0.50 }})
        await next({ opacity: 0 })
        await next({ opacity: 1 })
        this.props.setDisplay("contracted", true);
        await next({ opacity: 0 })
        await next({ opacity: 1 })
        await next({ opacity: 0 })
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
