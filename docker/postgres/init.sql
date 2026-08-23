CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE lore_players (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  crew_handle   VARCHAR(50),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE flag_submissions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id   UUID UNIQUE REFERENCES lore_players(id) ON DELETE CASCADE,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);