package com.oco.service;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.oco.domain.dto.AllListDTO;
import com.oco.domain.dto.BusinessDTO;
import com.oco.domain.dto.BusinessInfoDTO;
import com.oco.domain.dto.FileDTO;

public interface FindListService {
	
	// 카테고리별 select
	AllListDTO getMainList(String main, String city);
	//상세 페이지 select
	Long getIndexNum(String businessId);
	
	BusinessDTO userDetail(Long businessIdx);
	
	BusinessInfoDTO infoDetail(Long businessIdx);
	
	boolean modify(BusinessInfoDTO info);
	
	boolean regist(MultipartFile[] files, BusinessInfoDTO info) throws Exception;
	
	//파일 관련
	List<FileDTO> getFileList(Long businessInfoIdex);
	ResponseEntity<Resource> getThumbnailResource(String systemname) throws Exception;
	
	//김민준
	List<BusinessInfoDTO> BusinessinfoList();
	List<BusinessDTO> BusinessList();
}