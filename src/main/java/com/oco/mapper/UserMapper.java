package com.oco.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.oco.domain.dto.UserDTO;

@Mapper
public interface UserMapper {
	public UserDTO findById(String userid);
	public UserDTO findByUser(String userid,String userpw);
	public UserDTO findByEmail(String email);
	public UserDTO findByUserInfo(UserDTO user);
	int insertUser(UserDTO user);
}
