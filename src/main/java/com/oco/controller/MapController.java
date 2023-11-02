package com.oco.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/map/*")
public class MapController {
		
	// 찾아보기 맵 페이지로 이동 
	@RequestMapping("findmap")
	public void getmap() {
	}
}