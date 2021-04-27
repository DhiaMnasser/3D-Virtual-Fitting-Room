import * as React from "react";
import { render } from "react-dom";
import c from "classnames";
// import "./styles.css";

class Likes extends React.Component {
  state = {
    like: 0,
    dislike: 0,
    likeActive: false,
    dislikeActive: false
  };

  setDislike() {
    this.setState({
      dislikeActive: !this.state.dislikeActive,
      dislike: this.state.dislikeActive
        ? this.state.dislike - 1
        : this.state.dislike + 1
    });
  }
  setLike() {
    this.setState({
      likeActive: !this.state.likeActive,
      like: this.state.likeActive ? this.state.like - 1 : this.state.like + 1
    });
  }

  handleLike() {
    if (this.state.dislikeActive) {
      this.setLike();
      this.setDislike();
    }
    this.setLike();
  }

  handleDislike() {
    if (this.state.likeActive) {
      this.setDislike();
      this.setLike();
    }
    this.setDislike();
  }

  render() {
    return (
      <>
        <button
          onClick={() => this.handleLike()}
          className={c({ ["active"]: this.state.likeActive })}
        >
          {this.state.like}
        </button>
        <button
          className={c({ ["active"]: this.state.dislikeActive })}
          onClick={() => this.handleDislike()}
        >
          {this.state.dislike}
        </button>
      </>
    );
  }
}

function App() {
  return <Likes />;
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
export default Likes;