package com.oco.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.oco.domain.dto.KakaoUserDTO;

@Mapper
public interface KakaoUserMapper {
	public KakaoUserDTO findByUser(String kakaoidx);
	public int insertUser(KakaoUserDTO kakaoUser);
}
