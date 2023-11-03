package com.oco.service;

import com.oco.domain.dto.UserDTO;

public interface UserService {
//	ajax로 유저 아이디 확인 
	public boolean findById(String userid);
//	로그인시 아이디 비밀번호
	UserDTO login(String userId, String userPassword);	
//	아이디를 이메일로 찾기
	public UserDTO findByEmail(String email);
//	아이디와 이메일로 비밀번호 찾기
	public UserDTO findByUserInfo(UserDTO user);
//	가입할때 
	boolean join(UserDTO user);
}
