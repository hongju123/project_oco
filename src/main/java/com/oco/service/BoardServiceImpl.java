package com.oco.service;

import java.io.File;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
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

import com.oco.domain.dto.BoardDTO;
import com.oco.domain.dto.FileDTO;
import com.oco.mapper.BoardMapper;
import com.oco.mapper.FileMapper;
import com.oco.mapper.ReplyMapper;

import lombok.extern.slf4j.Slf4j;



@Slf4j
@Service
public class BoardServiceImpl implements BoardService {
	@Autowired
	private BoardMapper bmapper;
	@Autowired
	private ReplyMapper rmapper;
	@Autowired
	private FileMapper fmapper;
	@Value("${file.dir}")
	private String saveFolder;
	
	@Override
	public boolean regist(BoardDTO board, MultipartFile[] files) throws Exception {
		log.info("BoardDTO : {}",board);
		int row = bmapper.insertBoard(board);
	
		if(row != 1) {
			return false;
		}
		if(files == null || files.length == 0) {
			return true;
		}
		else {
			//방금 등록한 게시글 번호
			Long boardNum = bmapper.getLastNum(board.getUserId());
			log.info("{}",boardNum);
			boolean flag = false;
			for(int i=0;i<files.length-1;i++) {
				MultipartFile file = files[i];
				//apple.png
				String orgName = file.getOriginalFilename();
				//5
				int lastIdx = orgName.lastIndexOf(".");
				//.png
				String extension = orgName.substring(lastIdx);
				
				LocalDateTime now = LocalDateTime.now();
				String time = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));

				//20231005103911237랜덤문자열.png
				String systemName = time+UUID.randomUUID().toString()+extension;
				System.out.println(systemName);

				//실제 저장될 파일의 경로
				String path = saveFolder+systemName;
				
				FileDTO fdto = new FileDTO();
				fdto.setBoardNum(boardNum);
				fdto.setSystemName(systemName);
				fdto.setOrgName(orgName);
				
				//실제 파일 업로드
				file.transferTo(new File(path));
				
				flag = fmapper.insertFile(fdto) == 1;
				
				if(!flag) {
					//업로드 했던 파일 삭제, 게시글 데이터 삭제
					return flag;
				}
			}
		}
		return true;
	}

	@Override
	public boolean modify(BoardDTO board, MultipartFile[] files, String updateCnt) throws Exception {
		int row = bmapper.updateBoard(board);
		System.out.println(board);
		if(row != 1) {
			System.out.println(row);
			return false;
		}
		List<FileDTO> org_file_list = fmapper.getFiles(board.getBoardNum());
		if(org_file_list.size()==0 && (files == null || files.length == 0)) {
			System.out.println("2");
			return true;
		}
		else {
			if(files != null) {
				boolean flag = false;
				System.out.println("3");
				ArrayList<String> sysnames = new ArrayList<>();
				System.out.println("service : "+files.length);
				for(int i=0;i<files.length-1;i++) {
					MultipartFile file = files[i];
					String orgName = file.getOriginalFilename();
				
					if(orgName == null || orgName.equals("")) {
						continue;
					}
					int lastIdx = orgName.lastIndexOf(".");
					String extension = orgName.substring(lastIdx);
					LocalDateTime now = LocalDateTime.now();
					String time = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
					String systemName = time+UUID.randomUUID().toString()+extension;
					sysnames.add(systemName);
					
					String path = saveFolder+systemName;
					
					FileDTO fdto = new FileDTO();
					fdto.setBoardNum(board.getBoardNum());
					fdto.setOrgName(orgName);
					fdto.setSystemName(systemName);
					
					file.transferTo(new File(path));
					
					flag = fmapper.insertFile(fdto) == 1;
					if(!flag) {
						break;
					}
				}

				if(!flag) {
					
					for(String systemName : sysnames) {
						File file = new File(saveFolder,systemName);
						if(file.exists()) {
							file.delete();
						}
						fmapper.deleteBySystemname(systemName);
					}
				}
			}
			
			String[] deleteNames = updateCnt.split("\\\\");
			for(int i=1;i<deleteNames.length;i++) {
				File file = new File(saveFolder,deleteNames[i]);
			
				if(file.exists()) {
					file.delete();
				
					fmapper.deleteBySystemname(deleteNames[i]);
				}
			}
			System.out.println("4");
			return true;
		}
	}

	@Override
	public void updateReadCount(Long boardNum) {
		bmapper.updateReadCount(boardNum);
	}

	@Override
	public boolean remove(String loginUser, Long boardNum) {
		BoardDTO board = bmapper.findByNum(boardNum);
		if(board.getUserId().equals(loginUser)) {
			List<FileDTO> files = fmapper.getFiles(boardNum);
			for(FileDTO fdto : files) {
				File file = new File(saveFolder,fdto.getSystemName());
				if(file.exists()) {
					file.delete();
					fmapper.deleteBySystemname(fdto.getSystemName());
				}
			}
			return bmapper.deleteBoard(boardNum) == 1;
		}
		return false;
	}

	@Override
	public Long getTotal() {
		return bmapper.getTotal();
	}

	@Override
	public List<BoardDTO> getBoardAllList(Long amount, Long startRow) {
		return bmapper.getAllList(amount,startRow);
	}
	@Override
    public List<BoardDTO> getBoardList(Long amount, Long startRow, String topic) {
        log.info("getBoardList");
        log.info("amountgetboard:{}",amount);
        log.info("amountgetboard:{}",startRow);
        return bmapper.getList(amount,startRow,topic);
	}

	@Override
	public BoardDTO getDetail(Long boardNum) {
		return bmapper.findByNum(boardNum);
	}

	@Override
	public Long getLastNum(String user_id) {
		return bmapper.getLastNum(user_id);
	}

	@Override
	public ArrayList<String> getNewlyBoardList(List<BoardDTO> list) throws Exception {
		ArrayList<String> newlyBoard = new ArrayList<>();
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date now = new Date();
		for(BoardDTO board : list) {
			Date regDate = df.parse(board.getRegDate());
			if(now.getTime() - regDate.getTime() < 1000*60*60*2) {
				newlyBoard.add("O");
			}
			else {
				newlyBoard.add("X");
			}
		}
		return newlyBoard;
	}

	@Override
	public ArrayList<Integer> getReplyCntList(List<BoardDTO> list) {
		ArrayList<Integer> replyCntList = new ArrayList<>();
		for(BoardDTO board : list) {
			replyCntList.add(rmapper.getTotal(board.getBoardNum()));
		}
		return replyCntList;
	}

	@Override
	public ArrayList<String> getRecentReplyList(List<BoardDTO> list) {
		ArrayList<String> recentReply = new ArrayList<>();
		for(BoardDTO board : list) {
			if(rmapper.getRecentReply(board.getBoardNum()) >= 5) {
				recentReply.add("O");
			}
			else {
				recentReply.add("X");
			}
		}
		return recentReply;
	}

	@Override
	public List<FileDTO> getFileList(Long boardNum) {
		return fmapper.getFiles(boardNum);
	}
	
	@Override
	public ResponseEntity<Resource> getThumbnailResource(String systemName) throws Exception{

		Path path = Paths.get(saveFolder+systemName);

		String contentType = Files.probeContentType(path);

		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_TYPE, contentType);
		
	
		Resource resource = new InputStreamResource(Files.newInputStream(path));
		return new ResponseEntity<>(resource,headers,HttpStatus.OK);
	}




}
