package com.oco.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.oco.service.ReservationService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class FrontController {
	@Autowired
	ReservationService reService;
	
	@GetMapping("/")
	public String index(HttpServletRequest req,Model model) {
		if (req.getSession().getAttribute("loginUser")!=null&&reService.getUser((String)req.getSession().getAttribute("loginUser"))!=null) {
			
			String userId = (String) req.getSession().getAttribute("loginUser");
			System.out.println("현재 유저 아이디 : "+req.getSession().getAttribute("loginUser"));
			System.out.println("GetUser :"+reService.getUser(userId));
			model.addAttribute("list",reService.getUser((String)req.getSession().getAttribute("loginUser")));
		}
		System.out.println(req.getSession().getAttribute("loginUser"));
		return "index";
	}
}
