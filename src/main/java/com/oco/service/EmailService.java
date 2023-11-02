package com.oco.service;

import com.oco.domain.dto.MailDTO;
import com.oco.domain.dto.UserDTO;

public interface EmailService {
	public void sendSimpleMessage(MailDTO mailDto);
	public String getEmailCode(MailDTO mailDto);
	public boolean checkcode(String code, String email);
	public boolean sendUserpassword(UserDTO user);
}
