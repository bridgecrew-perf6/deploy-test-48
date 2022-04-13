DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL,
    username VARCHAR(200) UNIQUE NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS comments;
CREATE TABLE IF NOT EXISTS comments (
   id SERIAL,
   comment TEXT NOT NULL,
   movie_id INT NOT NULL,
   created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id INTEGER,
    CONSTRAINT comments_pkey PRIMARY KEY (id),
    CONSTRAINT comments_fkey FOREIGN KEY (user_id) REFERENCES users(user_id)
);