CREATE DATABASE final_project;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    cpf TEXT DEFAULT NULL,
    phone_number TEXT DEFAULT NULL
);

DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    cpf TEXT NOT NULL UNIQUE,
    phone_number TEXT NOT NULL,
    address TEXT,
    address2 TEXT,
    zip_code TEXT,
    district TEXT,
    city TEXT,
    state TEXT,
    status SMALLINT DEFAULT 0,
    user_id INTEGER REFERENCES users (id)
);