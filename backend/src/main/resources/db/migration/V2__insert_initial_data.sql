INSERT INTO categories (name, description)
VALUES
('Electronics', 'Electronic products'),
('Stationery', 'Office supplies');

INSERT INTO products (
    name,
    sku,
    price,
    category_id,
    stock_quantity
)
VALUES
(
    'Keyboard',
    'KB001',
    3500.00,
    (SELECT id FROM categories WHERE name = 'Electronics'),
    50
),
(
    'Mouse',
    'M001',
    1500.00,
    (SELECT id FROM categories WHERE name = 'Electronics'),
    100
),
(
    'Notebook',
    'NB001',
    500.00,
    (SELECT id FROM categories WHERE name = 'Stationery'),
    200
);