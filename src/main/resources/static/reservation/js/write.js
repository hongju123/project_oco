const areaDate = {
	"서울": ["강남구", "강동구", "관악구", "동작구", "서초구", "송파구", "영등포구", "강서구", "구로구", "금천구", "마포구", "서대문구", "양천구", "은평구", "노원구", "도봉구", "강북구", "성북구", "중랑구", "동대문구", "광진구", "성동구", "용산구", "종로구", "중구",],

	"부산": ["강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"],

	"대구": ["군위군", "남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"],

	"인천": ["강화군", "계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "옹진군", "중구"],

	"광주": ["광산구", "남구", "동구", "북구", "서구"],

	"대전": ["대덕구", "동구", "서구", "유성구", "중구"],

	"울산": ["남구", "동구", "북구", "울주군", "중구"],

	"세종": ["세종시"],

	"경기": ["가평군", "고양시 덕양구", "고양시 일산동구", "고양시 일산서구", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "수원시", "성남시 분당구", "성남시 수정구", "성남시 중원구", "성남시 권선구", "성남시 영통구", "성남시 장안구", "성남시 팔달구", "시흥시", "안산시 단원구", "안산시 상록구", "안성시", "안양시 동안구", "안양시 만안구", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시 기흥구", "용인시 수지구", "용신시 처인구", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"],

	"강원": ["강릉시", "고성군", "동해시", "삼척시", "속초시", "양구군", "양양군", "영월군", "원주시", "인제군", "정선군", "철원군", "춘천시", "태백시", "평창군", "홍천군", "화천군", "횡성군"],

	"충북": ["괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "제천시", "증평군", "진천군", "청주시 상당구", "청주시 서원구", "청주시 청원구", "청주시 흥덕구", "충주"],

	"충남": ["계룡시", "공주시", "금산군", "논산시", "당진시", "보령시", "부여군", "서산시", "서천군", "아산시", "예산군", "천안시 동남구", "천안시 서북구", "청양군", "태안군", "홍성군",],

	"전북": ["고창군", "군산시", "김제시", "남원시", "무주군", "부안군", "순창군", "완주군", "익산시", "임실군", "장수군", "전주시 덕진구", "전주시 완산구", "정읍시", "진안군"],

	"전남": ["강진군", "고흥군", "곡성군", "광양시", "구례군", "나주시", "담양군", "목포시", "무안군", "보성군", "순천시", "신안군", "여수시", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군",],

	"경북": ["경산시", "경주시", "고령군", "구미시", "김천시", "문경시", "봉화군", "상주시", "성주군", "안동시", "영덕군", "영양군", "영주시", "영천시", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군", "포항시 남구", "포항시 북구"],

	"경남": ["거제시", "거창군", "고성군", "김해시", "남해군", "밀양시", "사천시", "산청군", "양산시", "의령군", "진주시", "창녕군", "창원시 마산합포구", "창원시 마산회원구", "창원시 성산구", "창원시 의창구", "창원시 진해구", "통영시", "하동군", "함안군", "함양군", "합천군"],

	"제주": ["서귀포", "제주"]
}
function f2() {
	const area = document.getElementById("area")
	const areaA = document.getElementById("areaA")
	const modal = document.getElementById("modal")

	const category_list = document.createElement("ul")
	while (area.lastChild) {
		area.removeChild(area.lastChild)
	}
	category_list.className = "category_list"
	area.appendChild(category_list)

	if (category_list.children.length === 0) {
		for (let key in areaDate) {
			const ul_1 = document.createElement('ul')
			ul_1.innerHTML = key
			ul_1.className = "category_2"
			category_list.appendChild(ul_1)

			ul_1.addEventListener("click", function() {
				if (ul_1.children.length == 0) {
					for (let detail of areaDate[key]) {
						const li_2 = document.createElement("li")
						li_2.innerHTML = detail
						li_2.className = "category_2_detail"
						ul_1.appendChild(li_2)
						li_2.addEventListener("click", function() {
							areaA.setAttribute("value", key + "/" + detail)
							modal.style.display = "none"
							while (category_list.lastChild) {
								category_list.removeChild(category_list.lastChild);
							}
							while (area.lastChild) {
								area.removeChild(area.lastChild)
								category_list_on = null
							}
						})
					}
				}
				else {
					while (ul_1.lastChild && ul_1.lastChild !== ul_1.firstChild) {
						ul_1.removeChild(ul_1.lastChild);
					}
				}

			})
		}
	}
	else {
		while (category_list.lastChild) {
			category_list.removeChild(category_list.lastChild)
		}
	}
}




let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date();     // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0);    // 비교 편의를 위해 today의 시간을 초기화

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {

	let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
	let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

	let tbody_Calendar = document.querySelector(".Calendar > tbody");
	document.getElementById("calYear").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
	document.getElementById("calMonth").innerText = leftPad(nowMonth.getMonth() + 1);  // 월 숫자 갱신

	while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
		tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
	}

	let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가           

	for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
		let nowColumn = nowRow.insertCell();        // 열 추가
	}

	for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  

		let nowColumn = nowRow.insertCell();        // 새 열을 추가하고


		let newDIV = document.createElement("p");
		newDIV.innerHTML = leftPad(nowDay.getDate());        // 추가한 열에 날짜 입력
		nowColumn.appendChild(newDIV);

		if (nowDay.getDay() == 6) {                 // 토요일인 경우
			nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
		}

		if (nowDay < today) {                       // 지난날인 경우
			newDIV.className = "pastDay";
		}
		else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
			newDIV.className = "today";
			newDIV.onclick = function() { choiceDate(this); }
		}
		else {                                      // 미래인 경우
			newDIV.className = "futureDay";
			newDIV.onclick = function() { choiceDate(this); }
		}
	}
}
// 날짜 선택
function choiceDate(newDIV) {
	if (newDIV.classList.contains("choiceDay")) {
		newDIV.classList.remove("choiceDay");  // 해당 날짜의 "choiceDay" class 제거
	}
	else {
		newDIV.classList.add("choiceDay");
	}
}

// 이전달 버튼 클릭
function prevCalendar() {
	nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
	buildCalendar();    // 달력 다시 생성
}
// 다음달 버튼 클릭
function nextCalendar() {
	nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
	buildCalendar();    // 달력 다시 생성
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
	if (value < 10) {
		value = "0" + value;
		return value;
	}
	return value;
}



function selectAll(data, callback) {
	let boardnum = data.boardnum;
	let pagenum = data.pagenum;

	$.getJSON(
		"/reply/pages/" + boardnum + "/" + pagenum,
		function(data) {
			//data : {replyCnt:댓글개수, list:[....]}
			callback(data.replyCnt, data.list);
		}
	)
}










