package com.oco.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.oco.domain.dto.AllListDTO;
import com.oco.domain.dto.BusinessDTO;
import com.oco.domain.dto.BusinessInfoDTO;
import com.oco.domain.dto.FileDTO;
import com.oco.service.FindListService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RequestMapping("/Bboard/*")
@Controller
public class BboardController {
	@Autowired
	private FindListService service;

	@GetMapping("getlist")
	public String getlist() {
		return "Bboard/listindex.html";
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
		return "Bboard/findmap.html";
	}

	// 아이디로 번호값 가져오기
	@GetMapping("getpage")
	public String getpage(String businessId) {
		Long businessIdx = service.getIndexNum(businessId);
		return "redirect:/Bboard/get?businessIdx=" + businessIdx;
	}

	// 사업자 소개 페이지 구별
	@GetMapping(value = { "get", "modify" })
	public String get(@RequestParam("businessIdx") Long businessIdx, HttpServletRequest req, Model model) {
		Long businessInfoIdx = businessIdx;
		BusinessDTO userboard = service.userDetail(businessIdx);
		BusinessInfoDTO infoboard = service.infoDetail(businessIdx);
		model.addAttribute("userboard", userboard);
		model.addAttribute("infoboard", infoboard);
		model.addAttribute("files",service.getFileList(businessInfoIdx));
		System.out.println(service.getFileList(businessInfoIdx));
		String requsetURI = req.getRequestURI();
		return requsetURI;
	}

	// 사업자 수정 페이지
	@PostMapping("modify")
	public String modifyOk(BusinessInfoDTO info, HttpServletRequest req, MultipartFile[] files) throws Exception {
		HttpSession session = req.getSession();
		String loginUser = (String)session.getAttribute("loginUser");
		info.setBusinessId(loginUser);
		String open = req.getParameter("maa1") + req.getParameter("open_time");
		String close = req.getParameter("maa2") + req.getParameter("close_time");
		String Time = open + " ~ " + close;
		info.setUseTime(Time);
		if (service.modify(info) && service.regist(files, info)) {
			return "redirect:/Bboard/get?businessIdx=" + info.getBusinessInfoIdx();
		} else {
			return null;
		}
	}
	@GetMapping("thumbnail")
	public ResponseEntity<Resource> thumbnail(String systemName) throws Exception{
		return service.getThumbnailResource(systemName);
	}

}
