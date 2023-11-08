package com.oco.service;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.oco.domain.dto.AllListDTO;
import com.oco.domain.dto.BusinessDTO;
import com.oco.domain.dto.BusinessInfoDTO;
import com.oco.domain.dto.FileDTO;
import com.oco.mapper.FindListMapper;

@Service
public class FindListServiceImpl implements FindListService {
	@Autowired
	private FindListMapper fmapper;

	@Value("${file.dir}")
	private String saveFolder;

	@Override
	public AllListDTO getMainList(String main, String city) {

		String[] category = new String[2];
		String[] addr = new String[2];

		if (main.contains("/")) {
			for (int i = 0; i < category.length; i++) {
				category[i] = main.split("/")[i];
			}
			if (category[1].contains("모든")) {
				category[1] = "";
			}
		}

		if (city.contains("/")) {
			for (int i = 0; i < addr.length; i++) {
				addr[i] = city.split("/")[i];
			}
			if (addr[1].contains("전 지역")) {
				addr[1] = "";
			}
		}
		return new AllListDTO(fmapper.getMainList(category[0], category[1], addr[0], addr[1]), fmapper.getinfo());
	}

	@Override
	public BusinessDTO userDetail(Long businessIdx) {
		return fmapper.userDetail(businessIdx);
	}

	@Override
	public BusinessInfoDTO infoDetail(Long businessIdx) {
		return fmapper.infoDetail(businessIdx);
	}

	@Override
	public boolean modify(BusinessInfoDTO info) {
		int row = fmapper.modify(info);
		if (row != 1) {
			return false;
		} else {
			return true;
		}
	}

	@Override
	public Long getIndexNum(String businessId) {
		return fmapper.getnum(businessId);
	}

	@Override
	public boolean regist(MultipartFile[] files, BusinessInfoDTO info) throws Exception {

		if (files == null || files.length == 0) {
			System.out.println("빠른종료");
			return true;
		} else {
			System.out.println("파일있는거 확인후 코드 진행");
			Long infonum = fmapper.getnum(info.getBusinessId());
			boolean flag = false;
			for (int i = 0; i < files.length - 1; i++) {

				MultipartFile file = files[i];

				String orgname = file.getOriginalFilename();

				int lastIdx = orgname.lastIndexOf(".");

				String extension = orgname.substring(lastIdx);

				LocalDateTime now = LocalDateTime.now();

				String time = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));

				String systemname = time + UUID.randomUUID().toString() + extension;

				String path = saveFolder + systemname;

				FileDTO fdto = new FileDTO();
				fdto.setBoardNum(infonum);
				fdto.setSystemName(systemname);
				fdto.setOrgName(orgname);
				System.out.println(fdto);

				file.transferTo(new File(path));

				flag = fmapper.insertFile(fdto) == 1;

				if (!flag) {
					return flag;
				}
			}
		}
		return true;
	}

	@Override
	public List<FileDTO> getFileList(String loginUser) {
		return fmapper.getFiles(loginUser);
	}

	// 모든 정보 가져오기
	@Override
	public List<BusinessInfoDTO> BusinessinfoList() {
		return fmapper.BusinessinfoList();
	}

	@Override
	public List<BusinessDTO> BusinessList() {
		return fmapper.BusinessList();
	}

}
