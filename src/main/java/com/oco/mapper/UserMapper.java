package com.oco.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.oco.domain.dto.UserDTO;

@Mapper
public interface UserMapper {
	public UserDTO findById(String userId);
	public UserDTO findByUser(String userId,String userPassword);
	public UserDTO findByEmail(String UserEmail);
	public UserDTO findByUserInfo(UserDTO user);
	int insertUser(UserDTO user);
}
