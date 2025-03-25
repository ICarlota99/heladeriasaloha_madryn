CREATE TYPE user_role AS ENUM ('owner', 'worker', 'customer');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(120) NOT NULL,
    email VARCHAR(120) UNIQUE,
    phone VARCHAR(15) UNIQUE,
    pw_hash VARCHAR(120) NOT NULL,
    role user_role NOT NULL DEFAULT 'customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE unverified_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(120) NOT NULL,
    email VARCHAR(120),
    phone VARCHAR(15),
    pw_hash VARCHAR(120) NOT NULL,
    verification_token VARCHAR(120) NOT NULL,
    token_expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
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