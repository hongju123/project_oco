package com.oco.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oco.domain.dto.UserDTO;
import com.oco.mapper.UserMapper;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserMapper um;

	@Override
	public boolean findById(String id) {
		return um.findById(id) == null;
	}

	@Override
	public UserDTO login(String userid, String userpw) {
		UserDTO user = um.findByUser(userid, userpw);
		if (user != null) {
			if (user.getUserPassword().equals(userpw)) {
				return user;
			}
		}
		return null;
	}

	@Override
	public UserDTO findByEmail(String email) {
		return um.findByEmail(email);
	}

	@Override
	public UserDTO findByUserInfo(UserDTO user) {
		UserDTO userDto = um.findByUserInfo(user);
		if (userDto != null) {
			return userDto;
		} else {
			return null;
		}
	}

	@Override
	public boolean join(UserDTO user) {
		return um.insertUser(user) == 1;
	}

	@Override
	public boolean withdrawUser(String userId) {
		return um.withdrawUser(userId);
	}

	@Override
	public boolean withdrawBusinessUser(String userId) {
		return um.withdrawBusinessUser(userId)&&um.withdrawUser(userId);
		
	}
}
