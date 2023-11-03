package com.oco.service;


import java.util.List;


import com.oco.domain.dto.ReservationDTO;
import com.oco.domain.dto.ScheduleDTO;


public interface ReservationService {
	//insert
	boolean regists(ReservationDTO reservation);
	boolean schedulewrite(ScheduleDTO schedule);
	
	//update
	public boolean reservationmodify(ReservationDTO reservation);
	
	//delete
	public boolean remove(String loginUser, Long requestNum);
	
	//select
	Long getTotal();
	List<ReservationDTO> getReservationList();
	ReservationDTO getDetail(Long requestNum);
	
}
