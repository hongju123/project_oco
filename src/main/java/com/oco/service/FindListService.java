package com.oco.service;

import com.oco.domain.dto.AllListDTO;
import com.oco.domain.dto.BusinessDTO;
import com.oco.domain.dto.BusinessInfoDTO;

public interface FindListService {
	
	// 카테고리별 select
	AllListDTO getMainList(String main, String city);
	//상세 페이지 select
	BusinessDTO userDetail(String loginUser);
	BusinessInfoDTO infoDetail(String loginUser);
	void modify(BusinessInfoDTO info);
	
}