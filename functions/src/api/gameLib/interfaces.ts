export interface Player {
  photoURL: string;
  position: number;
  username: string;
}
export interface _player {
  photoURL: string;
  position: number;
  username: string;
  uid: string;
}
export interface gameDigest {}
export interface _invite {
  username: string;
  uid: string;
  status: string;
}

export interface _game {
  gameName: string;
  owner: {
    uid: string;
    username: string;
  };
  gameStatus: "NEW_GAME" | "MATCH_STARTED" | "MATCH_ENDED";
  inviteOnly: boolean;
  invites?: _invite[];
  gameKey?: string;
  players?: _player[];
  currentMatch?;
}
