
-- ============================================================
-- SCHOOL INFORMATION WEBSITE DATABASE
-- PostgreSQL schema for:
-- React/Vite frontend + FastAPI + SQLAlchemy + PostgreSQL
--
-- Scope:
-- PUBLIC INFORMATION WEBSITE ONLY
-- No login, students, attendance, marks or authentication.
-- ============================================================

CREATE DATABASE school_website;

-- After creating the database, connect to it:
-- \c school_website


-- ============================================================
-- 1. SCHOOL PROFILE
-- ============================================================

CREATE TABLE school_profile (
    id BIGSERIAL PRIMARY KEY,

    name_mr VARCHAR(200) NOT NULL,
    name_en VARCHAR(200) NOT NULL,

    tagline_mr VARCHAR(300),
    tagline_en VARCHAR(300),

    classes_mr VARCHAR(100),
    classes_en VARCHAR(100),

    location_mr VARCHAR(200),
    location_en VARCHAR(200),

    board VARCHAR(100),
    founded_year INTEGER,

    phone VARCHAR(30),
    email VARCHAR(150),

    address_mr TEXT,
    address_en TEXT,

    school_hours_mr VARCHAR(200),
    school_hours_en VARCHAR(200),

    logo_url TEXT,
    campus_image_url TEXT,

    facebook_url TEXT,
    instagram_url TEXT,
    youtube_url TEXT,
    whatsapp_number VARCHAR(30),

    about_mr TEXT,
    about_en TEXT,

    vision_mr TEXT,
    vision_en TEXT,

    mission_mr TEXT,
    mission_en TEXT,

    principal_name_mr VARCHAR(200),
    principal_name_en VARCHAR(200),
    principal_designation_mr VARCHAR(150),
    principal_designation_en VARCHAR(150),
    principal_message_mr TEXT,
    principal_message_en TEXT,
    principal_photo_url TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 2. SCHOOL STATISTICS
-- ============================================================

CREATE TABLE school_statistics (
    id BIGSERIAL PRIMARY KEY,
    stat_key VARCHAR(50) NOT NULL UNIQUE,

    value VARCHAR(50) NOT NULL,

    label_mr VARCHAR(200) NOT NULL,
    label_en VARCHAR(200) NOT NULL,

    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);


-- ============================================================
-- 3. SCHOOL HISTORY
-- ============================================================

CREATE TABLE school_history (
    id BIGSERIAL PRIMARY KEY,

    title_mr VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,

    description_mr TEXT,
    description_en TEXT,

    year_or_period VARCHAR(100),

    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);


-- ============================================================
-- 4. CLASSES
-- ============================================================

CREATE TABLE classes (
    id BIGSERIAL PRIMARY KEY,

    class_number INTEGER NOT NULL UNIQUE
        CHECK (class_number BETWEEN 5 AND 10),

    name_mr VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,

    description_mr TEXT,
    description_en TEXT,

    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);


-- ============================================================
-- 5. SUBJECTS
-- ============================================================

CREATE TABLE subjects (
    id BIGSERIAL PRIMARY KEY,

    name_mr VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,

    description_mr TEXT,
    description_en TEXT,

    icon_name VARCHAR(100),

    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);


-- ============================================================
-- 6. CLASS <-> SUBJECT RELATION
-- ============================================================

CREATE TABLE class_subjects (
    class_id BIGINT NOT NULL
        REFERENCES classes(id) ON DELETE CASCADE,

    subject_id BIGINT NOT NULL
        REFERENCES subjects(id) ON DELETE CASCADE,

    display_order INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (class_id, subject_id)
);


-- ============================================================
-- 7. TEACHERS
-- ============================================================

CREATE TABLE teachers (
    id BIGSERIAL PRIMARY KEY,

    name_mr VARCHAR(200) NOT NULL,
    name_en VARCHAR(200) NOT NULL,

    subject_mr VARCHAR(150),
    subject_en VARCHAR(150),

    qualification_mr VARCHAR(250),
    qualification_en VARCHAR(250),

    experience_years INTEGER
        CHECK (experience_years IS NULL OR experience_years >= 0),

    description_mr TEXT,
    description_en TEXT,

    photo_url TEXT,

    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 8. STUDENT LIFE / ACTIVITIES
-- ============================================================

CREATE TABLE activities (
    id BIGSERIAL PRIMARY KEY,

    title_mr VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,

    description_mr TEXT,
    description_en TEXT,

    category VARCHAR(100),

    icon_name VARCHAR(100),
    image_url TEXT,

    is_special_activity BOOLEAN NOT NULL DEFAULT FALSE,

    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 9. FACILITIES
-- ============================================================

CREATE TABLE facilities (
    id BIGSERIAL PRIMARY KEY,

    name_mr VARCHAR(200) NOT NULL,
    name_en VARCHAR(200) NOT NULL,

    description_mr TEXT,
    description_en TEXT,

    icon_name VARCHAR(100),
    image_url TEXT,

    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);


-- ============================================================
-- 10. NOTICES
-- ============================================================

CREATE TABLE notices (
    id BIGSERIAL PRIMARY KEY,

    title_mr VARCHAR(300) NOT NULL,
    title_en VARCHAR(300) NOT NULL,

    description_mr TEXT,
    description_en TEXT,

    category VARCHAR(100) NOT NULL,

    notice_date DATE NOT NULL,

    attachment_url TEXT,

    is_important BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 11. EVENTS
-- ============================================================

CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,

    title_mr VARCHAR(300) NOT NULL,
    title_en VARCHAR(300) NOT NULL,

    description_mr TEXT,
    description_en TEXT,

    event_date DATE NOT NULL,
    event_time TIME,

    location_mr VARCHAR(250),
    location_en VARCHAR(250),

    image_url TEXT,

    category VARCHAR(100),
    color_theme VARCHAR(50),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 12. GALLERY
-- ============================================================

CREATE TABLE gallery (
    id BIGSERIAL PRIMARY KEY,

    category VARCHAR(100) NOT NULL,

    caption_mr VARCHAR(300),
    caption_en VARCHAR(300),

    image_url TEXT NOT NULL,

    display_order INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 13. ADMISSION INFORMATION
-- ============================================================

CREATE TABLE admission_info (
    id BIGSERIAL PRIMARY KEY,

    section_type VARCHAR(50) NOT NULL,
    -- Examples:
    -- eligibility
    -- documents
    -- important_dates
    -- fees

    title_mr VARCHAR(300) NOT NULL,
    title_en VARCHAR(300) NOT NULL,

    content_mr TEXT,
    content_en TEXT,

    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);


-- ============================================================
-- 14. ADMISSION PROCESS
-- ============================================================

CREATE TABLE admission_process (
    id BIGSERIAL PRIMARY KEY,

    step_number INTEGER NOT NULL UNIQUE,

    title_mr VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,

    description_mr TEXT,
    description_en TEXT,

    icon_name VARCHAR(100),

    is_active BOOLEAN NOT NULL DEFAULT TRUE
);


-- ============================================================
-- 15. ADMISSION FAQ
-- ============================================================

CREATE TABLE admission_faq (
    id BIGSERIAL PRIMARY KEY,

    question_mr TEXT NOT NULL,
    question_en TEXT NOT NULL,

    answer_mr TEXT NOT NULL,
    answer_en TEXT NOT NULL,

    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);


-- ============================================================
-- 16. CONTACT MESSAGES
-- ============================================================

CREATE TABLE contact_messages (
    id BIGSERIAL PRIMARY KEY,

    full_name VARCHAR(200) NOT NULL,
    mobile VARCHAR(20),
    email VARCHAR(200),

    subject VARCHAR(300),
    message TEXT NOT NULL,

    is_read BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_notices_date
    ON notices(notice_date DESC);

CREATE INDEX idx_notices_category
    ON notices(category);

CREATE INDEX idx_events_date
    ON events(event_date);

CREATE INDEX idx_gallery_category
    ON gallery(category);

CREATE INDEX idx_teachers_active
    ON teachers(is_active);

CREATE INDEX idx_facilities_active
    ON facilities(is_active);

CREATE INDEX idx_activities_category
    ON activities(category);

CREATE INDEX idx_contact_messages_created
    ON contact_messages(created_at DESC);


-- ============================================================
-- INITIAL SCHOOL DATA
-- Replace these placeholders with the actual school details.
-- ============================================================

INSERT INTO school_profile (
    name_mr,
    name_en,
    tagline_mr,
    tagline_en,
    classes_mr,
    classes_en,
    location_mr,
    location_en,
    board,
    phone,
    email,
    address_mr,
    address_en,
    school_hours_mr,
    school_hours_en
)
VALUES (
    '[YOUR SCHOOL NAME]',
    '[YOUR SCHOOL NAME]',
    'ज्ञान • संस्कार • प्रगती',
    'Learn • Grow • Inspire',
    'इयत्ता ५वी ते १०वी',
    'Classes 5th to 10th',
    '[शहर], महाराष्ट्र, भारत',
    '[City], Maharashtra, India',
    '[STATE BOARD / CBSE / OTHER]',
    '[+91 XXXXX XXXXX]',
    '[school@example.com]',
    '[शाळेचा संपूर्ण पत्ता, तालुका, जिल्हा, महाराष्ट्र]',
    '[Complete School Address, Taluka, District, Maharashtra]',
    'सोमवार – शनिवार: सकाळी ७:३० – दुपारी २:३०',
    'Monday – Saturday: 7:30 AM – 2:30 PM'
);


-- ============================================================
-- INITIAL CLASSES
-- ============================================================

INSERT INTO classes
(class_number, name_mr, name_en, display_order)
VALUES
(5, 'इयत्ता ५वी', 'Class 5', 1),
(6, 'इयत्ता ६वी', 'Class 6', 2),
(7, 'इयत्ता ७वी', 'Class 7', 3),
(8, 'इयत्ता ८वी', 'Class 8', 4),
(9, 'इयत्ता ९वी', 'Class 9', 5),
(10, 'इयत्ता १०वी', 'Class 10', 6);


-- ============================================================
-- INITIAL SUBJECTS
-- ============================================================

INSERT INTO subjects
(name_mr, name_en, icon_name, display_order)
VALUES
('मराठी', 'Marathi', 'book-open', 1),
('हिंदी', 'Hindi', 'languages', 2),
('इंग्रजी', 'English', 'globe', 3),
('गणित', 'Mathematics', 'calculator', 4),
('विज्ञान', 'Science', 'flask-conical', 5),
('सामाजिक शास्त्रे', 'Social Science', 'globe-2', 6),
('संगणक', 'Computer', 'cpu', 7),
('कला', 'Art', 'palette', 8);


-- ============================================================
-- INITIAL SCHOOL STATISTICS
-- ============================================================

INSERT INTO school_statistics
(stat_key, value, label_mr, label_en, display_order)
VALUES
('years', '10+', 'वर्षांची शैक्षणिक परंपरा', 'Years of Educational Excellence', 1),
('students', '500+', 'विद्यार्थी', 'Students', 2),
('teachers', '30+', 'अनुभवी शिक्षक', 'Experienced Teachers', 3),
('development', '100%', 'सर्वांगीण विकास', 'Holistic Development', 4);


-- ============================================================
-- IMPORTANT:
--
-- Keep UI translations in:
-- src/data/translations.js
--
-- Store actual school content in PostgreSQL.
--
-- Images should preferably be stored in:
-- cloud storage / object storage / public image hosting
-- and only their URLs should be stored in PostgreSQL.
--
-- Do NOT store React components or Lucide icons in PostgreSQL.
-- Store an icon_name string such as:
-- "calculator", "flask-conical", "cpu"
--
-- ============================================================
