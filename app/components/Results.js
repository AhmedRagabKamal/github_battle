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
      return <p>Loading ....</p>;
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
            <ul className='card-list'>
              <li>
                <FaUser size={22} color='red' />
                {winner.profile.name}
              </li>
              {winner.profile.location && (
                <li>
                  <FaCompass size={22} color='gray' />
                  {winner.profile.location.toLocaleString()}
                </li>
              )}
              {winner.profile.company && (
                <li>
                  <FaBriefcase size={22} color='green' />
                  {winner.profile.company.toLocaleString()}
                </li>
              )}
              <li>
                <FaUsers size={22} color='blue' />
                {winner.profile.followers.toLocaleString()} followers
              </li>
              <li>
                <FaUserFriends size={22} color='light-red' />
                {winner.profile.following.toLocaleString()} following
              </li>
            </ul>
          </Card>
          <Card
            header={loser.score === loser.score ? 'Tiny' : 'loser'}
            avatar={loser.profile.avatar_url}
            name={loser.profile.login}
            subHeader={`Score: ${loser.score}`}
            href={`https://github.com/${loser.profile.login}`}
          >
            <ul className='card-list'>
              <li>
                <FaUser size={22} color='red' />
                {loser.profile.name}
              </li>
              {loser.profile.location && (
                <li>
                  <FaCompass size={22} color='gray' />
                  {loser.profile.location.toLocaleString()}
                </li>
              )}
              {loser.profile.company && (
                <li>
                  <FaBriefcase size={22} color='green' />
                  {loser.profile.company.toLocaleString()}
                </li>
              )}
              <li>
                <FaUsers size={22} color='blue' />
                {loser.profile.followers.toLocaleString()} followers
              </li>
              <li>
                <FaUserFriends size={22} color='light-red' />
                {loser.profile.following.toLocaleString()} following
              </li>
            </ul>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default Results;
