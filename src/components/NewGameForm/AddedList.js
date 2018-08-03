import React from "react";

const AddedList = ({ invitedUsers, removeUser }) => (
  <div>
    {invitedUsers.map(({ photoURL, username }) => (
      <div key={username}>
        <img src={photoURL} alt={username} height="25" width="25" />
        {username}
        <button
          onClick={e => {
            removeUser({ photoURL, username });
          }}
        >
          remove
        </button>
      </div>
    ))}
  </div>
);

export default AddedList;
