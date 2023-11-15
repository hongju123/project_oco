package com.oco.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.oco.domain.dto.AllListDTO;
import com.oco.domain.dto.BusinessDTO;
import com.oco.domain.dto.BusinessInfoDTO;
import com.oco.domain.dto.Criteria;
import com.oco.domain.dto.FileDTO;
import com.oco.domain.dto.ReplyDTO;
import com.oco.domain.dto.ReplyPageDTO;
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
	public Long getIndexNum(String businessId) {
		return fmapper.getnum(businessId);
	}

	@Override
	public List<FileDTO> getFileList(Long businessInfoIdx) {

		return fmapper.getFiles(businessInfoIdx);
	}

	@Override
	public ResponseEntity<Resource> getThumbnailResource(String systemName) throws Exception {
		Path path = Paths.get(saveFolder + systemName);

		String contenttype = Files.probeContentType(path);

		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_TYPE, contenttype);

		Resource resource = new InputStreamResource(Files.newInputStream(path));
		return new ResponseEntity<>(resource, headers, HttpStatus.OK);
	}

	@Override
	public boolean modify(BusinessInfoDTO info, MultipartFile[] files, String updateCnt) throws Exception  {
		int row = fmapper.updateinfo(info);
		if (row != 1) {
			return false;
		}
		List<FileDTO> org_file_list = fmapper.getFiles(info.getBusinessInfoIdx());
		if (org_file_list.size() == 0 && (files == null || files.length == 0)) {
			return true;
		} else {
			if (files != null) {
				boolean flag = false;
				// 후에 비즈니스 로직 실패 시 원래대로 복구하기 위해 업로드 성공했던 파일들도 삭제해주어야 한다.
				// 업로드 성공한 파일들의 이름을 해당 리스트에 추가하면서 로직을 진행한다.
				ArrayList<String> sysnames = new ArrayList<>();
				for (int i = 0; i < files.length - 1; i++) {
					MultipartFile file = files[i];
					String orgname = file.getOriginalFilename();
					// 수정의 경우 중간에 있는 파일은 수정이 되지 않은 경우도 있다.
					// 그런 경우의 file의 orgname은 null 이거나 "" 이다.
					// 따라서 업로드가 될 필요가 없으므로 continue로 다음 파일로 넘어간다.
					if (orgname == null || orgname.equals("")) {
						continue;
					}
					int lastIdx = orgname.lastIndexOf(".");
					String extension = orgname.substring(lastIdx);
					LocalDateTime now = LocalDateTime.now();
					String time = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
					String systemname = time + UUID.randomUUID().toString() + extension;
					sysnames.add(systemname);

					String path = saveFolder + systemname;

					FileDTO fdto = new FileDTO();
					fdto.setBoardNum(info.getBusinessInfoIdx());
					fdto.setOrgName(orgname);
					fdto.setSystemName(systemname);

					file.transferTo(new File(path));

					flag = fmapper.insertFile(fdto) == 1;
					if (!flag) {
						break;
					}
				}
				// 강제탈출(실패)
				if (!flag) {
					// 아까 추가했던 systemname들(업로드 성공한 파일의 systemname)을 꺼내오면서
					// 실제 파일이 존재한다면 삭제 진행
					for (String systemname : sysnames) {
						File file = new File(saveFolder, systemname);
						if (file.exists()) {
							file.delete();
						}
						fmapper.deleteBySystemname(systemname);
					}
				}
			}
			// 지워져야 할 파일(기존에 있었던 파일들 중 수정된 파일)들의 이름 추출
			String[] deleteNames = updateCnt.split("\\\\");
			for (int i = 1; i < deleteNames.length; i++) {
				File file = new File(saveFolder, deleteNames[i]);
				// 해당 파일 삭제
				if (file.exists()) {
					file.delete();
					// DB상에서도 삭제
					fmapper.deleteBySystemname(deleteNames[i]);
				}
			}
			return true;
		}
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

	@Override
	public boolean riplyRegist(ReplyDTO reply) {
		return fmapper.insertReply(reply) == 1;
	}

	@Override
	public Long getLastNum(String userId) {
		return fmapper.getLastNumber(userId);
	}

	@Override
	public ReplyPageDTO getList(Criteria cri, Long boardNum) {
		return new ReplyPageDTO(fmapper.getTotal(boardNum), fmapper.getList(cri, boardNum));
	}

	@Override
	public boolean remove(Long replynum) {
		return fmapper.deleteReply(replynum) == 1;
	}

	@Override
	public boolean replyModify(ReplyDTO reply) {
		return fmapper.updateReply(reply) == 1;
	}

	@Override
	public boolean visit(Long businessInfoIdx) {
		return fmapper.visit(businessInfoIdx);
	}

	@Override
	public double totalGrade(Long businessInfoIdx) {
		return fmapper.totalGrade(businessInfoIdx);
	}

	@Override
	public void setallGrade(double allGrade, Long businessInfoIdx) {
		fmapper.setallGrade(allGrade, businessInfoIdx);
	}

	@Override
	public boolean removeInfo(Long businessInfoIdx) {
		return fmapper.removeInfo(businessInfoIdx);
	}

}
