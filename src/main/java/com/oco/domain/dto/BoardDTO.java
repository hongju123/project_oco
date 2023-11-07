package com.oco.domain.dto;

import java.security.Timestamp;

import lombok.Data;

@Data
public class BoardDTO {
	private String boardId;
	private String boardTitle;
	private String boardContents;
	private Timestamp updateDate;
	private String regDate;
	private Long boardNum;
	private int readCount;
	private String userId;
	private int replyCount;
	private boolean secret;     // 비밀글 여부
}
