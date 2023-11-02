package com.oco.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.oco.domain.dto.MailDTO;
import com.oco.domain.dto.UserDTO;

@Service
public class EmailServiceImpl implements EmailService {
	String brand = "OCO";
    @Autowired
    private JavaMailSender emailSender;

    HashMap<String,String> hash = new HashMap<String,String>(); //email과 키값 저장.
    private String generatedCode; // 코드 저장 변수

    @Override
    public void sendSimpleMessage(MailDTO mailDto) {
    	 SimpleMailMessage message = new SimpleMailMessage();
         message.setFrom("leehongtest@gmail.com");
    	 message.setTo(mailDto.getAddress());
         message.setSubject(mailDto.getTitle());
         message.setText(mailDto.getContent());
         emailSender.send(message);
    }

    @Override
    public String getEmailCode(MailDTO mailDto) {
    	generatedCode = generateRandomCode(); // 랜덤 코드 생성 및 저장
    	
    	System.out.println(mailDto.getAddress());
    	
    	mailDto.setTitle(brand +" 인증번호입니다.");
    	mailDto.setContent("인증코드는 : "+generatedCode +" 입니다");
    	sendSimpleMessage(mailDto);
        hash.put(mailDto.getAddress(), generatedCode); //키값과 email 값 저장후 code 보내줌 
        
        return generatedCode; // 생성된 코드 반환
    }

    @Override
    public boolean checkcode(String code, String email) {

    	if (generatedCode != null && (hash.get(email) != null && hash.get(email).equals(code))) {
    	    return true; // 이메일에 있는 코드와 같다면 트루 반환 
    	}

        return false; // 저장된 코드가 없으면 false 반환
    }

    private String generateRandomCode() {
        String code = "";

        for (int j = 0; j < 5; j++) {
            int testnum = (int) Math.floor(Math.random() * 10);
            code += String.valueOf(testnum);
        }
        return code;
    }

	@Override
	public boolean sendUserpassword(UserDTO user) {
   	 	SimpleMailMessage message = new SimpleMailMessage();
   	 	message.setFrom("leehongtest@gmail.com");
   	 	message.setTo(user.getUserEmail());
   	 	message.setSubject(user.getUserId()+"회원님의 비밀번호입니다");
   	 	message.setText(user.getUserId()+"회원님의 비밀번호는 "+user.getUserPassword()+"입니다");
   	 	emailSender.send(message);
		return false;
	}
}
