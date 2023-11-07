package com.oco.domain.dto;

import lombok.Data;

@Data
public class PlannerDTO {
	private Long scheduleNum;
	private String scheduleDate;
	private String storeName;
	private String addr;
	private String memo;
	private String userId;
}
