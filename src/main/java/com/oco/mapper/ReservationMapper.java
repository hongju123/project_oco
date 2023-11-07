package com.oco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oco.domain.dto.Criteria;
import com.oco.domain.dto.ReservationDTO;
import com.oco.domain.dto.PlannerDTO;

@Mapper
public interface ReservationMapper {

	// insert
	int insertReservation(ReservationDTO reservation);


	// update
	int updatereservation(ReservationDTO reservation);

	// delete
	int deletereservation(Long requestNum);

	// select
	List<ReservationDTO> getReservationList();

	Long getTotal();

	ReservationDTO findByNum(Long requestNum);

}
