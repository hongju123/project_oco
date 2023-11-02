package com.oco.service;


import java.util.List;

import com.oco.domain.dto.Criteria;
import com.oco.domain.dto.ReservationDTO;
import com.oco.domain.dto.ScheduleDTO;


public interface ReservationService {
	//insert
	boolean regists(ReservationDTO reservation);
	boolean schedulewrite(ScheduleDTO schedule);
	
	
	//select
	Long getTotal(Criteria cri);
	List<ReservationDTO> getReservationList(Criteria cri);



	ReservationDTO getDetail(Long requestnum);
}
