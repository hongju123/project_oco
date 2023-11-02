package com.oco.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oco.domain.dto.KakaoUserDTO;
import com.oco.mapper.KakaoUserMapper;

@Service
public class KakaoServiceImpl implements KakaoService{
	
	@Autowired
	KakaoUserMapper km;
	
	@Override
	public boolean findKakao(String kakao_idx) {
		return km.findByUser(kakao_idx) !=null;
	}

	@Override
	public boolean insert(KakaoUserDTO kakaoUser) {
		return km.insertUser(kakaoUser) == 1;
	}

}
