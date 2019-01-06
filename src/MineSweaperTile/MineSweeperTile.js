import React, {Component} from "react";

class MineTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      disabled: false,
      className: 'btn btn-default Box-size',
      classNameDanger: 'btn btn-danger Box-size',
      classNameWarn: 'btn btn-warning Box-size'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.revealTile(this.props.data.getX(), this.props.data.getY(), this.props.gameBoard)
    console.log(this.props.data.getDescription(), this.props.data.getX(), this.props.data.getY())
  }

  handleData() {

  }

  onChange(e) {
    console.log(e.target.props.data);
  }

  render() {
    //TODO Implement Changed Tiles based on AI Clicking them
    return (<div>
      <button disabled={this.props.data.getRevealed() || this.props.lose || this.props.win} className={this.props.data.getRevealed() && this.props.data.getBomb() ?  this.state.classNameDanger : this.props.data.getFlaged() ? this.state.classNameWarn : this.state.className} onClick={this.handleClick}>{this.props.data.getRevealed() && <p>{this.props.data.getValue()}</p>}
        {this.props.data.getFlaged() && !this.props.data.getRevealed() && <p>F</p>}
      </button>
    </div>);
  }
}

export default MineTile;
