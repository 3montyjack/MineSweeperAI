import React, {Component} from "react";

class MineTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.revealTile(this.props.data.getX(), this.props.data.getY(), this.props.gameBoard)
    console.log(this.props.data.getDescription(), this.props.data.getX(), this.props.data.getY())
  }

  handleData() {

  }

  componentDidUpdate(prevProps) {
    if (this.props.ai !== null) {
      if (this.props.userID !== prevProps.userID) {
        this.setState({
          value: this.props.ai[this.props.data.getX()][this.props.data.getY()]
            ? ""
            : "red"
        })
      }
    }
  }

  render() {
    //TODO Implement Changed Tiles based on AI Clicking them
    return (<div>
      <button style={{
          backgroundColor: this.state.value

        }} className="Box-size" onClick={this.handleClick}>{this.props.data.getRevealed() && <p>{this.props.data.getValue()}</p>}
        {this.props.data.getFlaged() && !this.props.data.getRevealed() && <p>F</p>}
      </button>
    </div>);
  }
}

export default MineTile;
