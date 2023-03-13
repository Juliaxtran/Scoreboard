DROP TABLE IF EXISTS matches_players CASCADE;
CREATE TABLE Matches_Players (
  match_id INTEGER NOT NULL REFERENCES Matches(id),
  player_id INTEGER NOT NULL REFERENCES Players(id),
  is_winner BOOLEAN NOT NULL DEFAULT false,
  is_loser BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY (match_id, player_id)
);