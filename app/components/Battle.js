import React, { Component } from 'react';
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { FaTimesCircle } from 'react-icons/fa';
import Results from './Results';

function BattleInstruction() {
  return (
    <div className='instructions-container'>
      <h2 className='header-lg text-center'>Instructions</h2>
      <ul className='grid container-sm text-center battle-instructions'>
        <li className='bg-light'>
          <h3 className='header-sm'>Enter Github Users</h3>
          <FaUserFriends color='#727272' size={140} />
        </li>
        <li className='bg-light'>
          <h3 className='header-sm'>Press play</h3>
          <FaFighterJet color='#234343' size={140} />
        </li>
        <li className='bg-light'>
          <h3 className='header-sm'>Get Results</h3>
          <FaTrophy color='#887733' size={140} />
        </li>
      </ul>
    </div>
  );
}

class PlayerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    return (
      <form className='column player' onSubmit={this.handleSubmit}>
        <label htmlFor='username'>{this.props.label}</label>
        <div className='row player-input'>
          <input
            id='username'
            type='text'
            value={this.state.username}
            onChange={this.handleChange}
            autoComplete='off'
            placeholder='Github username'
          />
          <button disabled={!this.state.username} className='btn btn-dark'>
            Submit
          </button>
        </div>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

function PlayerPreview({ username, label, onReset }) {
  return (
    <div className='column player-preview'>
      <h3 className='header-sm'>{label}</h3>
      <div className='row bg-light'>
        <div className='player-info'>
          <img
            src={`https://github.com/${username}.png?size=200`}
            alt={`avatar for ${username}`}
            className='player-avatar'
          />
          <h2 className='header-sm'>
            <a href={`https://github.com/${username}`}>{username}</a>
          </h2>
        </div>
        <button className='btn-clear' onClick={onReset}>
          <FaTimesCircle color='red' size={26} />
        </button>
      </div>
    </div>
  );
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
};

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOne: null,
      playerTwo: null,
      battle: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(id, player) {
    this.setState({ [id]: player });
  }
  handleReset(id) {
    this.setState({ [id]: null });
  }
  render() {
    const { playerOne, playerTwo, battle } = this.state;
    if (battle) {
      return <Results playerOne={playerOne} playerTwo={playerTwo} />;
    }
    return (
      <React.Fragment>
        <BattleInstruction />
        <div className='players-container'>
          <h1 className='header-lg text-center'>PLayers</h1>
          <div className='row'>
            {playerOne === null ? (
              <PlayerInput
                label='Player One'
                onSubmit={player => this.handleSubmit('playerOne', player)}
              />
            ) : (
              <PlayerPreview
                label='Player One'
                username={playerOne}
                onReset={() => this.handleReset('playerOne')}
              />
            )}
            {playerTwo === null ? (
              <PlayerInput
                label='Player Two'
                onSubmit={player => this.handleSubmit('playerTwo', player)}
              />
            ) : (
              <PlayerPreview
                label='Player Two'
                username={playerTwo}
                onReset={() => this.handleReset('playerTwo')}
              />
            )}
          </div>
          {playerOne && playerTwo && (
            <button
              className='btn btn-dark btn-space'
              onClick={() => this.setState({ battle: true })}
            >
              Battle
            </button>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Battle;
