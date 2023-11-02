package com.oco.domain.dto;

import lombok.Data;

@Data
public class ReservationDTO {
	private Long requestnum;
	private String category;
	private String address;
	private String requesttype;
	private String regdate;
	private String personnel;
	private String fuel;
	private String cost;
	private String amenities;
	private String memo;
	private String userid;
	private String businessid;
	
}
