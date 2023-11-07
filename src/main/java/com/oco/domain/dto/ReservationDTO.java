package com.oco.domain.dto;

import lombok.Data;

@Data
public class ReservationDTO {
	private Long requestNum;
	private String category;
	private String address;
	private String requestType;
	private String regDate;
	private String personnel;
	private String fuel;
	private String cost;
	private String amenities;
	private String memo;
	private String userId;
	private String businessId;
	
}
