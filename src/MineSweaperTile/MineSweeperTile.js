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
    this.props.refresh(this.props.x, this.props.y, this.props.gameBoard)
    console.log(this.props.x, this.props.y)
  }

  componentDidUpdate(prevProps) {
    if (this.props.ai !== null) {
      if (this.props.userID !== prevProps.userID) {
        this.setState({
          value: this.props.ai[this.props.x][this.props.y][2]
            ? ""
            : "red"
        })
      }
    }
  }

  render() {

    return (<div>
      <button style={{
          backgroundColor: this.state.value

        }} className="Box-size" onClick={this.handleClick}>{this.props.data[1] && <p>{this.props.data[0]}</p>}
        {this.props.data[2] === "F" && !this.props.data[1] && <p>{this.props.data[2]}</p>}
      </button>
    </div>);
  }
}

export default MineTile;
