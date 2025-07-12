-- Insert sample rooms
INSERT INTO rooms (name, type, price, capacity, beds, bathrooms, size, description, amenities, images, video_url) VALUES
('Deluxe Ocean View Suite', 'Suite', 150.00, 2, 1, 1, '45 sqm', 
 'Luxurious suite with breathtaking ocean views and premium amenities.',
 '["Ocean View", "King Bed", "Balcony", "Mini Bar", "WiFi", "AC", "TV", "Phone"]',
 '["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"]',
 '/placeholder-video.mp4'),

('Executive Business Room', 'Room', 120.00, 2, 1, 1, '35 sqm',
 'Perfect for business travelers with dedicated workspace and city views.',
 '["City View", "Queen Bed", "Work Desk", "Coffee Machine", "WiFi", "AC", "TV", "Phone"]',
 '["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"]',
 '/placeholder-video.mp4'),

('Family Apartment', 'Apartment', 200.00, 4, 2, 2, '80 sqm',
 'Spacious apartment ideal for families with full kitchen and living area.',
 '["2 Bedrooms", "Kitchen", "Living Room", "Dining Area", "WiFi", "AC", "TV", "Parking"]',
 '["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"]',
 '/placeholder-video.mp4'),

('Standard Double Room', 'Room', 80.00, 2, 1, 1, '25 sqm',
 'Comfortable and affordable room with garden views.',
 '["Double Bed", "Garden View", "WiFi", "AC", "TV", "Phone"]',
 '["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"]',
 '/placeholder-video.mp4'),

('Presidential Suite', 'Suite', 300.00, 4, 2, 2, '120 sqm',
 'Ultimate luxury with panoramic views and exclusive butler service.',
 '["2 Bedrooms", "Living Room", "Dining Room", "Jacuzzi", "Butler Service", "WiFi", "AC", "TV"]',
 '["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"]',
 '/placeholder-video.mp4'),

('Studio Apartment', 'Apartment', 100.00, 2, 1, 1, '40 sqm',
 'Modern studio with kitchenette, perfect for extended stays.',
 '["Kitchenette", "Living Area", "Queen Bed", "WiFi", "AC", "TV", "Parking"]',
 '["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"]',
 '/placeholder-video.mp4');

-- Insert sample guests
INSERT INTO guests (first_name, last_name, email, phone, address) VALUES
('John', 'Doe', 'john.doe@example.com', '+256 700 123 456', 'Kampala, Uganda'),
('Sarah', 'Johnson', 'sarah.johnson@example.com', '+256 700 234 567', 'Entebbe, Uganda'),
('Michael', 'Chen', 'michael.chen@example.com', '+256 700 345 678', 'Jinja, Uganda'),
('Emma', 'Wilson', 'emma.wilson@example.com', '+256 700 456 789', 'Mbarara, Uganda'),
('David', 'Brown', 'david.brown@example.com', '+256 700 567 890', 'Gulu, Uganda');

-- Insert sample bookings
INSERT INTO bookings (booking_id, guest_id, room_id, check_in_date, check_out_date, guests_count, status, total_amount, payment_method, payment_status) VALUES
('BK001', 1, 1, '2024-01-15', '2024-01-18', 2, 'confirmed', 450.00, 'mtn', 'paid'),
('BK002', 2, 2, '2024-01-16', '2024-01-19', 2, 'checked-in', 360.00, 'airtel', 'paid'),
('BK003', 3, 3, '2024-01-17', '2024-01-20', 4, 'pending', 600.00, 'card', 'pending'),
('BK004', 4, 4, '2024-01-18', '2024-01-21', 2, 'confirmed', 240.00, 'mtn', 'paid'),
('BK005', 5, 5, '2024-01-19', '2024-01-22', 4, 'confirmed', 900.00, 'card', 'paid');

-- Insert sample payments
INSERT INTO payments (booking_id, amount, payment_method, payment_reference, status) VALUES
(1, 450.00, 'mtn', 'MTN123456789', 'completed'),
(2, 360.00, 'airtel', 'AIR987654321', 'completed'),
(4, 240.00, 'mtn', 'MTN456789123', 'completed'),
(5, 900.00, 'card', 'CARD789123456', 'completed');

-- Insert sample reviews
INSERT INTO reviews (booking_id, guest_id, room_id, rating, comment) VALUES
(1, 1, 1, 5, 'Absolutely stunning room with incredible ocean views! The staff was exceptional and the amenities were top-notch. Will definitely stay here again.'),
(2, 2, 2, 5, 'Perfect for our honeymoon. The balcony was amazing for morning coffee and the bed was incredibly comfortable. Highly recommend!'),
(4, 4, 4, 4, 'Beautiful room and great location. The only minor issue was the WiFi speed, but everything else was perfect.');

-- Insert admin user
INSERT INTO admin_users (username, email, password_hash, role) VALUES
('admin', 'admin@brighthotel.com', '$2b$10$example_hash_here', 'admin'),
('manager', 'manager@brighthotel.com', '$2b$10$example_hash_here', 'manager');
