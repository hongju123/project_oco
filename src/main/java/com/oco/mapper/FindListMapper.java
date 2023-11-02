package com.oco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oco.domain.dto.BusinessInfoDTO;
import com.oco.domain.dto.BusinessUserDTO;

@Mapper
public interface FindListMapper {
	
	List<BusinessUserDTO> getMainList();

	List<BusinessUserDTO> getMainList(String main1, String main2, String addr1, String addr2);
	
	List<BusinessInfoDTO> getinfo();




}
