package com.oco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oco.domain.dto.PlannerDTO;

@Mapper
public interface PlannerMapper {
	
	int insertPlanner(PlannerDTO planner);

	List<PlannerDTO> getplannerList();

	PlannerDTO findByNum(Long scheduleNum);

	int deletereservation(Long scheduleNum);

}
