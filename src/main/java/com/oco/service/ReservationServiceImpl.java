package com.oco.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public List<ReservationDTO> getReservationList() {
		return remapper.getReservationList();
	}

	@Override
	public Long getTotal() {
		return remapper.getTotal();
	}

	@Override
	public ReservationDTO getDetail(Long requestNum) {
		return remapper.findByNum(requestNum);
	}

	@Override
	public boolean schedulewrite(ScheduleDTO schedule) {
		int row = remapper.insertschedule(schedule);
		if(row != 1) {
			return false;
		}
			return true;
	}

	@Override
	public boolean reservationmodify(ReservationDTO reservation) {
		int row = remapper.updatereservation(reservation);
		if(row != 1) {
			return false;
		}
		else {
			return true;
		}
	}

	@Override
	public boolean remove(String loginUser, Long requestNum) {
		ReservationDTO reservation = remapper.findByNum(requestNum);
		if(reservation.getUserId().equals(loginUser)) {
			return remapper.deletereservation(requestNum) == 1;
		}
		return false;
	}


}
