CREATE TABLE parkings (
    id serial PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    total_slots INTEGER DEFAULT 0,
    free_slots INTEGER DEFAULT 0,
    price INTEGER DEFAULT 0,
    address VARCHAR (255)
);
