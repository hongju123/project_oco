package com.oco.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.oco.domain.dto.Criteria;
import com.oco.domain.dto.PageDTO;
import com.oco.domain.dto.ReservationDTO;
import com.oco.domain.dto.ScheduleDTO;
import com.oco.service.ReservationService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/reservation/*")
public class ReservationController {

	@Autowired
	private ReservationService service;

	@GetMapping("reservationlist")
	public void list(Criteria cri, Model model) {
		System.out.println(cri);
		List<ReservationDTO> list = service.getReservationList(cri);
		model.addAttribute("list", list);
		model.addAttribute("pageMaker", new PageDTO(service.getTotal(cri), cri));
	}

	@GetMapping("reservationwrite")
	public void write() {
	}

	@PostMapping("reservationwrite")
	public String write(ReservationDTO reservation) throws Exception {
		if (service.regists(reservation)) {
			return "redirect:/reservation/reservationlist";
		} else {
			return "redirect:/reservation/reservationlist";
		}
	}

	@GetMapping(value = { "reservationget", "modify" })
	public String get(Criteria cri, Long requestnum, HttpServletRequest req, HttpServletResponse resp, Model model) {
		model.addAttribute("cri", cri);
		HttpSession session = req.getSession();
		ReservationDTO reservation = service.getDetail(requestnum);
		model.addAttribute("reservation", reservation);
		// model.addAttribute("files",service.getFileList(boardnum));
		String loginUser = (String) session.getAttribute("loginUser");
		String requestURI = req.getRequestURI();
		return requestURI;
	}
	
	@GetMapping("map")
	public void map() {
	}
	@PostMapping("map")
	public String map(ScheduleDTO schedule)  throws Exception{
		if(service.schedulewrite(schedule)) {
			return "redirect:/reservation/reservationlist";
		}else {
			return "redirect:/reservation/reservationlist";
		}
	}

}
