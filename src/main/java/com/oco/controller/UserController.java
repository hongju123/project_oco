package com.oco.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.oco.domain.dto.BusinessDTO;
import com.oco.domain.dto.KakaoUserDTO;
import com.oco.domain.dto.UserDTO;
import com.oco.service.BusinessService;
import com.oco.service.EmailService;
import com.oco.service.KakaoLoginService;
import com.oco.service.KakaoService;
import com.oco.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/user/*")
public class UserController {
	@Autowired
	UserService user;
	@Autowired
	BusinessService buser;
	
	@Autowired
	EmailService emailservice;
	@Autowired
	KakaoService kakaoUser;
	

	@GetMapping("")
	public String Test() {
		return "hong/login_Page.html";
	}

	@GetMapping("login-kakao")
	public String login(@RequestParam("code") String code, HttpServletRequest req) {
		System.out.println("Received code: " + code);

		KakaoUserDTO  kakaoUserDto= new KakaoLoginService().login(code);
		
		if (kakaoUser.findKakao(kakaoUserDto.getKakaoIdx())) {
			req.getSession().setAttribute("loginUser", kakaoUserDto.getKakaoName());
			return "index";
		} else if(kakaoUser.insert(kakaoUserDto)) {
			req.getSession().setAttribute("loginUser", kakaoUserDto.getKakaoName());
			return "index";
		} else {
			System.out.println("오류@@@@@@@@@@@");
			return "/hong/login_Page"; 
		}
	}
	@GetMapping("join_Page")
	public String joinPage() {
		return "hong/join_Page";
	}
	@PostMapping("join")
	public String join(@ModelAttribute UserDTO userDto, HttpServletRequest req) {
		System.out.println(userDto);
		
		if (user.join(userDto)) {
			req.getSession().setAttribute("loginUser", userDto.getUserId());
			return "index";
		} else {
			return "hong/join_Page";
		}
	}

	@GetMapping("join_business_Page")
	public String joinBusinessPage() {
		return "hong/join_business_Page.html";
	}
	@PostMapping("join_business")
	public String joinBusiness(@ModelAttribute BusinessDTO businessDto, HttpServletResponse res) {
		System.out.println(businessDto);
		if (buser.insert(businessDto)) {
			System.out.println(businessDto.getBusinessId());
			Cookie cookie = new Cookie("userId", businessDto.getBusinessId());
			cookie.setMaxAge(1);
			res.addCookie(cookie);
			return "hong/login_Page";
		} else {
			Cookie cookie = new Cookie("joinStatus","fals");
			cookie.setMaxAge(1);
			res.addCookie(cookie);
			return "hong/join_business_Page";
		}
	}

	@ResponseBody // ajax 아이디 중복확인
	@GetMapping("findbyid")
	public boolean findById(String userid) {
		return user.findById(userid);
	}

	@PostMapping("login")
	public String login() {
		return "hong/login_Page";
	}
	
	//로그인 했을때 로직
	@PostMapping("checklogin") // id 비밀번호 확인
	public String checklogin(String userId, String userPw, HttpServletRequest req, HttpServletResponse res) {
		System.out.println(userId + userPw);
		UserDTO loginUser = user.login(userId, userPw);

		if (loginUser != null) {

			req.getSession().setAttribute("loginUser", loginUser.getUserId());
			return "redirect:/";
		} else {
			Cookie cookie = new Cookie("login", "fail");
			cookie.setMaxAge(1);
			res.addCookie(cookie);
			System.out.println(cookie.getValue());
			return "hong/login_Page";
		}
	}

	@GetMapping("logout")
	public String logout(HttpServletRequest req) {
		req.getSession().invalidate();
		return "redirect:/";
	}

	@GetMapping("finduser_Page")
	public String findpw_page() {
		return "hong/finduser_Page";
	}

//    유저 아이디를 이메일로 찾기
	@PostMapping("onlyFindUserID")
	public String onlyFindUserID(HttpServletResponse res, @ModelAttribute UserDTO userDto) {
		UserDTO findUser = user.findByEmail(userDto.getUserEmail());
		if (findUser != null) {
			Cookie cookie = new Cookie("userId", findUser.getUserId());
			Cookie alert = new Cookie("onlyFindUserID", findUser.getUserId());
			cookie.setMaxAge(1);
			alert.setMaxAge(1);
			res.addCookie(cookie);
			res.addCookie(alert);
			return "hong/login_Page";
		} else {
			Cookie cookie = new Cookie("info", "false");
			cookie.setMaxAge(1);
			res.addCookie(cookie);
			return "hong/finduser_Page";
		}
	}

//    이메일과, 아이디로 있는 계정찾기 
	@PostMapping("checkUserInfo")
	public String checkUserInfo(@ModelAttribute UserDTO userDto, HttpServletResponse res) {
		System.out.println(userDto);
		userDto = user.findByUserInfo(userDto);
		if (userDto != null) {
//    		유저 이메일에 비밀번호 보내야함 
			emailservice.sendUserpassword(userDto);
			Cookie cookie = new Cookie("userId", userDto.getUserId());
			Cookie cookie1 = new Cookie("userpw", "true");
			cookie.setMaxAge(1);
			cookie1.setMaxAge(1);
			res.addCookie(cookie);
			res.addCookie(cookie1);
			return "hong/login_Page";
		} else {
//    		else시 없는 것이기때문에 홈페이지 이동하지 않고 다시 제자리
			return "user/finduser_Page";
		}
	}

}
