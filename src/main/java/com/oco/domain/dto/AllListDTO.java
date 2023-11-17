package com.oco.domain.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AllListDTO {
	List<BusinessDTO> ulist;
	List<BusinessInfoDTO> ilist;
	List<FileDTO> flist;
}
