package com.oco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oco.domain.dto.AllListDTO;
import com.oco.domain.dto.BusinessDTO;
import com.oco.domain.dto.BusinessInfoDTO;
import com.oco.domain.dto.FileDTO;

@Mapper
public interface FindListMapper {
	
	List<BusinessDTO> getMainList();

	List<BusinessDTO> getMainList(String main1, String main2, String addr1, String addr2);
	
	List<BusinessInfoDTO> getinfo();

	BusinessDTO userDetail(Long businessIdx);

	BusinessInfoDTO infoDetail(Long businessIdx);

	int modify(BusinessInfoDTO info);
	//김민준
	List<BusinessInfoDTO> BusinessinfoList();
	List<BusinessDTO> BusinessList();

	Long getnum(String businessId);

	int insertFile(FileDTO fdto);

	List<FileDTO> getFiles(Long businessInfoIdx);


}
