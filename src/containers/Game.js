import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneGame, fetchPlayers } from '../actions/games/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import JoinGameDialog from '../components/games/JoinGameDialog'
import './../App.css'
import {GridList, GridTile} from 'material-ui/GridList';
import wheel from '../images/wheel.png'
import pressKey from '../actions/pressKey'


const playerShape = PropTypes.shape({
  userId: PropTypes.string.isRequired,
  name: PropTypes.string,
  points: PropTypes.number.isRequired
})

class Game extends PureComponent {
  static propTypes = {
    fetchOneGame: PropTypes.func.isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    game: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      players: PropTypes.arrayOf(playerShape),
      turn: PropTypes.number.isRequired,
      draw: PropTypes.bool,
      updatedAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      started: PropTypes.bool,
    }),
    wheel:PropTypes.shape({
      letterBoard: PropTypes.string.isRequired,
      word: PropTypes.string.isRequired,
      guesses: PropTypes.array,
      completed: PropTypes.bool,
      wheelValue: PropTypes.number.isRequired,

    }),

    currentPlayer: playerShape,
    isPlayer: PropTypes.bool,
    isJoinable: PropTypes.bool,
    hasTurn: PropTypes.bool
  }

  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    this.props.pressKey(event.key);
  }

  componentWillReceiveProps(nextProps) {
    const { game } = nextProps

    if (game && !game.players[0].name) {
      this.props.fetchPlayers(game)
    }
  }

  componentWillMount() {
    const { game, fetchOneGame, subscribeToWebsocket } = this.props
    const { gameId } = this.props.match.params

    if (!game) { fetchOneGame(gameId) }
    subscribeToWebsocket()
  }

  componentDidMount() { 
     document.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
     document.removeEventListener('keypress', this.handleKeyPress);
  }




  render() {
    const { game } = this.props

    if (!game) return null

    const title = game.players.map(p => (p.name || null))
      .filter(n => !!n)
      .join(' vs ')

    return (
      <div>
      <GridList>
        <GridTile cols cols={2} rows={0.5}>
            <h1> {this.props.wheel.letterBoard}</h1>
        </GridTile>
        <GridTile cols cols={1} rows={1.5}>
            <h1> Single guessed Letter </h1>
            <button> Spin the wheel </button>
        </GridTile>
        <GridTile cols cols={1} rows={1.5}>
            <img className="picture" src={wheel}/>
        </GridTile>

        <GridTile cols cols={1} rows={1}>
            <h2> {game.players[0].name}</h2>
            <h3> {game.players[1].points}</h3>
        </GridTile>
        <GridTile cols cols={1} rows={1}>
            <h2> {game.players[1].name}</h2>
            <h3> {game.players[1].points}</h3>
        </GridTile>

        </GridList>

//Onderstaande is alleen voor debuggin purposes
        <h2>Debug Props</h2>

        <p>{title}</p>

        <p> Word {this.props.wheel.word}</p>

        <p> Guesses {this.props.wheel.guesses}</p>
        <p> completed { this.props.wheel.completed.toString() }</p>
        <p> Wheel value {this.props.wheel.wheelValue}</p>





        <pre>{JSON.stringify(this.props, true, 2)}</pre>

        <JoinGameDialog gameId={game._id} />

        </div>

    )
  }
}

const mapStateToProps = ({ currentUser, games, wheel }, { match }) => {
  const game = games.filter((g) => (g._id === match.params.gameId))[0]
  const currentPlayer = game && game.players.filter((p) => (p.userId === currentUser._id))[0]
  const hasTurn = !!currentPlayer && game.players[game.turn].userId === currentUser._id
  return {
    currentPlayer,
    game,
    isPlayer: !!currentPlayer,
    hasTurn,
    isJoinable: game && !currentPlayer && game.players.length < 2,
    wheel
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneGame,
  fetchPlayers,
  pressKey
})(Game)
