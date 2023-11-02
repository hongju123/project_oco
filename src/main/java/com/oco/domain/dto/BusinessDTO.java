package com.oco.domain.dto;

import lombok.Data;

@Data
public class BusinessDTO {
    private String businessId;
    private String businessPassword;
    private String businessName; 
    private String businessNumber; 
	private String businessZipCode; 
    private String businessAddress; 
    private String businessAddressDetail;
    private String businessAdditionalInfo;
    private String businessPhoneNumber;
    private String businessEmail; 
    private String businessCategory;
    private String businessStoreName;
}
