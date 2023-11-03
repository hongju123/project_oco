package com.oco.domain.dto;

import java.security.Timestamp;
import java.sql.Date;

import lombok.Data;

@Data
public class ReplyDTO {
	private Long replyNum;
	private String replyContents;
	private Date regDate;
	private Timestamp updateDate;
	private String replyId;
	private int userId;
	private String boardId;
	
	
	
}
