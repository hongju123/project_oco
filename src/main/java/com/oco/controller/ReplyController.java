package com.oco.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oco.domain.dto.Criteria;
import com.oco.domain.dto.ReplyDTO;
import com.oco.domain.dto.ReplyPageDTO;
import com.oco.service.ReplyService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/reply/*")
@RestController
public class ReplyController {
	@Autowired
	private ReplyService service;

	// ResponseEntity : 서버의 상태코드, 응답 메세지, 응답 데이터 등을 담을 수 있는 타입
	// consumes : 이 메소드가 호출될 때 소비할 데이터의 타입(넘겨지는 RequestBody의 데이터 타입)
	// @RequestBody : 넘겨지는 body의 데이터 타입을 해석해서 해당 파라미터에 채워넣기
	@PostMapping("regist")
	public ResponseEntity<String> regist(@RequestBody ReplyDTO reply) {
		log.info("reply : {}", reply);
		System.out.println(reply);
		boolean check = service.regist(reply);
		Long replynum = service.getLastNum(reply.getUserId());

		return check ? new ResponseEntity<String>(replynum + "", HttpStatus.OK)
				: new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// /reply/pages/100/1 : 100번 게시글의 1 페이지 댓글 리스트
	@GetMapping(value = "/pages/{boardNum}/{pagenum}")
	public ResponseEntity<ReplyPageDTO> getList(
			@PathVariable("boardNum") Long boardNum,
			@PathVariable("pagenum") int pagenum) {
		Criteria cri = new Criteria(pagenum, 5);
		return new ResponseEntity<ReplyPageDTO>(service.getList(cri, boardNum), HttpStatus.OK);
	}

	// @DeleteMapping : REST 방식의 설계 이용 시 삭제 요청을 받을 때 사용하는 매핑 방식
	// produces : 이 메소드가 호출된 결과로 생산해낼 데이터의 타입(돌려주는 ResponseBody의 데이터 타입)
	@DeleteMapping(value = "{replynum}", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> remove(@PathVariable("replynum") Long replyNum) {
		return service.remove(replyNum) ? new ResponseEntity<String>("success", HttpStatus.OK)
				: new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// PUT
	// 모든 데이터들을 다 전달, 자원의 전체 수정, 자원 내의 모든 필드를 전달해야 함
	// PATCH
	// 자원의 일부 수정, 수정할 필드만 전송
	// @PatchMapping(value = "{replynum}", consumes = "application/json")
	@PutMapping(value = "{replynum}", consumes = "application/json")
	public ResponseEntity<String> modify(@RequestBody ReplyDTO reply) {
		return service.modify(reply) ? new ResponseEntity<String>("success", HttpStatus.OK)
				: new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
