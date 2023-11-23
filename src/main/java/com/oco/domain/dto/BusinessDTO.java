package com.oco.domain.dto;

import lombok.Data;

@Data
public class BusinessDTO {
    private Long businessIdx;
    private String businessId;
    private String businessPassword;
    private String businessName;
    private String businessEmail;
    private String businessPhoneNumber;

    private String businessZipCode;
    private String businessAddress;
    private String businessAddressDetail;
    private String businessAdditionalInfo;

    private String businessStoreName;
    private String businessNumber; // 사업자번호
    private String businessCategory;
}

