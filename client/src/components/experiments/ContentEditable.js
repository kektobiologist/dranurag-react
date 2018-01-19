import ContentEditable from "react-contenteditable";
import React, { Component } from "react";

class Editable extends Component {
  state = {
    html: "<b>Hello <i>World</i></b>"
  };

  constructor(props) {
    super(props);
  }

  handleChange = evt => {
    this.setState({ html: evt.target.value });
  };

  render() {
    return (
      <ContentEditable
        html={this.state.html} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={this.handleChange} // handle innerHTML change
      />
    );
  }
}

export default Editable;
