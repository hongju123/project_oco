package com.oco.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;


import com.oco.domain.dto.BoardDTO;
import com.oco.domain.dto.Criteria;
import com.oco.domain.dto.FileDTO;

public interface BoardService {

	//insert
	boolean regist(BoardDTO board, MultipartFile[] files) throws Exception;
	
	//update
	public boolean modify(BoardDTO board, MultipartFile[] files, String updateCnt) throws Exception;
	public void updateReadCount(Long boardNum);
	
	//delete
	public boolean remove(String loginUser, Long boardNum);
	
	//select
	Long getTotal();
	List<BoardDTO> getBoardList(String amount, String startRow, String topic);
	BoardDTO getDetail(Long boardNum);
	Long getLastNum(String userId);
	ArrayList<String> getNewlyBoardList(List<BoardDTO> list) throws Exception;
	ArrayList<Integer> getReplyCntList(List<BoardDTO> list);
	ArrayList<String> getRecentReplyList(List<BoardDTO> list);
	List<FileDTO> getFileList(Long boardNum);
	
	ResponseEntity<Resource> getThumbnailResource(String systemName) throws Exception;

}
