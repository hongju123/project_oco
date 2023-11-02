CREATE DATABASE oco;
USE oco;

CREATE TABLE users (
    user_idx INT AUTO_INCREMENT PRIMARY KEY,
    user_id varchar(300),
    user_name VARCHAR(100),
    user_password VARCHAR(100),  
    user_gender ENUM('Male', 'Female', 'Other'),
    zip_code VARCHAR(20),
    address VARCHAR(255),
    address_detail VARCHAR(255),
    additional_info VARCHAR(100),
    user_hobby VARCHAR(100),
    user_phone_number VARCHAR(20),
    user_email VARCHAR(100)
);


CREATE TABLE kakao_users (
    kakao_id VARCHAR(100) PRIMARY KEY,
    kakao_name VARCHAR(100)
);

CREATE TABLE business_users (
    business_idx int AUTO_INCREMENT PRIMARY KEY,
    business_id varchar(300),
    business_password VARCHAR(100) NOT NULL, 
    business_name VARCHAR(100) NOT NULL,
    business_number VARCHAR(20) NOT NULL,
    business_address VARCHAR(255),
    business_phone_number VARCHAR(20),
    business_email VARCHAR(100) NOT NULL,
    business_category VARCHAR(100),
    business_store_name varchar(200)
);

CREATE TABLE business_info (
    visit_count INT,
    use_time VARCHAR(100),
    content TEXT,
    overall_grade DECIMAL(3, 2), -- 평점  
    grade_count INT, -- 평가횟수 
    amenities TEXT -- 편의시설
);

CREATE TABLE boards (
    board_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    board_title VARCHAR(255),
    board_contents TEXT,
    reg_date DATETIME,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    read_count INT,
    user_id INT,  
    reply_count INT
);

CREATE TABLE schedules (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_date DATETIME,
    place_name VARCHAR(255),
    schedule_content TEXT,
    user_id INT  
);

CREATE TABLE user_requests (
    request_idx INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,  
    address VARCHAR(255),
    request_type VARCHAR(100),
    reg_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    personnel INT,
    fuel VARCHAR(20),
    cost varchar(200),  -- money를 코스트로 수정 
    amenities TEXT,
    memo TEXT,
    business_id INT  
);

CREATE TABLE replies (
    reply_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, 
    board_id BIGINT,  
    reply_contents VARCHAR(1000),
    reg_date DATETIME,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE files (
    file_id INT AUTO_INCREMENT PRIMARY KEY,
    system_name VARCHAR(255),
    org_name VARCHAR(255),
    board_num BIGINT 
);
