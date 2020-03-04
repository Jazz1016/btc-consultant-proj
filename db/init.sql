CREATE TABLE users(
user_id SERIAL PRIMARY KEY,
email VARCHAR(70),
password VARCHAR(200),
first_name VARCHAR(25),
last_name VARCHAR(25),
isadmin BOOLEAN
)

CREATE TABLE products(
product_id SERIAL PRIMARY KEY,
product_name VARCHAR(50) NOT NULL,
product_img VARCHAR(300),
price INTEGER NOT NULL,
description VARCHAR(200),
available BOOLEAN NOT NULL
)

CREATE TABLE users_products(
cart_id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(user_id),
product_id INTEGER REFERENCES products(product_id)
)

CREATE TABLE contact_messages(
contact_msg_id SERIAL PRIMARY KEY,
name VARCHAR(40),
subject VARCHAR(45),
email VARCHAR(100),
message VARCHAR(400)
)

CREATE TABLE blog_posts(
blog_id SERIAL PRIMARY KEY,
blog_img VARCHAR(300),
title VARCHAR(50),
body VARCHAR(1000)
)

CREATE TABLE subscribers(
sub_id SERIAL PRIMARY KEY,
sub_email VARCHAR(50)
)
