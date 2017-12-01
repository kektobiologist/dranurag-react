import React, { Component, PropTypes } from "react";

export default class MultiStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreviousBtn: false,
      showNextBtn: true,
      compState: 0,
      navState: this.getNavStates(0, this.props.steps.length)
    };
    this.hidden = {
      display: "none"
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  getNavStates(indx, length) {
    let styles = [];
    for (let i = 0; i < length; i++) {
      if (i < indx) {
        styles.push("done");
      } else if (i === indx) {
        styles.push("doing");
      } else {
        styles.push("todo");
      }
    }
    return { current: indx, styles: styles };
  }

  checkNavState(currentStep) {
    if (currentStep > 0 && currentStep < this.props.steps.length - 1) {
      this.setState({
        showPreviousBtn: true,
        showNextBtn: true
      });
    } else if (currentStep === 0) {
      this.setState({
        showPreviousBtn: false,
        showNextBtn: true
      });
    } else {
      this.setState({
        showPreviousBtn: true,
        showNextBtn: false
      });
    }
  }

  setNavState(next) {
    this.setState({
      navState: this.getNavStates(next, this.props.steps.length)
    });
    if (next < this.props.steps.length) {
      this.setState({ compState: next });
    }
    this.checkNavState(next);
  }

  handleKeyDown(evt) {
    if (evt.which === 13) {
      this.next();
    }
  }

  handleOnClick(evt) {
    if (
      evt.currentTarget.value === this.props.steps.length - 1 &&
      this.state.compState === this.props.steps.length - 1
    ) {
      this.setNavState(this.props.steps.length);
    } else {
      this.setNavState(evt.currentTarget.value);
    }
  }

  next() {
    this.setNavState(this.state.compState + 1);
  }

  previous() {
    if (this.state.compState > 0) {
      this.setNavState(this.state.compState - 1);
    }
  }

  getClassName(className, i) {
    return className + "-" + this.state.navState.styles[i];
  }

  renderSteps() {
    return this.props.steps.map((s, i) => (
      <li
        className={this.getClassName("progtrckr", i)}
        onClick={this.handleOnClick}
        key={i}
        value={i}
      >
        <em>{i + 1}</em>
        <span>{this.props.steps[i].name}</span>
      </li>
    ));
  }

  render() {
    return (
      <div className="container" onKeyDown={this.handleKeyDown}>
        <div
          className="d-flex justify-content-around align-items-center"
          style={{ textAlign: "center" }}
        >
          <div style={this.props.showNavigation ? {} : this.hidden}>
            <button
              className=" btn btn-outline-secondary"
              disabled={this.state.showPreviousBtn ? false : true}
              onClick={this.previous}
            >
              Previous
            </button>
          </div>
          <ol className="progtrckr align-center px-2">{this.renderSteps()}</ol>
          <div style={this.props.showNavigation ? {} : this.hidden}>
            <button
              className="btn btn-outline-secondary"
              onClick={this.next}
              disabled={this.state.showNextBtn ? false : true}
            >
              Next
            </button>
          </div>
        </div>
        <div style={this.props.showNavigation ? {} : this.hidden} />
        {this.props.steps[this.state.compState].component}
      </div>
    );
  }
}

MultiStep.defaultProps = {
  showNavigation: true
};
