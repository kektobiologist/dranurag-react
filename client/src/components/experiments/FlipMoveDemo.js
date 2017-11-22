import React, { Component } from "react";
import FlipMove from "react-flip-move";
import VisitCard from "../Home/VisitCard";
import { BrowserRouter } from "react-router-dom";
import { ListGroupItem, ListGroup } from "reactstrap";

var VisitsList = ({ visits, onDelete }) => (
  <ListGroup>
    <FlipMove duration={750} easing="ease-out">
      {visits.map(visit => (
        <VisitCard
          key={visit._id}
          visit={visit}
          onDelete={() => onDelete(visit._id)}
        />
      ))}
    </FlipMove>
  </ListGroup>
);

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visits: props.visits
    };
  }

  onShuffle = () => {
    var shuffledVisits = shuffleArray(this.state.visits);
    this.setState({ visits: shuffledVisits });
  };

  onDelete = visitId => {
    console.log("deleting " + visitId);
    this.setState({
      visits: this.state.visits.filter(({ _id }) => _id !== visitId)
    });
  };

  render() {
    const { visits } = this.state;
    return (
      <BrowserRouter>
        <div>
          <button onClick={this.onShuffle}>Shuffle</button>
          <VisitsList visits={visits} onDelete={this.onDelete} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Demo;
