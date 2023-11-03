package com.oco.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.oco.domain.dto.BoardDTO;
import com.oco.domain.dto.Criteria;
import com.oco.domain.dto.PageDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/borad/*")
public class BoardController {
	@Autowired @Qualifier("boardServiceImpl")
	private BoardService service;
	
	@GetMapping("list")
	public void list(Criteria cri, Model model) throws Exception {
		System.out.println(cri);
		List<BoardDTO> list = service.getBoardList(cri);
		model.addAttribute("list",list);
		model.addAttribute("pageMaker",new PageDTO(service.getTotal(cri), cri));
		model.addAttribute("newly_board",service.getNewlyBoardList(list));
		model.addAttribute("reply_cnt_list",service.getReplyCntList(list));
		model.addAttribute("recent_reply",service.getRecentReplyList(list));
		}

	 @GetMapping({"get", "modify"})
	    @PreAuthorize("hasRole('ROLE_MEMBER') || hasRole('ROLE_ADMIN')")
	    public void get(@RequestParam Long bno, @ModelAttribute("cri") Criteria cri, Model model) {
	        log.info("get or modify.....");
	        model.addAttribute("board", service.getBoardList(boardnum));
	        model.addAttribute("cri", cri);
	    }

	}