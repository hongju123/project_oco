package com.oco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oco.domain.dto.AllListDTO;
import com.oco.domain.dto.BusinessDTO;
import com.oco.domain.dto.BusinessInfoDTO;
import com.oco.domain.dto.Criteria;
import com.oco.domain.dto.FileDTO;
import com.oco.domain.dto.ProfileDTO;
import com.oco.domain.dto.ReplyDTO;

@Mapper
public interface FindListMapper {
	
	List<BusinessDTO> getMainList();
	
	List<FileDTO> getallfiles();

	List<ProfileDTO> getallprofile();

	List<BusinessDTO> getMainList(String main1, String main2, String addr1, String addr2);
	
	List<BusinessInfoDTO> getinfo();

	BusinessDTO userDetail(Long businessIdx);

	BusinessInfoDTO infoDetail(Long businessIdx);

	//파일관련
	int updateinfo(BusinessInfoDTO info);
	
	void deleteBySystemname(String systemname);
	
	//김민준
	List<BusinessInfoDTO> BusinessinfoList();
	List<BusinessDTO> BusinessList();
	
	
//파일 관련
	Long getnum(String businessId);

	int insertFile(FileDTO fdto);

	List<FileDTO> getFiles(Long businessInfoIdx);

	
	//리뷰 관련
	int insertReply(ReplyDTO reply);

	Long getLastNumber(String userId);

	int getTotal(Long boardNum);

	List<ReplyDTO> getList(Criteria cri, Long boardNum);

	int deleteReply(Long replynum);

	int updateReply(ReplyDTO reply);

	boolean visit(Long businessInfoIdx);

	double totalGrade(Long businessInfoIdx);

	void setallGrade(double allGrade,Long businessInfoIdx);

	boolean removeInfo(Long businessInfoIdx);
	
	//프로필 테스트
	int insertprofile(ProfileDTO pdto);

	List<ProfileDTO> getprofile(Long businessInfoIdx);

	int updateprofile(ProfileDTO pdto);

	int checkProfile(Long businessInfoIdx);

	void deleteprofile(String string);

}
