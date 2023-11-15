package com.oco.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.oco.domain.dto.PlannerDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import com.oco.service.PlannerService;

@Controller
@RequestMapping("/planner/*")
public class PlannerController {

	@Autowired
	private PlannerService service;

	@GetMapping("plannerlist")
	public void list(Model model) {
		List<PlannerDTO> list = service.getplannerList();
		model.addAttribute("list", list);
		System.out.println(list);
	}

	@GetMapping("map")
	public void map() {
	}

	@PostMapping("map")
	public String map(PlannerDTO planner) throws Exception {
		if (service.plannerwrite(planner)) {
			return "redirect:/planner/plannerlist";
		} else {
			return "redirect:/planner/plannerlist";
		}
	}

	@GetMapping(value = { "plannerget", "plannermodify" })
	public String get(Long scheduleNum, HttpServletRequest req, HttpServletResponse resp, Model model) {
		HttpSession session = req.getSession();
		PlannerDTO planner = service.getDetail(scheduleNum);
		model.addAttribute("planner", planner);
		String loginUser = (String) session.getAttribute("loginUser");
		String requestURI = req.getRequestURI();
		return requestURI;
	}

	@PostMapping("plannerremove")
	public String remove(Long scheduleNum, HttpServletRequest req) {
		HttpSession session = req.getSession();
		String loginUser = (String) session.getAttribute("loginUser");
		if (service.remove(loginUser, scheduleNum)) {
			return "redirect:/planner/plannerlist";
		} else {
			return "redirect:/planner/plannerget?" + "&scheduleNum=" + scheduleNum;
		}
	}
}
