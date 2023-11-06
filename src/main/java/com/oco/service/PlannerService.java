package com.oco.service;

import java.util.List;

import com.oco.domain.dto.PlannerDTO;
import com.oco.domain.dto.ReservationDTO;

public interface PlannerService {

	boolean plannerwrite(PlannerDTO schedule);

	// delete
	public boolean remove(String loginUser, Long scheduleNum);

	List<PlannerDTO> getplannerList();

	PlannerDTO getDetail(Long scheduleNum);
}
