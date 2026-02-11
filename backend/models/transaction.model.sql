use jk_electronic;

create table if not exists transaction (
    id int PRIMARY KEY AUTO_INCREMENT,
    user_id int not null,
    order_id VARCHAR(255) not null,
    payment_id VARCHAR(255),
    signature VARCHAR(255),
    amount decimal(10, 2) not null,
    currency VARCHAR(10) DEFAULT 'INR',
    status ENUM(
        'pending',
        'success',
        'failed'
    ) DEFAULT 'pending',
    method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
)