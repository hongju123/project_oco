package com.oco.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oco.domain.dto.ReservationDTO;
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
	public List<ReservationDTO> getReservationList(String loginUser) {
		return remapper.getReservationList(loginUser);
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

	@Override
	public boolean proposal(String loginUser, Long requestNum) {
		int row = remapper.proposal(loginUser,requestNum);
		if(row != 1) {
			return false;
		}
		else {
			return true;
		}
	}
	public List<ReservationDTO> getUser(String userId) {
		return remapper.findByUser(userId);
	}

	@Override
	public List<ReservationDTO> getAllList(String category, String area, Long amount, Long startRow) {
		return remapper.getAllList(category,area,amount,startRow);
	}

}
