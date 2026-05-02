const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const DB_DIR = path.join(__dirname, '..', 'server', 'database');
const DB_PATH = path.join(DB_DIR, 'terrazza.db');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH);

const initSQL = `
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'admin', 'staff')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME,
  is_active INTEGER DEFAULT 1,
  preferences TEXT -- JSON
);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_desc TEXT,
  location TEXT,
  price_per_night REAL,
  max_guests INTEGER DEFAULT 2,
  bedrooms INTEGER DEFAULT 1,
  bathrooms INTEGER DEFAULT 1,
  amenities TEXT, -- JSON array
  images TEXT, -- JSON array of image URLs
  main_image TEXT,
  is_featured INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  property_id INTEGER NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER DEFAULT 1,
  total_price REAL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  special_requests TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  property_id INTEGER,
  booking_id INTEGER,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (property_id) REFERENCES properties(id),
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  property_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (property_id) REFERENCES properties(id),
  UNIQUE(user_id, property_id)
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Stakeholders / Intervenants table (for the concierge workflow)
CREATE TABLE IF NOT EXISTS stakeholders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  category TEXT, -- e.g., 'cleaning', 'maintenance', 'premium', 'platform', 'legal'
  description TEXT,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Project timeline / Tasks
CREATE TABLE IF NOT EXISTS timeline_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  phase TEXT, -- e.g., 'Phase 1', 'Phase 2', 'Phase 3'
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'blocked')),
  assigned_to INTEGER,
  start_date DATE,
  end_date DATE,
  dependencies TEXT, -- JSON array of task IDs
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_to) REFERENCES stakeholders(id)
);

-- Activity log
CREATE TABLE IF NOT EXISTS activity_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id INTEGER,
  details TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert demo admin user
INSERT OR IGNORE INTO users (email, password_hash, first_name, last_name, role)
VALUES (?, ?, 'Admin', 'Terrazza', 'admin');

-- Insert demo properties
INSERT OR IGNORE INTO properties (title, slug, description, short_desc, location, price_per_night, max_guests, bedrooms, bathrooms, amenities, images, main_image, is_featured)
VALUES 
  ('Cliffside Suite', 'cliffside-suite', 'A breathtaking suite perched on the cliff edge with panoramic Mediterranean views. Hand-painted Vietri ceramics and private infinity terrace.', 'Panoramic views with private infinity terrace', 'Positano, Amalfi Coast', 850, 2, 1, 1, '["WiFi","Pool","AC","Breakfast","Concierge","Sea View","Private Terrace","Minibar"]', '["/images/suite-1.jpg","/images/suite-2.jpg"]', '/images/suite-1.jpg', 1),
  ('Limonaia Suite', 'limonaia-suite', 'A converted 18th-century lemon house featuring original stone walls, lemon grove views, and an outdoor soaking tub.', 'Historic lemon house with outdoor soaking tub', 'Ravello, Amalfi Coast', 1200, 2, 1, 1, '["WiFi","Spa","AC","Breakfast","Concierge","Garden View","Outdoor Tub","Kitchen"]', '["/images/limonaia-1.jpg","/images/limonaia-2.jpg"]', '/images/limonaia-1.jpg', 1),
  ('Villa Terrazza', 'villa-terrazza', 'Exclusive three-bedroom villa with private chef service, heated infinity pool, and direct sea access.', 'Exclusive villa with private chef and pool', 'Praiano, Amalfi Coast', 3500, 6, 3, 3, '["WiFi","Pool","AC","Breakfast","Concierge","Sea View","Private Chef","Gym","Cinema"]', '["/images/villa-1.jpg","/images/villa-2.jpg"]', '/images/villa-1.jpg', 1);

-- Insert stakeholders
INSERT OR IGNORE INTO stakeholders (name, role, category, description)
VALUES 
  ('Property Owner', 'Owner', 'owner', 'Propriétaire du bien immobilier'),
  ('Luxury Guest', 'Client', 'client', 'Client final - touriste/voyageur de luxe'),
  ('Elite Cleaning Co.', 'Cleaning Service', 'cleaning', 'Société de nettoyage premium pour propriétés de luxe'),
  ('Mario Rossi', 'Maintenance Tech', 'maintenance', 'Technicien plomberie, électricité, climatisation'),
  ('Concierge Team', 'Concierge', 'concierge', 'Service client et coordination des séjours'),
  ('Giulia Bianchi', 'Photographer', 'photography', 'Photographe immobilier spécialisé luxe'),
  ('Revenue Pro', 'Revenue Manager', 'revenue', 'Gestionnaire de revenus et pricing dynamique'),
  ('Airbnb', 'Platform', 'platform', 'Plateforme de location courte durée'),
  ('Booking.com', 'Platform', 'platform', 'Plateforme hôtelière internationale'),
  ('VRBO', 'Platform', 'platform', 'Plateforme location vacances'),
  ('Luxe Drive', 'Chauffeur', 'premium', 'Service chauffeur privé haut de gamme'),
  ('Chef Antonio', 'Private Chef', 'premium', 'Chef à domicile - cuisine méditerranéenne étoilée'),
  ('Amalfi Wellness', 'Spa/Masseur', 'premium', 'Masseur et spa à domicile'),
  ('Costa Guide', 'Tour Guide', 'premium', 'Guide touristique privé - Sentiero degli Dei'),
  ('Legal Cover', 'Insurance/Legal', 'legal', 'Assurance et conseil juridique'),
  ('Finance Pro', 'Accountant', 'legal', 'Comptabilité et fiscalité');

-- Insert project timeline
INSERT OR IGNORE INTO timeline_tasks (title, description, phase, status, start_date, end_date)
VALUES 
  ('Discovery & Requirements', 'Define stakeholder roles, property specs, and luxury service tiers. Document all intervenants and their responsibilities.', 'Phase 1: Foundation', 'completed', '2024-01-01', '2024-01-31'),
  ('Brand Identity & Design', 'Create visual identity, mood boards, color palette, and design system. Photography and content creation.', 'Phase 1: Foundation', 'completed', '2024-02-01', '2024-02-28'),
  ('Platform Architecture', 'Set up infrastructure, database design, API architecture, and security protocols.', 'Phase 1: Foundation', 'completed', '2024-03-01', '2024-03-31'),
  ('MVP Development', 'Build core platform: auth, property listings, booking engine, payment placeholder, stakeholder dashboard.', 'Phase 2: Build', 'in_progress', '2024-04-01', '2024-05-31'),
  ('Integration & Testing', 'Connect all stakeholder workflows, test booking flow, validate payment placeholder, QA luxury experience.', 'Phase 2: Build', 'pending', '2024-06-01', '2024-06-30'),
  ('Concierge Training', 'Train concierge team on platform, workflows, escalation paths, and premium service standards.', 'Phase 3: Launch', 'pending', '2024-07-01', '2024-07-15'),
  ('Soft Launch', 'Launch with select properties and VIP guests. Collect feedback, iterate on experience.', 'Phase 3: Launch', 'pending', '2024-07-16', '2024-08-31'),
  ('Full Launch & Marketing', 'Public launch with full property portfolio, marketing campaign, and PR push.', 'Phase 3: Launch', 'pending', '2024-09-01', '2024-09-30');
`;

async function init() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  db.exec(initSQL, (err) => {
    if (err) {
      console.error('Error initializing database:', err);
      process.exit(1);
    }
    
    // Update admin password
    db.run('UPDATE users SET password_hash = ? WHERE email = ?', [adminPassword, 'admin@terrazza.com'], (err) => {
      if (err) console.error('Error setting admin password:', err);
      
      console.log('✅ Database initialized successfully');
      console.log('📊 Tables created: users, properties, bookings, reviews, favorites, contacts, stakeholders, timeline_tasks, activity_log');
      console.log('👤 Demo admin: admin@terrazza.com / admin123');
      console.log('🏠 Demo properties: 3 luxury properties inserted');
      console.log('👥 Stakeholders: 16 intervenants inserted');
      console.log('📅 Timeline: 8 project phases inserted');
      db.close();
    });
  });
}

init();
