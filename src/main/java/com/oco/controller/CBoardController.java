package com.oco.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.oco.domain.dto.BoardDTO;
import com.oco.domain.dto.Criteria;
import com.oco.domain.dto.PageDTO;
import com.oco.service.BoardService;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Controller
@RequestMapping("/Cboard/*")
@Setter
@Getter
public class CBoardController {
	@Autowired @Qualifier("boardServiceImpl")
	private BoardService service;
	
	@GetMapping("list")
	public String list(Criteria cri, Model model) throws Exception {
//		System.out.println(cri);
//		List<BoardDTO> list = service.getBoardList(cri);
//		model.addAttribute("list",list);
//		model.addAttribute("pageMaker",new PageDTO(service.getTotal(cri), cri));
//		model.addAttribute("newly_board",service.getNewlyBoardList(list));
//		model.addAttribute("reply_cnt_list",service.getReplyCntList(list));
//		model.addAttribute("recent_reply",service.getRecentReplyList(list));
//		
		return "board/list";
		}

//	@NotEmpty(message = "제목은 필수항목입니다.") 
//	@Size(max=200)
//	private String subject;
//
//	@NotEmpty(message = "내용은 필수항목입니다.")
//	 private String content;
//	    
//	 /*카테고리메세지*/
//	 @NotBlank(message = "카테고리 선택은 필수항목입니다.")
//	 private String category;
}