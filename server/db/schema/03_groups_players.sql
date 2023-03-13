DROP TABLE IF EXISTS groups_players CASCADE;
CREATE TABLE Groups_Players (
  group_id INTEGER NOT NULL REFERENCES Groups(id),
  player_id INTEGER NOT NULL REFERENCES Players(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (group_id, player_id)
);