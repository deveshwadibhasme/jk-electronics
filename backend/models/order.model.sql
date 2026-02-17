use jk_electronic;

create table if not exists order_items (
    id int PRIMARY KEY AUTO_INCREMENT,
    order_id int not null,
    product_id int not null,
    quantity int not null,
    price decimal(10, 2) not null,
)

create table if not exists `order` (
    id int PRIMARY KEY AUTO_INCREMENT,
    user_id int not null,
    razorpay_order_id VARCHAR(255) not null,
    total_amount decimal(10, 2) not null,
    status ENUM(
        'pending',
        'processing',
        'shipped',
        'delivered',
        'cancelled'
    ) DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    shipping_address TEXT not null,
    contact_number VARCHAR(15) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);

-- create table if not exists order_items (
--     id int PRIMARY KEY AUTO_INCREMENT,
--     order_id int not null,
--     product_id int not null,
--     quantity int not null,
--     price decimal(10, 2) not null,
--     FOREIGN KEY (order_id) REFERENCES `order` (id) ON DELETE CASCADE,
--     FOREIGN KEY (product_id) REFERENCES product (id)
-- );