use jk_electronic;

create table if not exists admin (
    id int PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) not null,
    email VARCHAR(100) not null UNIQUE,
    password VARCHAR(300) not null,
    role ENUM('admin', 'none') DEFAULT 'admin'
)