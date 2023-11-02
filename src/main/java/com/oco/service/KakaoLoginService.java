package com.oco.service;

import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oco.domain.dto.KakaoUserDTO;

public class KakaoLoginService {
 	String rest_key ="010c3e05dede938779d609079d44d487";
 	String redirect_ = "http://localhost:8080/user/login-kakao";
 	String accessToken;
    String kakaoTokenUrl = "https://kauth.kakao.com/oauth/token";
    String idx;
    String nickname;
    

    
     public KakaoUserDTO login(String code) {
     // 요청 헤더 설정
     HttpHeaders headers = new HttpHeaders();
     headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
     // code -> body -> access token 
     // 요청 바디 설정
     MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
     body.add("grant_type", "authorization_code"); // grant_type을 수정
     body.add("client_id", rest_key); // 카카오 애플리케이션의 클라이언트 ID로 변경
     body.add("redirect_uri", redirect_); // 카카오 애플리케이션의 리다이렉트 URI로 변경
     body.add("code", code);

     HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

     // RestTemplate을 사용하여 POST 요청 보내기
     RestTemplate restTemplate = new RestTemplate();
     ResponseEntity<String> responseEntity = restTemplate.postForEntity(kakaoTokenUrl, requestEntity, String.class);

     // 응답을 처리하고 액세스 토큰 및 토큰 정보를 추출
     String response = responseEntity.getBody();
     System.out.println("token : " +response);
     //access token만 파싱 
     ObjectMapper objectMapper = new ObjectMapper();
     
     if (responseEntity.getStatusCode().is2xxSuccessful()) {
         try {
             // JSON 응답을 파싱하여 JsonNode 객체로 변환
             JsonNode jsonNode = objectMapper.readTree(response);

             // "access_token" 값 추출
             accessToken = jsonNode.get("access_token").asText();
             System.out.println("Access Token: " + accessToken);

             // 이제 accessToken 변수에 액세스 토큰이 저장됩니다.
         } catch (Exception e) {
             e.printStackTrace();
         }
     }
     String userInfoUrl = "https://kapi.kakao.com/v2/user/me";

     HttpHeaders headers1 = new HttpHeaders();
     headers1.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
     headers1.set("Authorization", "Bearer " + accessToken); // 액세스 토큰을 헤더에 추가

     HttpEntity<String> entity = new HttpEntity<>(headers1);

     RestTemplate restTemplate1 = new RestTemplate();
     String userInfoResponse = restTemplate1.postForObject(userInfoUrl, entity, String.class);

     System.out.println("User Info Response: " + userInfoResponse);
     String user_info_response = userInfoResponse;
     String jsonString = userInfoResponse;
	 // 문자열에서 JSON 데이터 추출
     int startIndex = user_info_response.indexOf("{");
     int endIndex = user_info_response.lastIndexOf("}");
     String jsonStr = user_info_response.substring(startIndex, endIndex + 1);
     
     // JSON 파싱
     JSONObject json = new JSONObject(jsonStr);
     
     // 아이디와 닉네임 추출

     int startIndex1 = jsonString.indexOf("\"id\":") + 5; // "id" 문자열의 위치에서 5를 더해 ":" 문자 뒤부터 시작
     int endIndex1 = jsonString.indexOf(",", startIndex1); // "," 문자가 있는 위치까지 추출

     if (endIndex1 == -1) {
         endIndex1 = jsonString.indexOf("}", startIndex1); // 마지막 항목일 경우 "}" 문자가 있는 위치까지 추출
     }

     idx = jsonString.substring(startIndex1, endIndex1).trim();

     nickname = json.getJSONObject("properties").getString("nickname");
     //id는 json으로 뽑아오니 문제가 생겨서 잘라서 가져옴 
     //결과 출력
     System.out.println("id: " + idx);
     System.out.println("닉네임: " + nickname);
    
     KakaoUserDTO kakaoDto = new KakaoUserDTO();
     kakaoDto.setKakaoIdx(idx);
     kakaoDto.setKakaoName(nickname);
    
    return kakaoDto;
    
    }
}
