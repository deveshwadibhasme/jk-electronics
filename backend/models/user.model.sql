use jk_electronic;

create table if not exists user (
    id int PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) not null,
    email VARCHAR(100) not null UNIQUE,
    password VARCHAR(300) not null,
    number VARCHAR(12) not null,
    role ENUM('user', 'none') DEFAULT 'user',
    isBlock boolean DEFAULT false,
    address TEXT not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

alter table `user` MODIFY column address TEXT not null;