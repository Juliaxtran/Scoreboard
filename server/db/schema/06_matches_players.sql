DROP TABLE IF EXISTS matches_players CASCADE;
CREATE TABLE Matches_Players (
  match_id INTEGER NOT NULL REFERENCES Matches(id),
  player_id INTEGER NOT NULL REFERENCES Players(id),
  is_winner BOOLEAN NOT NULL DEFAULT false,
  is_loser BOOLEAN NOT NULL DEFAULT true,
  PRIMARY KEY (match_id, player_id)
);

-- PostMan 
-- {
--   "game_id": 4,
--   "date": "2017-01-01",
--   "players": [
--     {
--       "id": 1,
--       "is_winner": true,
--       "is_loser": false
--     },
--     {
--       "id": 2,
--       "is_winner": false,
--       "is_loser": true
--     }
--   ]
-- }