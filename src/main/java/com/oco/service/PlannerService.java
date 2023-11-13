package com.oco.service;

import java.util.List;

import com.oco.domain.dto.PlannerDTO;

public interface PlannerService {

	boolean plannerwrite(PlannerDTO planner);

	// delete
	public boolean remove(String loginUser, Long scheduleNum);

	List<PlannerDTO> getplannerList();

	PlannerDTO getDetail(Long scheduleNum);

	
}
