DROP DATABASE IF EXISTS test_db;

CREATE DATABASE test_db;
USE test_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE users_input (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, 
    feeling VARCHAR(50) NOT NULL,
    place_description TEXT NOT NULL,
    rating INT NOT NULL,
    FOREIGN KEY (user_id) REFERNCES users(id),
    CHECK (rating >= 1 AND rating <= 5)
);

