package com.oco.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oco.domain.dto.Criteria;
import com.oco.domain.dto.ReservationDTO;
import com.oco.domain.dto.ScheduleDTO;
import com.oco.mapper.ReservationMapper;


@Service
public class ReservationServiceImpl implements ReservationService{
	@Autowired
	private ReservationMapper remapper;
	
	@Override
	public boolean regists(ReservationDTO reservation) {
		int row = remapper.insertReservation(reservation);
		if(row != 1) {
			return false;
		}
			return true;
	}

	@Override
	public List<ReservationDTO> getReservationList(Criteria cri) {
		return remapper.getReservationList(cri);
	}

	@Override
	public Long getTotal(Criteria cri) {
		return remapper.getTotal(cri);
	}

	@Override
	public ReservationDTO getDetail(Long requestnum) {
		return remapper.findByNum(requestnum);
	}

	@Override
	public boolean schedulewrite(ScheduleDTO schedule) {
		int row = remapper.insertschedule(schedule);
		if(row != 1) {
			return false;
		}
			return true;
	}

}
