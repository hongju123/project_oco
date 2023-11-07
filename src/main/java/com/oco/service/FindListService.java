package com.oco.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.oco.domain.dto.AllListDTO;
import com.oco.domain.dto.BusinessDTO;
import com.oco.domain.dto.BusinessInfoDTO;

public interface FindListService {
	
	// 카테고리별 select
	AllListDTO getMainList(String main, String city);
	//상세 페이지 select
	BusinessDTO userDetail(String loginUser);
	BusinessInfoDTO infoDetail(String loginUser);
	boolean modify(BusinessInfoDTO info);
	boolean regist(MultipartFile[] files, BusinessInfoDTO info);
	//모든 정보 가져오기
	List<BusinessInfoDTO> BusinessinfoList();
	List<BusinessDTO> BusinessList();
}