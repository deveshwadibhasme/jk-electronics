use jk_electronic;

create table if not exists product (
    id int PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) not null,
    description TEXT,
    price decimal(10, 2) not null,
    stock_quantity int DEFAULT 0,
    image_url VARCHAR(255),
    is_active boolean DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table if not exists product_images (
    id int PRIMARY KEY AUTO_INCREMENT,
    product_id int not null,
    image_url VARCHAR(255) not null,
    FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE
);