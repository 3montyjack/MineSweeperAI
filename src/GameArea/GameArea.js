import React, {Component} from "react";
import {getMap} from './../GameLogic/GenerateMap.js';
import Tile from './../MineSweaperTile/MineSweeperTile.js';
import {clickSpace} from './../GameLogic/GameClick.js';
import {makeMove} from "./../TheAI/TheAI.js";

class GameArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamesizeX: 10,
      gamesizeY: 9,
      gameFlags: 10,
      toggleFlag: false,
      lose: false,
      win: false,
      toggleName: 'Flag',
      gameBoard: null,
      aiBoard: null,
      clicked: false
    };

    this.generateMap = this.generateMap.bind(this);
    this.moveAI = this.moveAI.bind(this);
    this.handleFlag = this.handleFlag.bind(this);
  }

  generateMap() {
    this.setState({
      gameBoard: getMap(this.state.gamesizeX, this.state.gamesizeY, this.state.gameFlags),
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
      toggleName: !this.state.toggleFlag
        ? 'Flagging'
        : 'Flag'
    })
  }

  moveAI() {
    console.log("Making a Move");
    var gameState = makeMove(this.state.gameBoard, this.state.aiBoard, this.state.clicked);
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

  //Literally makes no sence but this is backwards?
  revealTile = (x, y) => {
    var gameState = clickSpace(x, y, this.state.gameBoard, this.state.toggleFlag)
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
    this.generateMap();
  }

  render() {
    var size = 0;

    return (<div>
      <h1>The MineSweeper App</h1>
      <div></div>
      <div>
        <button className="btn btn-danger" onClick={this.generateMap}>
          Generate Map
        </button>
        <button className="btn btn-warning" onClick={this.handleFlag}>
          {this.state.toggleName}
        </button>
        <button className="btn btn-success" onClick={this.moveAI}>
          Move AI
        </button>
      </div>
      <p></p>
      <table id="simple-board" className="centered">
        <tbody className="boardStuff">
          {
            this.state.gameBoard != null && this.state.gameBoard.getDisplayBoard().map(i => {
              return (<tr key={size}>{
                  i.map(j => {
                    size++;
                    return (<td key={size}><Tile key={size} data={j} lose={this.state.lose} win={this.state.win} revealTile={this.revealTile} ai={this.state.aiBoard} /></td>);
                  })
                }
              </tr>)
            })
          }
        </tbody>
      </table>
      <p></p>
    </div>);
  }
}

export default GameArea;
