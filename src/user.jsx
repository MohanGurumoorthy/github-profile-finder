import React from "react";

function User({ user }) {
  const { avatar_url, followers, following, public_repos, name, login, created_at } = user;
  const createdDate = new Date(created_at);

  return (
    <div className="user">
      <div className="user-header">
        <img src={avatar_url} className="avatar" alt="user" />
        <a href={`https://github.com/${login}`} target="_blank" rel="noopener noreferrer">
          {name || login}
        </a>
        <p>Joined on {`${createdDate.getDate()} ${createdDate.toLocaleString("en-us", { month: "short" })} ${createdDate.getFullYear()}`}</p>
      </div>

      <div className="user-stats">
        <article>
          <p>Public Repos</p>
          <strong>{public_repos}</strong>
        </article>
        <article>
          <p>Followers</p>
          <strong>{followers}</strong>
        </article>
        <article>
          <p>Following</p>
          <strong>{following}</strong>
        </article>
      </div>
    </div>
  );
}

export default User;
