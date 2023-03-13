DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE Games (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  group_id INTEGER NOT NULL REFERENCES Groups(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);