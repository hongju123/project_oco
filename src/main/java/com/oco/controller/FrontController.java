package com.oco.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.oco.domain.dto.BoardDTO;
import com.oco.service.BoardService;
import com.oco.service.ReservationService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class FrontController {
	@Autowired
	ReservationService reService;
	@Autowired
	private BoardService cservice;

	@GetMapping("/")
	public String index(HttpServletRequest req, Model model, Long amount, Long startRow) {
		if (req.getSession().getAttribute("loginUser") != null
				&& reService.getUser((String) req.getSession().getAttribute("loginUser")) != null) {
			amount = (amount != null && amount > 10L) ? amount : 10L;
			startRow = (startRow != null && startRow > 0L) ? startRow : 0L;
			log.info("startRow:{}", startRow);
			log.info("amount:{}", amount);

			String userId = (String) req.getSession().getAttribute("loginUser");
			System.out.println("현재 유저 아이디 : " + req.getSession().getAttribute("loginUser"));
			System.out.println("GetUser :" + reService.getUser(userId));
			model.addAttribute("list", reService.getUser((String) req.getSession().getAttribute("loginUser")));
			List<BoardDTO> clist = cservice.getBoardAllList(amount, startRow);
			model.addAttribute("clist", clist);
		}
		// System.out.println(req.getSession().getAttribute("loginUser"));
		return "index";
	}
}
