package com.oco.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.oco.domain.dto.AllListDTO;
import com.oco.service.FindListService;

@RequestMapping("Bboard/*")
@Controller
public class BboardController {
	@Autowired
	private FindListService Fservice;
	
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
		return new ResponseEntity<AllListDTO>(Fservice.getMainList(main, city), HttpStatus.OK);
	}
	
	//맵 가져오기
	@GetMapping("findmap")
	public String getmap() {
		return "business/map/findmap.html";
	}
	
	// 사업자 소개 페이지
	@GetMapping("write")
	public String write() {
		return "business/write/write.html";
	}
	
}
