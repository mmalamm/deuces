import React from "react";

const AddedList = ({ invitedUsers }) => (
  <div>
    {invitedUsers.map(({ photoURL, username }) => (
      <div key={username}>
        <img src={photoURL} alt={username} height="25" width="25" />
        {username}
      </div>
    ))}
  </div>
);

export default AddedList;
