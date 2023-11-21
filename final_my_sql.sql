CREATE DATABASE oco;				
USE oco;	
				
CREATE TABLE users (	
user_idx INT AUTO_INCREMENT PRIMARY KEY,	
user_id varchar(300) unique,	
user_name VARCHAR(100),	
user_password VARCHAR(100),	
user_gender ENUM('M', 'W'),	
zip_code VARCHAR(20),	
address VARCHAR(255),	
address_detail VARCHAR(255),	
additional_info VARCHAR(100),	
user_hobby VARCHAR(100),	
user_phone_number VARCHAR(20),	
user_email VARCHAR(100),	
index(user_id)	
);	
insert into users(user_id,user_password,user_email) value(2,1,"l_h_j_123@naver.com");	
select * from users;	
drop table users;	
drop table business_users;	
select * from users;	
select * from business_users;	
insert into users(user_id,user_password) value("realCheck","1");	
insert into business_users(business_id,business_password,business_name,business_number,business_email) values("realCheck","1","12","12","12");	
CREATE TABLE business_users (	
business_idx int AUTO_INCREMENT PRIMARY KEY,	
business_id varchar(300),	
business_password VARCHAR(100) NOT NULL,	
business_name VARCHAR(100) NOT NULL,	
business_number VARCHAR(20) NOT NULL,	
business_zip_code VARCHAR(20),	
business_address VARCHAR(255),	
business_address_detail VARCHAR(255),	
business_additional_info VARCHAR(100),	
business_phone_number VARCHAR(20),	
business_email VARCHAR(100) NOT NULL,	
business_category VARCHAR(100),	
business_store_name varchar(200),	
	FOREIGN KEY (business_id) REFERENCES users(user_id)
);	
CREATE TABLE kakao_users (	
kakao_idx VARCHAR(100) PRIMARY KEY,	
kakao_name VARCHAR(100)	
);	
select * from kakao_users;	
drop table kakao_users;	
select * from kakao_users;	
CREATE TABLE business_info (	
business_info_idx int primary key auto_increment,	
visit_count INT,	
use_time VARCHAR(100),	
content TEXT,	
overall_grade DECIMAL(3, 2), -- 평점	
grade_count INT, -- 평가횟수	
amenities TEXT, -- 편의시설	
business_id varchar(300) unique	
);	
select * from business_info;	
	drop table business_info;
create table schedule(	
schedule_num bigint auto_increment primary key,	
schedule_date varchar(500),	
store_name varchar(300),	
addr varchar(300),	
memo text,	
coords text,	위도,경도로 맵에 마커랑 선 만들기 위해서 추가
user_id varchar(300)	
);	
	
drop table schedule;	
insert into schedule(store_name,user_id) value("11","dd");	
	
CREATE TABLE user_requests (	
request_num INT AUTO_INCREMENT PRIMARY KEY,	
category varchar(300),	
address VARCHAR(255),	
request_type VARCHAR(100),	
reg_date varchar(500),	
personnel INT,	
fuel VARCHAR(20),	
cost varchar(200),  -- money를 코스트로 수정	
amenities TEXT,	
memo TEXT,	
user_id varchar(300),	
business_id text	
);	
drop table user_requests;	
select * from user_requests;	
	
CREATE TABLE replies (	
board_num int,	
reply_num BIGINT AUTO_INCREMENT PRIMARY KEY,	
user_id varchar(300),	
grade double,	
	
reply_contents VARCHAR(1000),	
reg_date DATETIME  default CURRENT_TIMESTAMP,	
update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP	
);	
drop table replies;	
CREATE TABLE files (	
system_name VARCHAR(255),	
org_name VARCHAR(255),	
board_num BIGINT	
);	
select * from files;	
drop table files;	
	
CREATE TABLE boards (	
board_num BIGINT AUTO_INCREMENT PRIMARY KEY,	
board_title VARCHAR(255),	
board_contents TEXT,	
reg_date DATETIME  default CURRENT_TIMESTAMP,	
update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,	
read_count INT default 0,	
user_id varchar(300),	
reply_count INT,	
category varchar(500),	
topic varchar(500),	
secret boolean	
);	
	select * from boards;
	
drop table boards;	
	
CREATE TABLE Breplies (	
board_num int,	
reply_num BIGINT AUTO_INCREMENT PRIMARY KEY,	
user_id INT,	
board_id BIGINT,	
reply_contents VARCHAR(1000),	
reg_date DATETIME  default CURRENT_TIMESTAMP,	
update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,	
grade double	
);	
drop table Creplies;	
CREATE TABLE Bfiles (	
system_name VARCHAR(255),	
org_name VARCHAR(255),	
board_num BIGINT	
);	
drop table Cfiles;	
				
				
				