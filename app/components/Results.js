import React, { Component } from 'react';
import { battle } from '../utils/api';
import {
  FaUser,
  FaUsers,
  FaBriefcase,
  FaCompass,
  FaUserFriends
} from 'react-icons/fa';
import Card from './Card';
import PropTypes from 'prop-types';
import Loading from './Loading';

function ProfileList({ profile }) {
  return (
    <ul className='card-list'>
      <li>
        <FaUser size={22} color='red' />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <FaCompass size={22} color='gray' />
          {profile.location.toLocaleString()}
        </li>
      )}
      {profile.company && (
        <li>
          <FaBriefcase size={22} color='green' />
          {profile.company.toLocaleString()}
        </li>
      )}
      <li>
        <FaUsers size={22} color='blue' />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends size={22} color='light-red' />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
};

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }
  componentDidMount() {
    const { playerOne, playerTwo } = this.props;
    battle([playerOne, playerTwo])
      .then(data => {
        const [winner, loser] = data;
        this.setState({ winner, loser, loading: false });
      })
      .catch(({ message }) => {
        this.setState({ error: message, loading: false });
      });
  }
  render() {
    const { winner, loser, loading, error } = this.state;
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <p className='text-center error'>{error}</p>;
    }
    return (
      <React.Fragment>
        <h2 className='header-lg text-center'>Results</h2>
        <div className='grid space-around'>
          <Card
            header={winner.score === loser.score ? 'Tiny' : 'Winner'}
            avatar={winner.profile.avatar_url}
            name={winner.profile.login}
            subHeader={`Score: ${winner.score}`}
            href={`https://github.com/${winner.profile.login}`}
          >
            <ProfileList profile={winner.profile} />
          </Card>
          <Card
            header={winner.score === loser.score ? 'Tiny' : 'loser'}
            avatar={loser.profile.avatar_url}
            name={loser.profile.login}
            subHeader={`Score: ${loser.score}`}
            href={`https://github.com/${loser.profile.login}`}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <button className='btn btn-dark btn-space' onClick={this.props.onReset}>
          Reset
        </button>
      </React.Fragment>
    );
  }
}

Results.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
};

export default Results;
