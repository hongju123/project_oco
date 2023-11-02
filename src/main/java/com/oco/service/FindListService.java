package com.oco.service;

import com.oco.domain.dto.AllListDTO;

public interface FindListService {

	AllListDTO getMainList(String main, String city);
	
}