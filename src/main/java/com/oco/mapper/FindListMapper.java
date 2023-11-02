package com.oco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oco.domain.dto.BusinessDTO;
import com.oco.domain.dto.BusinessInfoDTO;

@Mapper
public interface FindListMapper {
	
	List<BusinessDTO> getMainList();

	List<BusinessDTO> getMainList(String main1, String main2, String addr1, String addr2);
	
	List<BusinessInfoDTO> getinfo();
}
