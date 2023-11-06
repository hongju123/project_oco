package com.oco.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.oco.domain.dto.ReservationDTO;
import com.oco.domain.dto.PlannerDTO;
import com.oco.service.ReservationService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/reservation/*")
public class ReservationController {

	@Autowired
	private ReservationService service;

	@GetMapping("reservationlist")
	public void list(Model model) {
		List<ReservationDTO> list = service.getReservationList();
		model.addAttribute("list", list);
		System.out.println(list);
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

	@GetMapping(value = { "reservationget", "reservationmodify" })
	public String get( Long requestNum, HttpServletRequest req, HttpServletResponse resp, Model model) {
		HttpSession session = req.getSession();
		ReservationDTO reservation = service.getDetail(requestNum);
		model.addAttribute("reservation", reservation);
		String loginUser = (String) session.getAttribute("loginUser");
		String requestURI = req.getRequestURI();
		return requestURI;
	}
	@PostMapping("reservationmodify")
	public String modify(ReservationDTO reservation) throws Exception {
		System.out.println(reservation);
		if(service.reservationmodify(reservation)) {
			return "redirect:/reservation/reservationget?"+"&requestNum="+reservation.getRequestNum();
		}
		else {
			return "redirect:/reservation/reservationlist";
		}
	}
	
	@PostMapping("reservationremove")
	public String remove(Long requestNum, HttpServletRequest req) {
		HttpSession session = req.getSession();
		String loginUser = (String)session.getAttribute("loginUser");
		if(service.remove(loginUser, requestNum)) {
			return "redirect:/reservation/reservationlist";
		}
		else {
			return "redirect:/reservation/reservationget?"+"&requestNum="+requestNum;
		}
	}
	
	

}
