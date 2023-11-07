package com.oco.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.oco.domain.dto.AllListDTO;
import com.oco.domain.dto.BusinessDTO;
import com.oco.domain.dto.BusinessInfoDTO;
import com.oco.service.FindListService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RequestMapping("Bboard/*")
@Controller
public class BboardController {
	@Autowired
	private FindListService service;

	@GetMapping("getlist")
	public String getlist() {
		return "business/list/listindex.html";
	}

	// 찾아보기 리스트 가져오기

	@ResponseBody
	@GetMapping(value = "findlist", consumes = "application/json")
	public ResponseEntity<AllListDTO> findlist(@RequestParam String main, @RequestParam String city) {

		if (main.toString().contains("전체")) {
			main = "";
		}
		if (!city.contains("/")) {
			city = "";
		}
		return new ResponseEntity<AllListDTO>(service.getMainList(main, city), HttpStatus.OK);
	}

	// 맵 가져오기
	@GetMapping("findmap")
	public String getmap() {
		return "business/map/findmap.html";
	}

	// 사업자 소개 페이지

	@GetMapping("write")
	public String write(HttpServletRequest req, HttpServletResponse resp, Model model) {
		HttpSession session = req.getSession();
		String loginUser = (String) session.getAttribute("loginUser");
		BusinessDTO userboard = service.userDetail(loginUser);
		BusinessInfoDTO infoboard = service.infoDetail(loginUser);
		model.addAttribute("userboard", userboard);
		model.addAttribute("infoboard", infoboard);
		return "business/write/write.html";
	}

	// 사업자 수정 페이지

	@GetMapping("modify")
	public String modify(Model model, HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
		String loginUser = (String) session.getAttribute("loginUser");
		BusinessDTO userboard = service.userDetail(loginUser);
		BusinessInfoDTO infoboard = service.infoDetail(loginUser);
		model.addAttribute("userboard", userboard);
		model.addAttribute("infoboard", infoboard);
		return "business/write/modify.html";
	}

	@PostMapping("modifyOk")
	public String modifyOk(BusinessInfoDTO info, HttpServletRequest req) {
		HttpSession session = req.getSession();
		String loginUser = (String) session.getAttribute("loginUser");
		String open = req.getParameter("maa1") + req.getParameter("open_time");
		String close = req.getParameter("maa2") + req.getParameter("close_time");
		String Time = open + " ~ " + close;
		info.setUseTime(Time);
		service.modify(info);
		return null;
	}

}
