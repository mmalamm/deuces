import React, { Component } from "react";

class AddedList extends Component {
  render() {
    console.log(this.props.invitedUsers);
    return (
      <div>
        {this.props.invitedUsers.map(({ photoURL, username }) => (
          <div key={username}>
            <img src={photoURL} alt={username} height="2rem" width="2rem" />
            {username}
          </div>
        ))}
      </div>
    );
  }
}

export default AddedList;
