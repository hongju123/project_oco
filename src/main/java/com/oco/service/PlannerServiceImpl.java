package com.oco.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oco.domain.dto.PlannerDTO;
import com.oco.domain.dto.ReservationDTO;
import com.oco.mapper.PlannerMapper;

@Service
public class PlannerServiceImpl implements PlannerService {
	@Autowired
	private PlannerMapper pmapper;

	@Override
	public boolean plannerwrite(PlannerDTO planner) {
		int row = pmapper.insertPlanner(planner);
		if(row != 1) {
			return false;
		}
			return true;
	}

	@Override
	public List<PlannerDTO> getplannerList() {
		return pmapper.getplannerList();
	}

	@Override
	public PlannerDTO getDetail(Long scheduleNum) {
		return pmapper.findByNum(scheduleNum);
	}

	@Override
	public boolean remove(String loginUser, Long scheduleNum) {
		PlannerDTO planner = pmapper.findByNum(scheduleNum);
		if(planner.getUserId().equals(loginUser)) {
			return pmapper.deletereservation(scheduleNum) == 1;
		}
		return false;
	}


}