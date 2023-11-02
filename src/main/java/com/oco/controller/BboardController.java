package com.oco.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	

	// 찾아보기 리스트 가져오기 
	@ResponseBody
	@GetMapping(value = "findlist", consumes = "application/json")
	public ResponseEntity<AllListDTO> getlist(@RequestParam String main, @RequestParam String city) {

		if (main.toString().contains("전체")) {
			main = "";
		}
		if (!city.contains("/")) {
			city = "";
		}
		return new ResponseEntity<AllListDTO>(Fservice.getMainList(main, city), HttpStatus.OK);
	}
}
