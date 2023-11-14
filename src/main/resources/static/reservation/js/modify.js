$(document).ready(function() {
	$(".city").hide();
	$(".data").hide();
	$(".name").hide();
	$(".typeA").hide();
	$(".typeB").hide();
	$(".typeC").hide();
	$(".typeD").hide();
	$(".typeE").hide();
	$(".amenitiesA").hide();
	$(".amenitiesB").hide();
	$(".amenitiesC").hide();
	$(".amenitiesD").hide();
	$(".amenitiesE").hide();
	$(".amenitiesF").hide();
	const val = $("#category option:selected").text();
	if (val == "렌터카") {
		console.log("렌터카")
		$(".personnel").hide();
		$(".fuel").show();
	}
	else {
		console.log("숙소")
		$(".fuel").hide();
		$(".personnel").show();
	}
})
const category = $("#category");
function f() {
	const val = $("#category option:selected").text();
	console.log(val);
	$(".type").val("유형");
	$(".amenities").val("편의시설");
	$("input:checkbox").prop("checked", false);
	if (val == "렌터카") {
		console.log("렌터카")
		$(".personnel").hide();
		$(".fuel").show();
	}
	if (val == "숙소" || val == "식당" || val == "카페" || val == "기타") {
		console.log("숙소")
		$(".fuel").hide();
		$(".personnel").show();
	}
}
$(".type").on("click", function(e) {
	e.preventDefault();
	const val = $("#category option:selected").text();
	if (val == "숙소") {
		$(".typeA").show();
		$(".typeB").hide();
		$(".typeC").hide();
		$(".typeD").hide();
		$(".typeE").hide();
	}
	if (val == "식당") {
		$(".typeB").show();
		$(".typeA").hide();
		$(".typeC").hide();
		$(".typeD").hide();
		$(".typeE").hide();
	}
	if (val == "카페") {
		$(".typeC").show();
		$(".typeB").hide();
		$(".typeA").hide();
		$(".typeD").hide();
		$(".typeE").hide();
	}
	if (val == "렌터카") {
		$(".typeD").show();
		$(".typeB").hide();
		$(".typeC").hide();
		$(".typeA").hide();
		$(".typeE").hide();
	}
	if (val == "기타") {
		$(".typeE").show();
		$(".typeB").hide();
		$(".typeC").hide();
		$(".typeD").hide();
		$(".typeA").hide();
	}
})
$(".area").on("click", function(e) {
	e.preventDefault();
	$(".city").show();
})
$(".typeAA").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("모텔");
	$(".typeA").hide();
})
$(".typeAB").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("호텔");
	$(".typeA").hide();
})
$(".typeAC").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("펜션");
	$(".typeA").hide();
})
$(".typeAD").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("에어비엔비");
	$(".typeA").hide();
})
$(".typeAE").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("캠핑장");
	$(".typeA").hide();
})
$(".typeBA").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("한식");
	$(".typeB").hide();
})
$(".typeBB").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("일식");
	$(".typeB").hide();
})
$(".typeBC").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("중식");
	$(".typeB").hide();
})
$(".typeBD").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("분식");
	$(".typeB").hide();
})
$(".typeBE").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("야식");
	$(".typeB").hide();
})
$(".typeCA").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("개인");
	$(".typeC").hide();
})
$(".typeCB").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("프랜차이즈");
	$(".typeC").hide();
})
$(".typeCC").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("베이커리");
	$(".typeC").hide();
})
$(".typeCD").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("디저트");
	$(".typeC").hide();
})
$(".typeDA").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("경형/소형");
	$(".typeD").hide();
})
$(".typeDB").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("중형/대형");
	$(".typeD").hide();
})
$(".typeDC").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("SUV/승합");
	$(".typeD").hide();
})
$(".typeEA").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("회의실");
	$(".typeE").hide();
})
$(".typeEB").on("click", function(e) {
	e.preventDefault();
	const num = $(".type");
	num.val("파티룸");
	$(".typeE").hide();
})

