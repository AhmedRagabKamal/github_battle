import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPopularRepo } from '../utils/api';
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from 'react-icons/fa';
import Card from './Card';
import Loading from './Loading';

function LanguageNav({ selected, handleLanguageUpdated }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Python', 'Java', 'Css'];
  return (
    <ul className='flex-center'>
      {languages.map(language => (
        <li key={language}>
          <button
            style={selected === language ? { color: 'red' } : null}
            onClick={() => handleLanguageUpdated(language)}
            className='btn-clear nav-link'
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguageNav.propTypes = {
  selected: PropTypes.string.isRequired,
  handleLanguageUpdated: PropTypes.func.isRequired
};

function ReposGrid({ repos }) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { owner, html_url, stargazers_count, forks, open_issues } = repo;
        const { login, avatar_url } = owner;
        return (
          <Card
            key={html_url}
            header={`#${index + 1}`}
            avatar={avatar_url}
            href={`https://github.com/${login}`}
            name={login}
          >
            <ul className='card-list'>
              <li>
                <FaUser color='#ffabcc' size={22} />
                <a href={`https://github.com/${login}`} target='_blank'>
                  {login}
                </a>
              </li>
              <li>
                <FaStar color='#00ff00' size={22} />
                {stargazers_count.toLocaleString()} stars
              </li>
              <li>
                <FaCodeBranch color='#ff0000' size={22} />
                {forks.toLocaleString()} forks
              </li>
              <li>
                <FaExclamationTriangle color='#0000ff' size={22} />
                {open_issues.toLocaleString()} open
              </li>
            </ul>
          </Card>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

export class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null
    };
    this.handleLanguageUpdated = this.handleLanguageUpdated.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.handleLanguageUpdated(this.state.selectedLanguage);
  }

  handleLanguageUpdated(selectedLanguage) {
    const { repos } = this.state;
    this.setState({ selectedLanguage, error: null });
    if (!repos[selectedLanguage]) {
      getPopularRepo(selectedLanguage)
        .then(data => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          }));
        })
        .catch(error => {
          console.warn('Something went wrong' + error);
          this.setState({ error });
        });
    }
  }

  isLoading() {
    const { repos, error, selectedLanguage } = this.state;
    return !repos[selectedLanguage] && error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;
    return (
      <React.Fragment>
        <LanguageNav
          selected={selectedLanguage}
          handleLanguageUpdated={this.handleLanguageUpdated}
        />
        {this.isLoading() && <Loading />}
        {error && <p>{error}</p>}
        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </React.Fragment>
    );
  }
}

export default Popular;
