package com.oco.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.oco.domain.dto.ReservationDTO;
import com.oco.domain.dto.BusinessDTO;
import com.oco.domain.dto.BusinessInfoDTO;
import com.oco.service.FindListService;
import com.oco.service.ReservationService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
	}
	
	@ResponseBody
	@GetMapping("addList")
	public List<ReservationDTO> addList(Model model,Long amount, Long startRow, String category, String area) {
		amount = (amount != null && amount > 10L) ? amount : 10L;
		startRow = (startRow != null && startRow > 0L) ? startRow : 0L;
		if(area.equals("전 지역") || area.equals("지역")) {
			area = "";
		}
		if(category.equals("전체")) {
			category = "";
		}
		log.info("category:{}" , category);
		log.info("startRow:{}",startRow);
		log.info("amount:{}",amount);
		log.info("area:{}", area);
		List<ReservationDTO> list = service.getAllList(category,area,amount,startRow);
		log.info("list:{}", list);
		return list;
	}
	
	
	@GetMapping("categorywrite")
	public String categorywrite(int category, Model model) {
		log.info("category:{}" , category);
		switch(category) {
		case 1 :
			model.addAttribute("category", "숙소");
			break;
		case 2 :
			model.addAttribute("category", "식당");
			break;
		case 3 :
			model.addAttribute("category", "카페");
			break;
		case 4 :
			model.addAttribute("category", "렌터카");
			break;
		case 5 :
			model.addAttribute("category", "기타");
			break;
		}
		return "reservation/reservationwrite";
	}

	@GetMapping("reservationwrite")
	public void write() {
	}

	@PostMapping("reservationwrite")
	public String write(ReservationDTO reservation,String categorys) throws Exception {
		if(reservation.getCategory() == null) {
			reservation.setCategory(categorys);
			log.info("category:{}" , reservation.getCategory());
		}
		if(reservation.getCost() == null) {
			reservation.setCost("0");
		}
		if(reservation.getFuel() == null ) {
			reservation.setFuel("0");
		}
		if(reservation.getPersonnel() == null ) {
			reservation.setPersonnel("0");
		}
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
		log.info("reservation:{}" , reservation);
		if(reservation.getFuel() == "" ) {
			reservation.setFuel("0");
		}
		if(reservation.getPersonnel() == "" ) {
			reservation.setPersonnel("0");
		}
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
			model.addAttribute("reservation", reservation);
		}
		return "reservation/proposal";
	}

}
