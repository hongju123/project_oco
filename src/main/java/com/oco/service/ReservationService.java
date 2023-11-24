package com.oco.service;


import java.util.List;


import com.oco.domain.dto.ReservationDTO;


public interface ReservationService {
	//insert
	boolean regists(ReservationDTO reservation);
	
	//update
	public boolean reservationmodify(ReservationDTO reservation);
	public boolean proposal(String loginUser, Long requestNum);
	
	//delete
	public boolean remove(String loginUser, Long requestNum);
	
	//select
	Long getTotal();
	List<ReservationDTO> getReservationList(String loginUser);
	List<ReservationDTO> getReservationLists();
	ReservationDTO getDetail(Long requestNum);
	List<ReservationDTO> getAllList(String category,String area, Long amount, Long startRow);
	
	//유저 요청에 유저 찾는 로직
	public List<ReservationDTO> getUser(String userId);
}
