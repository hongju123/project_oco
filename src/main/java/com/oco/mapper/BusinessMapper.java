package com.oco.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.oco.domain.dto.BusinessDTO;

@Mapper
public interface BusinessMapper {
	boolean insertParentUser(BusinessDTO businessDto);
	boolean insertUser(BusinessDTO businessDto);
}

