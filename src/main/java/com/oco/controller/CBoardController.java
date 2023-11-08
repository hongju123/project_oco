package com.oco.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.oco.domain.dto.BoardDTO;
import com.oco.domain.dto.Criteria;
import com.oco.domain.dto.PageDTO;
import com.oco.service.BoardService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
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
		System.out.println(cri);
		List<BoardDTO> list = service.getBoardList(cri);
		model.addAttribute("list",list);
		model.addAttribute("pageMaker",new PageDTO(service.getTotal(cri), cri));
		model.addAttribute("newly_board",service.getNewlyBoardList(list));
		model.addAttribute("reply_cnt_list",service.getReplyCntList(list));
		model.addAttribute("recent_reply",service.getRecentReplyList(list));
		
		return "board/list";
		
	}
	
	@GetMapping("write")
	public void write(@ModelAttribute("cri") Criteria cri,Model model) {
		System.out.println(cri);
	}
	
	@PostMapping("write")
	public String write(BoardDTO board, MultipartFile[] files, Criteria cri) throws Exception{
		Long boardnum = 0l;
		if(service.regist(board, files)) {
			boardnum = service.getLastNum(board.getUserId());
			return "redirect:/board/get"+cri.getListLink()+"&boardnum="+boardnum;
		}
		else {
			return "redirect:/board/list"+cri.getListLink();
		}
	}
	
	@GetMapping(value = {"get","modify"})
	public String get(Criteria cri, Long boardnum, HttpServletRequest req, HttpServletResponse resp, Model model) {
		model.addAttribute("cri",cri);
		HttpSession session = req.getSession();
		BoardDTO board = service.getDetail(boardnum);
		model.addAttribute("board",board);
		model.addAttribute("files",service.getFileList(boardnum));
		String loginUser = (String)session.getAttribute("loginUser");
		String requestURI = req.getRequestURI();
		if(requestURI.contains("/get")) {
			//게시글의 작성자가 로그인된 유저가 아닐 때
			if(!board.getUserId().equals(loginUser)) {
				//쿠키 검사
				Cookie[] cookies = req.getCookies();
				Cookie read_board = null;
				if(cookies != null) {
					for(Cookie cookie : cookies) {
						//ex) 1번 게시글을 조회하고자 클릭했을 때에는 "read_board1" 쿠키를 찾음
						if(cookie.getName().equals("read_board"+boardnum)) {
							read_board = cookie;
							break;
						}
					}
				}
				//read_board가 null이라는 뜻은 위에서 쿠키를 찾았을 때 존재하지 않았다는 뜻
				//첫 조회거나 조회한지 1시간이 지난 후
				if(read_board == null) {
					//조회수 증가
					service.updateReadCount(boardnum);
					//read_board1 이름의 쿠키(유효기간 : 3600초)를 생성해서 클라이언트 컴퓨터에 저장
					Cookie cookie = new Cookie("read_board"+boardnum, "r");
					cookie.setMaxAge(3600);
					resp.addCookie(cookie);
				}
			}
		}
		return requestURI;
	}
	@PostMapping("modify")
	public String modify(BoardDTO board, MultipartFile[] files, String updateCnt, Criteria cri, Model model) throws Exception {
		if(files != null){
			for (int i = 0; i < files.length; i++) {
				System.out.println("controller : "+files[i].getOriginalFilename());
			}
		}
		System.out.println("controller : "+updateCnt);
		if(service.modify(board, files, updateCnt)) {
			return "redirect:/board/get"+cri.getListLink()+"&boardnum="+board.getBoardNum();
		}
		else {
			return "redirect:/board/list"+cri.getListLink();
		}
	}
	
	@GetMapping("thumbnail")
	public ResponseEntity<Resource> thumbnail(String systemname) throws Exception{
		return service.getThumbnailResource(systemname);
	}
	
	public void checkBoardId(HttpServletRequest req, HttpServletResponse res){
		req.getSession().getAttribute("loginUser");
		req.getSession().getAttribute("businessUser");
	}
}