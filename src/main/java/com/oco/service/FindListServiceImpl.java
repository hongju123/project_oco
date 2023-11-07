package com.oco.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oco.domain.dto.AllListDTO;
import com.oco.domain.dto.BusinessDTO;
import com.oco.domain.dto.BusinessInfoDTO;
import com.oco.mapper.FindListMapper;

@Service
public class FindListServiceImpl implements FindListService {
	
	@Autowired
	private FindListMapper fmapper;

	@Override
	public AllListDTO getMainList(String main, String city) {

		String[] category = new String[2];
		String[] addr = new String[2];

		if (main.contains("/")) {
			for(int i = 0; i < category.length; i++) {
				category[i] = main.split("/")[i];
			}
			if(category[1].contains("모든")) {
				category[1] = "";
			}
		}
		
		if (city.contains("/")) {
			for(int i = 0; i < addr.length; i++) {
				addr[i] = city.split("/")[i];
			}
			if(addr[1].contains("전 지역")) {
				addr[1] = "";
			}
		}
		return new AllListDTO(fmapper.getMainList(category[0], category[1], addr[0], addr[1]), fmapper.getinfo());
	}

	@Override
	public BusinessDTO userDetail(String loginUser) {
		return fmapper.userDetail(loginUser);
	}

	@Override
	public BusinessInfoDTO infoDetail(String loginUser) {
		return fmapper.infoDetail(loginUser);
	}

	@Override
	public void modify(BusinessInfoDTO info) {
		fmapper.modify(info);
	}
}
