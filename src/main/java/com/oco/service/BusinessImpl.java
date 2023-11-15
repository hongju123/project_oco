package com.oco.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oco.domain.dto.BusinessDTO;
import com.oco.mapper.BusinessMapper;


@Service
public class BusinessImpl implements BusinessService {
	@Autowired
	BusinessMapper bm;
	@Override
	public boolean insert(BusinessDTO businessDto) {
		System.out.println(businessDto);
		if (bm.insertParentUser(businessDto) && bm.insertUser(businessDto) && bm.insertinfo(businessDto)) return true;
		return false;
	}
	@Override
	public boolean findById(String businessUsers) {
//		만약 없다면 false
		return bm.findById(businessUsers)!=null;
	}

}
