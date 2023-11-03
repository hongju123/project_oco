package com.oco.domain.dto;

import lombok.Data;

@Data
public class FileDTO {
	private int fileId;
	private String systemName;
	private String orgName;
	private Long boardNum;
}
