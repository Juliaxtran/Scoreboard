DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE Groups_Matches (
  group_id INTEGER NOT NULL REFERENCES Groups(id),
  match_id INTEGER NOT NULL REFERENCES Matches(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (group_id, match_id)
);