$(".amenities").on("click", function(e) {
	e.preventDefault();
	const val = $("#category option:selected").text();
	const vals = $(".type").val();
	console.log(vals)
	if (val == "숙소") {
		$(".amenitiesA").show();
		$(".amenitiesB").hide();
		$(".amenitiesC").hide();
		$(".amenitiesD").hide();
		$(".amenitiesE").hide();
		$(".amenitiesF").hide();
	}
	if (val == "식당") {
		$(".amenitiesB").show();
		$(".amenitiesA").hide();
		$(".amenitiesC").hide();
		$(".amenitiesD").hide();
		$(".amenitiesE").hide();
		$(".amenitiesF").hide();
	}
	if (val == "카페") {
		$(".amenitiesC").show();
		$(".amenitiesA").hide();
		$(".amenitiesB").hide();
		$(".amenitiesD").hide();
		$(".amenitiesE").hide();
		$(".amenitiesF").hide();
	}
	if (val == "렌터카") {
		$(".amenitiesD").show();
		$(".amenitiesA").hide();
		$(".amenitiesB").hide();
		$(".amenitiesC").hide();
		$(".amenitiesE").hide();
		$(".amenitiesF").hide();
	}
	if (vals == "회의실") {
		$(".amenitiesE").show();
		$(".amenitiesA").hide();
		$(".amenitiesB").hide();
		$(".amenitiesC").hide();
		$(".amenitiesD").hide();
		$(".amenitiesF").hide();
	}
	if (vals == "파티룸") {
		$(".amenitiesF").show();
		$(".amenitiesA").hide();
		$(".amenitiesB").hide();
		$(".amenitiesC").hide();
		$(".amenitiesD").hide();
		$(".amenitiesE").hide();
	}
})
$(".sum").on("click", function(e) {
	e.preventDefault();
	var checkBoxArr = [];
	$("input:checkbox[name=typeA]:checked").each(function() {

		checkBoxArr.push($(this).val());

	});
	console.log(checkBoxArr)
	if (checkBoxArr.length != 0) {
		$(".amenities").val(checkBoxArr);
		$(".amenitiesA").hide();

	}
	$(".amenitiesA").hide();
})

$(".sum").on("click", function(e) {
	e.preventDefault();
	var checkBoxArr = [];
	$("input:checkbox[name=typeB]:checked").each(function() {

		checkBoxArr.push($(this).val());
	});
	console.log(checkBoxArr)
	if (checkBoxArr.length != 0) {
		$(".amenities").val(checkBoxArr);
		$(".amenitiesB").hide();
	}
	$(".amenitiesB").hide();
})

$(".sum").on("click", function(e) {
	e.preventDefault();
	var checkBoxArr = [];
	$("input:checkbox[name=typeC]:checked").each(function() {

		checkBoxArr.push($(this).val());
	});

	console.log(checkBoxArr)
	if (checkBoxArr.length != 0) {
		$(".amenities").val(checkBoxArr);
		$(".amenitiesC").hide();
	}
	$(".amenitiesC").hide();
})

$(".sum").on("click", function(e) {
	e.preventDefault();
	var checkBoxArr = [];
	$("input:checkbox[name=typeD]:checked").each(function() {

		checkBoxArr.push($(this).val());
	});
	console.log(checkBoxArr)
	if (checkBoxArr.length != 0) {
		$(".amenities").val(checkBoxArr);
		$(".amenitiesD").hide();
	}
	$(".amenitiesD").hide();
})

$(".sum").on("click", function(e) {
	e.preventDefault();
	var checkBoxArr = [];
	$("input:checkbox[name=typeE]:checked").each(function() {

		checkBoxArr.push($(this).val());
	});
	console.log(checkBoxArr)
	if (checkBoxArr.length != 0) {
		$(".amenities").val(checkBoxArr);
		$(".amenitiesE").hide();
	}
	$(".amenitiesE").hide();
})

$(".sum").on("click", function(e) {
	e.preventDefault();
	var checkBoxArr = [];
	$("input:checkbox[name=typeF]:checked").each(function() {

		checkBoxArr.push($(this).val());
	});
	console.log(checkBoxArr)
	if (checkBoxArr.length != 0) {
		$(".amenities").val(checkBoxArr);
		$(".amenitiesF").hide();
	}
	$(".amenitiesF").hide();
})

$(".calendars").on("click", function(e) {
	e.preventDefault();
	buildCalendar();
	$(".data").show();
})


$(".calendarcheck").on("click", function(e) {
	e.preventDefault();
	const elements = $(".choiceDay");
	let result = "";
	const year = $("#calYear").text()
	const month = $("#calMonth").html()
	const startday = elements[0].innerHTML
	const endday = elements[elements.length - 1].innerText
	result += year + "년" + month + "월" + startday + "일 ~ " + year + "년" + month + "월" + endday + "일";
	console.log(result)
	$(".calendars").val(result)
	$(".data").hide();
})
/*지역 클릭시 모달창띄우기*/
const modal = document.getElementById("modal")
const areaA = document.getElementById("areaA")
const main02 = $(".main02-inner")
areaA.addEventListener("click", e => {
	modal.style.display = "flex"
})
/*X버튼 클릭시 모달창내리기*/
const closeBtn = modal.querySelector(".close-area")
closeBtn.addEventListener("click", e => {
	modal.style.display = "none"
})
/*모달창 밖을 클릭시 모달창내리기*/
modal.addEventListener("click", e => {
	const evTarget = e.target
	if (evTarget.classList.contains("modal-overlay")) {
		modal.style.display = "none"
	}
})