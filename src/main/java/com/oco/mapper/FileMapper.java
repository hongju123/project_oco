package com.oco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oco.domain.dto.FileDTO;


@Mapper
public interface FileMapper {
	int insertFile(FileDTO file);
	List<FileDTO> getFiles(Long boardNum);	
	int deleteBySystemname(String systemName);
	int deleteByBoardnum(Long boardNum);
}
