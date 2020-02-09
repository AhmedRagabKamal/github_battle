const id = 'e05ea8f629061d85f1d8';
const secret = 'a436aafdf3fd7bf63144b1089ff4bfdb12e2be99';
const params = `?client_id=${id}&client_secret=${secret}`;

function getErrorMessage(message, username) {
  if (message === 'Not Found') {
    return `${username} doesn't exist`;
  }
  return message;
}

function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}${params}`)
    .then(res => res.json())
    .then(profile => {
      if (profile.message) {
        throw new Error(getErrorMessage(profile.message, username));
      }
      return profile;
    });
}

function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  )
    .then(res => res.json())
    .then(repos => {
      if (repos.message) {
        throw new Error(getErrorMessage(repos.message, username));
      }
      return repos;
    });
}

function getStarCount(repos) {
  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

function getUserData(player) {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile.followers, repos)
    })
  );
}

function getSortedResults(results) {
  return results.sort((a, b) => b.score - a.score);
}

export function battle(players) {
  return Promise.all([
    getUserData(players[0]),
    getUserData(players[1])
  ]).then(results => getSortedResults(results));
}

export function getPopularRepo(language) {
  const url = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.items) {
        throw new Error(data.message);
      }
      return data.items;
    });
}
export default { getPopularRepo, battle };
