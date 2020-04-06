CREATE TABLE users(
   id serial PRIMARY KEY,
   username VARCHAR (50) UNIQUE NOT NULL,
   password VARCHAR (355) NOT NULL,
   email VARCHAR (355) UNIQUE NOT NULL,
   token VARCHAR (355),
   is_admin BOOLEAN,
   is_active BOOLEAN,
   created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
   last_login TIMESTAMP
);

INSERT INTO users (username, email, is_active, is_admin, password)
VALUES ('erngorn@gmail.com', 'erngorn@gmail.com', true, true, '$2b$10$aCAqkNRVHi4slqDjwnMpBOI3.qrMM/DPur/1rpuIz0tHvom9ZJLl6');
