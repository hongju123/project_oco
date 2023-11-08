package com.oco.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.oco.domain.dto.ReservationDTO;
import com.oco.domain.dto.AllListDTO;
import com.oco.domain.dto.BusinessDTO;
import com.oco.domain.dto.BusinessInfoDTO;
import com.oco.service.FindListService;
import com.oco.service.ReservationService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/reservation/*")
public class ReservationController {

	@Autowired
	private ReservationService service;

	@Autowired
	private FindListService fservice;

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
	public String get(Long requestNum, HttpServletRequest req, HttpServletResponse resp, Model model) {
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
		if (service.reservationmodify(reservation)) {
			return "redirect:/reservation/reservationget?" + "&requestNum=" + reservation.getRequestNum();
		} else {
			return "redirect:/reservation/reservationlist";
		}
	}

	@PostMapping("reservationremove")
	public String remove(Long requestNum, HttpServletRequest req) {
		HttpSession session = req.getSession();
		String loginUser = (String) session.getAttribute("loginUser");
		if (service.remove(loginUser, requestNum)) {
			return "redirect:/reservation/reservationlist";
		} else {
			return "redirect:/reservation/reservationget?" + "&requestNum=" + requestNum;
		}
	}

	@PostMapping("proposal")
	public String proposal(Long requestNum, HttpServletRequest req) {
		HttpSession session = req.getSession();
		String loginUser = (String) session.getAttribute("loginUser");
		ReservationDTO reservation = service.getDetail(requestNum);
		System.out.println(reservation);
		if (reservation.getBusinessId() != null) {
			String bid = reservation.getBusinessId();
			loginUser += "/" + bid;
			if (service.proposal(loginUser, requestNum)) {
				return "redirect:/reservation/reservationlist";
			}
		} else {
			if (service.proposal(loginUser, requestNum)) {
				return "redirect:/reservation/reservationlist";
			}
		}
		return "redirect:/reservation/reservationlist";
	}

	@GetMapping("/proposal")
	public String proposal(HttpServletRequest req, Model model) {
		if (req.getSession().getAttribute("loginUser") != null
				&& service.getUser((String) req.getSession().getAttribute("loginUser")) != null) {
			String userId = (String) req.getSession().getAttribute("loginUser");
			// System.out.println("현재 유저 아이디 :
			// "+req.getSession().getAttribute("loginUser"));
			// System.out.println("GetUser :"+service.getUser(userId));
			List<ReservationDTO> reservation = service.getUser(userId);
			List<BusinessDTO> blist = fservice.BusinessList();
			List<BusinessInfoDTO> binfolist = fservice.BusinessinfoList();
			model.addAttribute("list", service.getUser((String) req.getSession().getAttribute("loginUser")));
			model.addAttribute("blist", blist);
			model.addAttribute("binfolist", binfolist);
			System.out.println(blist);
			System.out.println(binfolist);
		}
		System.out.println(req.getSession().getAttribute("loginUser"));
		return "reservation/proposal";
	}

}



























