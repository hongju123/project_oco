package com.oco.domain.dto;

import java.security.Timestamp;
import java.sql.Date;

import lombok.Data;

@Data
public class ReplyDTO {
	private Long replyNum;
	private String replyContents;
	private String regDate;
	private String updateDate;
	private String replyId;
	private String userId;
	private Long boardNum;
}
