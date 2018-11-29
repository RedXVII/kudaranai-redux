import React from 'react'
import delay from 'delay'
import { connect } from "react-redux"
import { animationAck } from "./redux/actions"

class AnimationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isBusy: false };
  }

  render() {
    var flashing  = {}
    if (this.state.isBusy) {
      flashing = {opacity: 0.5, display: "block"};
    }

    return <div className="flash_div" style={flashing}/>
  }

  async flash()
  {
    this.setState({isBusy: true})
    await delay(1000)
    this.setState({isBusy: false})
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.shouldFlash && this.props.shouldFlash && !this.state.isBusy)
    {
      this.props.animationAck();
      this.flash();

    }
  }

}

const mapStateToProps = state => {
  return { shouldFlash: state.animation.shouldFlash };
};

export default connect(mapStateToProps, {animationAck})(AnimationComponent);
