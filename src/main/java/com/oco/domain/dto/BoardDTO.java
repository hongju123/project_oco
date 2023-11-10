package com.oco.domain.dto;

import java.security.Timestamp;

import lombok.Data;

@Data
public class BoardDTO {
	private String boardId;
	private String boardTitle;
	private String boardContents;
	private String updateDate;
	private String regDate;
	private Long boardNum;
	private int readCount;
	private String userId;
	private int replyCount;
    private String category; /*카테고리값 저장컬럼*/
    private String topic; /*카테고리값 저장컬럼*/
}
