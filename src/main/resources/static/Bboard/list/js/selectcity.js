const modal = document.querySelector(".modal")
const body = document.querySelector(".modal_body")
const li_2 = document.getElementsByClassName("category_2_detail")
const category_main = document.getElementById("category_main")
const category_city = document.getElementById("category_city")
const category_list_create = document.getElementById("category_select_section")
const area_2 = document.getElementById("area_2")
const get = document.getElementsByClassName("get")
const areaDate = {
	"전 지역": [],

	"서울": ["전 지역", "강남구", "강동구", "관악구", "동작구", "서초구", "송파구", "영등포구", "강서구", "구로구", "금천구", "마포구", "서대문구", "양천구", "은평구", "노원구", "도봉구", "강북구", "성북구", "중랑구", "동대문구", "광진구", "성동구", "용산구", "종로구", "중구",],

	"부산": ["전 지역", "강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"],

	"대구": ["전 지역", "군위군", "남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"],

	"인천": ["전 지역", "강화군", "계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "옹진군", "중구"],

	"광주": ["전 지역", "광산구", "남구", "동구", "북구", "서구"],

	"대전": ["전 지역", "대덕구", "동구", "서구", "유성구", "중구"],

	"울산": ["전 지역", "남구", "동구", "북구", "울주군", "중구"],

	"세종": ["전 지역", "세종"],

	"경기": ["전 지역", "가평군", "고양시 덕양구", "고양시 일산동구", "고양시 일산서구", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "수원시", "성남시 분당구", "성남시 수정구", "성남시 중원구", "성남시 권선구", "성남시 영통구", "성남시 장안구", "성남시 팔달구", "시흥시", "안산시 단원구", "안산시 상록구", "안성시", "안양시 동안구", "안양시 만안구", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시 기흥구", "용인시 수지구", "용신시 처인구", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"],

	"강원": ["전 지역", "강릉시", "고성군", "동해시", "삼척시", "속초시", "양구군", "양양군", "영월군", "원주시", "인제군", "정선군", "철원군", "춘천시", "태백시", "평창군", "홍천군", "화천군", "횡성군"],

	"충북": ["전 지역", "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "제천시", "증평군", "진천군", "청주시 상당구", "청주시 서원구", "청주시 청원구", "청주시 흥덕구", "충주"],

	"충남": ["전 지역", "계룡시", "공주시", "금산군", "논산시", "당진시", "보령시", "부여군", "서산시", "서천군", "아산시", "예산군", "천안시 동남구", "천안시 서북구", "청양군", "태안군", "홍성군",],

	"전북": ["전 지역", "고창군", "군산시", "김제시", "남원시", "무주군", "부안군", "순창군", "완주군", "익산시", "임실군", "장수군", "전주시 덕진구", "전주시 완산구", "정읍시", "진안군"],

	"전남": ["전 지역", "강진군", "고흥군", "곡성군", "광양시", "구례군", "나주시", "담양군", "목포시", "무안군", "보성군", "순천시", "신안군", "여수시", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군",],

	"경북": ["전 지역", "경산시", "경주시", "고령군", "구미시", "김천시", "문경시", "봉화군", "상주시", "성주군", "안동시", "영덕군", "영양군", "영주시", "영천시", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군", "포항시 남구", "포항시 북구"],

	"경남": ["전 지역", "거제시", "거창군", "고성군", "김해시", "남해군", "밀양시", "사천시", "산청군", "양산시", "의령군", "진주시", "창녕군", "창원시 마산합포구", "창원시 마산회원구", "창원시 성산구", "창원시 의창구", "창원시 진해구", "통영시", "하동군", "함안군", "함양군", "합천군"],

	"제주": ["전 지역", "서귀포시", "제주시"]
};

let category_list_on = null;

function selectCategory_city() {
	if (category_list_on !== "city") {
		const category_list = document.createElement("ul")

		modal.style.display = "flex"
		body.style.display = "inline"

		while (category_list_create.lastChild) {
			category_list_create.removeChild(category_list_create.lastChild)
		}
		category_list.className = "category_list"
		category_list_create.appendChild(category_list)

		if (category_list.children.length === 0) {
			for (let key in areaDate) {
				const ul_1 = document.createElement('ul')
				ul_1.innerHTML = key
				ul_1.className = "category_2"
				category_list.appendChild(ul_1)

				if (ul_1.innerHTML == "전 지역") {
					ul_1.addEventListener("click", function() {
						category_city.setAttribute("value", key)

						category_select();
						updateMapLink();

						modal.style.display = "none"
						body.style.display = "none"


						while (category_list.lastChild) {
							category_list.removeChild(category_list.lastChild)
						}
						while (category_list_create.lastChild) {
							category_list_create.removeChild(category_list_create.lastChild)
							category_list_on = null
						}
					})
				}
				ul_1.addEventListener("click", function() {
					if (ul_1.children.length == 0) {
						for (let detail of areaDate[key]) {
							const li_2 = document.createElement("li")
							li_2.innerHTML = detail
							li_2.className = "category_2_detail"
							ul_1.appendChild(li_2)
							li_2.addEventListener("click", function() {
								category_city.setAttribute("value", key + "/" + detail)

								category_select();
								updateMapLink();

								modal.style.display = "none"
								body.style.display = "none"

								while (category_list.lastChild) {
									category_list.removeChild(category_list.lastChild);
								}
								while (category_list_create.lastChild) {
									category_list_create.removeChild(category_list_create.lastChild)
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
		category_list_on = "city"
	} else {
		if (category_list_create.lastChild) {
			category_list_create.removeChild(category_list_create.lastChild)
		}
		category_list_on = null
	}
}

function updateMapLink() {
	const mainValue = document.getElementById("category_main").value;
	const cityValue = document.getElementById("category_city").value;
	const URL = "findmap?main=" + mainValue + "&city=" + cityValue;
	if (document.getElementById("setting")) {
		document.getElementById("setting").setAttribute("href", URL)
	}
}
