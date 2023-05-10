// une autre façon de coder en utilisant les classe aulieu des hooks

import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e) => {
    this.setState({
      // le + convertie un string dans un nombre
      active: +e.target.dataset.index,
    });
  };
  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="ml-20 ">
        <img
          className="w-42 h-42 grid"
          src={images[active]}
          alt="animal hero"
        />
        <div className="my-5 flex w-20 ">
          {images.map((photo, index) => (
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
