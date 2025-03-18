CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(120) NOT NULL,
        email VARCHAR(120) NOT NULL UNIQUE,
        pw_hash VARCHAR(120) NOT NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR (80) NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(150) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    in_stock BOOLEAN NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);