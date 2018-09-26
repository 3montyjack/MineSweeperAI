import React, {Component} from "react";
import Generate from './../GameLogic/GenerateMap.js';
import Tile from './../MineSweaperTile/MineSweeperTile.js';
import ClickBoard from './../GameLogic/GameClick.js';
import GameState from './../GameLogic/Winning.js';
import AI from './../TheAI/TheAI.js';

class GameArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamesizeX: 11,
      gamesizeY: 10,
      gameFlags: 10,
      toggleFlag: false,
      lose: false,
      win: false,
      toggleName: 'Flag',
      gameBoard: null,
      aiBoard: null,
      clicked: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.moveAI = this.moveAI.bind(this);
    this.handleFlag = this.handleFlag.bind(this);
  }

  handleClick() {
    this.setState({
      gameBoard: Generate.getMap(this.state.gamesizeX, this.state.gamesizeY, this.state.gameFlags),
      lose: false,
      win: false
    })

  }

  handleFlag() {
    this.setState({
      toggleFlag: !this.state.toggleFlag
    })
    console.log(this.state.toggleFlag)
    this.setState({
      toggleName: this.state.toggleFlag
        ? 'Flagging'
        : 'Flag'
    })
  }


  moveAI() {
    console.log("Making a Move");
    var gameState = AI.makeMove(this.state.gameBoard, this.state.aiBoard, this.state.clicked);
    this.setState({
      gameBoard: gameState[0],
      aiBoard: gameState[3],
      win: gameState[1],
      lose: gameState[2],
      clicked: false

    }, () => {
      if (this.state.win) {
        window.alert("WIN");
      } else if (this.state.lose) {
        window.alert("YOU LOSE")
      }
    })
  }

  revealTile = (x, y) => {
    var gameState = ClickBoard.clickSpace(x, y, this.state.gameBoard, this.state.toggleFlag)
    this.setState({
      gameBoard: gameState[0],
      win: gameState[1],
      lose: gameState[2],
      clicked: true

    }, () => {
      if (this.state.win) {
        window.alert("WIN");
      } else if (this.state.lose) {
        window.alert("YOU LOSE")
      }
    })
    //  () => {this.setState({
    //   lose: GameState.lose(this.state.GameState),
    //   win: GameState.winning(this.state.GameState)
    // });});

  }

  componentDidMount() {
    this.handleClick();
  }

  render() {
    var size = 0;
    var y = -1;

    return (<div>
      <button onClick={this.handleClick}>
        Generate Map
      </button>
      <button onClick={this.handleFlag}>
        {this.state.toggleName}
      </button>
      <button onClick={this.moveAI}>
        Move AI
      </button>
      <div></div>
      <table id="simple-board">
        <tbody>
          {
            this.state.gameBoard != null && this.state.gameBoard.map(i => {
              var x = -1;
              y++;
              return (<tr>{
                  i.map(j => {
                    x++;
                    size++;
                    return (<td><Tile key={size} data={j} refresh={this.revealTile} ai={this.state.aiBoard} x={x} y={y}/></td>);
                  })
                }
              </tr>)
            })
          }
        </tbody>
      </table>
    </div>);
  }
}

export default GameArea;
