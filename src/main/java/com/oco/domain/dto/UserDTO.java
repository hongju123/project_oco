package com.oco.domain.dto;

import lombok.Data;

@Data
public class UserDTO {
	private int userIdx;
    private String userId;
    private String userPassword;
    private String userName;
    private String userGender; 
	private String zipCode;
    private String userAddress;
    private String userAddressdetail; 
    private String userAdditionalinfo;
    private String userHobby;
    private String userEmail;
    private String userPhoneNumber;
}
