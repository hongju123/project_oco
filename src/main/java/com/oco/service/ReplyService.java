package com.oco.service;

import com.oco.domain.dto.Criteria;
import com.oco.domain.dto.ReplyDTO;
import com.oco.domain.dto.ReplyPageDTO;

public interface ReplyService {
	boolean regist(ReplyDTO reply);
	
	boolean modify(ReplyDTO reply);
	
	boolean remove(Long replynum);
	
	ReplyPageDTO getList(Criteria cri, Long boardnum);
	
	Long getLastNum(String userid);
}
