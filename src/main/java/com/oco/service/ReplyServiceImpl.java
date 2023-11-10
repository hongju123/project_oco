package com.oco.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oco.domain.dto.Criteria;
import com.oco.domain.dto.ReplyDTO;
import com.oco.domain.dto.ReplyPageDTO;
import com.oco.mapper.ReplyMapper;


@Service
public class ReplyServiceImpl implements ReplyService{
	@Autowired
	private ReplyMapper rmapper;

	@Override
	public boolean regist(ReplyDTO reply) {
		return rmapper.insertReply(reply) == 1;
	}

	@Override
	public boolean modify(ReplyDTO reply) {
		return rmapper.updateReply(reply) == 1;
	}

	@Override
	public boolean remove(Long replynum) {
		return rmapper.deleteReply(replynum) == 1;
	}

	@Override
	public ReplyPageDTO getList(Criteria cri, Long boardnum) {
		return new ReplyPageDTO(rmapper.getTotal(boardnum), rmapper.getList(cri, boardnum));
	}

	@Override
	public Long getLastNum(String userId) {
		return rmapper.getLastNum(userId);
	}
}

