import Slider from "react-slick";
import React, { Component } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
export default class PreviousNextMethods extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="container">
        <div className="container">
          <Slider {...settings}>
            <div key={1}>
              <div>
                <h3>1</h3>
              </div>
            </div>
            <div key={2}>
              <div>
                <h3>2</h3>
              </div>
            </div>
            <div key={3}>
              <div>
                <h3>3</h3>
              </div>
            </div>
            <div key={4}>
              <div>
                <h3>4</h3>
              </div>
            </div>
            <div key={5}>
              <div>
                <h3>5</h3>
              </div>
            </div>
            <div key={6}>
              <div>
                <h3>6</h3>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}
