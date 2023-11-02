package com.oco.domain.dto;

import lombok.Data;

@Data
public class BusinessUserDTO {
    private int businessIdx;
    private String businessId;
    private String businessPassword;
    private String businessName;
    private String businessNumber;
    private String businessAddress;
    private String businessPhoneNumber;
    private String businessEmail;
    private String businessCategory;
    private String businessStoreName;
}
