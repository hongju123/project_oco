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
	int updateReadCount(Long board_num);
	
	//delete
	int deleteBoard(Long boardNum);
	
	//select
	List<BoardDTO> getList(Criteria cri);
	Long getTotal(Criteria cri);
	Long getLastNum(String userId);
	BoardDTO findByNum(Long boardNum);
	
	

}
