package com.oco.service;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.oco.domain.dto.AllListDTO;
import com.oco.domain.dto.BusinessDTO;
import com.oco.domain.dto.BusinessInfoDTO;
import com.oco.domain.dto.Criteria;
import com.oco.domain.dto.FileDTO;
import com.oco.domain.dto.ReplyDTO;
import com.oco.domain.dto.ReplyPageDTO;

public interface FindListService {
	
	// 카테고리별 select
	AllListDTO getMainList(String main, String city);
	
	//상세 페이지 select
	Long getIndexNum(String businessId);
	
	BusinessDTO userDetail(Long businessIdx);
	
	BusinessInfoDTO infoDetail(Long businessIdx);
	
	boolean modify(BusinessInfoDTO info, MultipartFile[] files, String updateCnt) throws Exception;
	
	//파일 관련
	List<FileDTO> getFileList(Long businessInfoIdx);
	ResponseEntity<Resource> getThumbnailResource(String systemName) throws Exception;
	
	//리뷰 파트
	boolean riplyRegist(ReplyDTO reply);
	Long getLastNum(String userId);
	ReplyPageDTO getList(Criteria cri, Long boardNum);
	boolean remove(Long replynum);
	boolean replyModify(ReplyDTO reply);
	boolean visit(Long businessInfoIdx);
	double totalGrade(Long businessInfoIdx);
	void setallGrade(double allGrade,Long businessInfoIdx);
	boolean removeInfo(Long businessInfoIdx);
	
	
	
	//김민준
	List<BusinessInfoDTO> BusinessinfoList();
	List<BusinessDTO> BusinessList();
}