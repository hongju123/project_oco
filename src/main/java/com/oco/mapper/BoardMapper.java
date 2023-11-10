package com.oco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oco.domain.dto.BoardDTO;
import com.oco.domain.dto.Criteria;

@Mapper
public interface BoardMapper {
	//insert
	int insertBoard(BoardDTO board);
	
	//update
	int updateBoard(BoardDTO board);
	int updateReadCount(Long boardNum);
	
	//delete
	int deleteBoard(Long boardNum);
	
	//select
	List<BoardDTO> getList(String amount, String startRow, String topic);
	Long getTotal();
	Long getLastNum(String userId);
	BoardDTO findByNum(Long boardNum);
	
	

}
