package com.oco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oco.domain.dto.ReservationDTO;

@Mapper
public interface ReservationMapper {

	// insert
	int insertReservation(ReservationDTO reservation);


	// update
	int updatereservation(ReservationDTO reservation);
	int proposal(String loginUser,Long requestNum);

	// delete
	int deletereservation(Long requestNum);

	// select
	List<ReservationDTO> getReservationList();

	Long getTotal();

	ReservationDTO findByNum(Long requestNum);
	
	List<ReservationDTO> findByUser(String userId);
	

}
