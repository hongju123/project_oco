package com.oco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oco.domain.dto.Criteria;
import com.oco.domain.dto.ReplyDTO;


@Mapper
public interface ReplyMapper {
int insertReply(ReplyDTO reply);
	
	int updateReply(ReplyDTO reply);
	
	int deleteReply(Long replyNum);
	int deleteByBoardnum(Long boardNum);
	
	Long getLastNum(String userId);
	int getTotal(Long boardNum);
	List<ReplyDTO> getList(Criteria cri, Long boardNum);
	int getRecentReply(Long boardNum);
}
