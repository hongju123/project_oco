package com.oco.domain.dto;

import lombok.Data;

@Data
public class BusinessInfoDTO {
	private Long businessInfoIdx;
    private int visitCount;
    private String useTime;
    private String content;
    private double overallGrade;
    private int gradeCount;
    private String amenities;
    private String businessId;
}
