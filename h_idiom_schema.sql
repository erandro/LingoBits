/* Create and use the db */
DROP DATABASE IF EXISTS idioms_db;
CREATE DATABASE idioms_db;
USE idioms_db;


CREATE TABLE idioms
(
    id int NOT NULL
    AUTO_INCREMENT,
original_idiom varchar
    (255) NOT NULL,
pronunciation varchar
    (255) NOT NULL,
literal_translation varchar
    (255) NOT NULL,
meaning varchar
    (255) NOT NULL,
language varchar
    (255) NOT NULL,
PRIMARY KEY
    (id)
);