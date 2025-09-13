-- Insert sample school info
INSERT INTO public.school_info (category, title, content) VALUES
('contact', 'School Address', 'Sunshine Academy, 123 Education Street, Learning City, LC 12345'),
('contact', 'Phone Number', '+1 (555) 123-4567'),
('contact', 'Email', 'info@sunshineacademy.edu'),
('timings', 'School Hours', 'Monday to Friday: 8:00 AM - 3:00 PM'),
('timings', 'Office Hours', 'Monday to Friday: 7:30 AM - 4:00 PM'),
('policies', 'Attendance Policy', 'Students must maintain 90% attendance for academic progression'),
('policies', 'Fee Payment', 'Fees are due by the 10th of each month. Late payments incur a 5% penalty');

-- Insert sample events
INSERT INTO public.events (title, description, event_date, event_time, location, category) VALUES
('Annual Sports Day', 'Join us for our annual sports competition featuring various athletic events', '2024-03-15', '09:00:00', 'School Playground', 'sports'),
('Parent-Teacher Conference', 'Individual meetings to discuss student progress', '2024-03-20', '14:00:00', 'Classrooms', 'academic'),
('Science Fair', 'Students showcase their innovative science projects', '2024-04-05', '10:00:00', 'School Auditorium', 'academic'),
('Cultural Festival', 'Celebration of diverse cultures with performances and food', '2024-04-12', '11:00:00', 'Main Hall', 'cultural'),
('Spring Break', 'School holiday - no classes', '2024-04-15', NULL, NULL, 'holiday');
