function clock() {

	//Save the times in variables

	var today = new Date();

	var hours = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();


	//Set the AM or PM time

	if (hours >= 12) {
		meridiem = " pm";
	}
	else {
		meridiem = " am";
	}


	//convert hours to 12 hour format and put 0 in front
	if (hours > 12) {
		hours = hours - 12;
	}
	else if (hours === 0) {
		hours = 12;
	}

	//Put 0 in front of single digit minutes and seconds

	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	else {
		minutes = minutes;
	}

	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	else {
		seconds = seconds;
	}


	document.getElementById("clock").innerHTML = (hours + ":" + minutes + ":" + seconds + meridiem);

}


setInterval('clock()', 1000);

AOS.init({
	duration: 1500,
});

function sendit() {
	const Form = document.Form;
	Form.submit();
}
$(document).ready(function() {
	$(".city").hide();
	$(".data").hide();
	$(".name").hide();
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
	const val = $("#category option:selected").val();
	$(".type").val("유형");
	console.log(val)
	$("input:checkbox").prop("checked", false);
	if (val == "렌터카") {
		$(".personnel").hide();
		$(".fuel").show();
	}
	else {
		$(".fuel").hide();
		$(".personnel").show();
	}
})
const category = $("#category");
function f() {
	const val = $("#category option:selected").val();
	$(".type").val("유형");
	$("input:checkbox").prop("checked", false);
	if (val == "렌터카") {
		$(".personnel").hide();
		$(".fuel").show();
	}
	else {
		$(".fuel").hide();
		$(".personnel").show();
	}
}



$("#category").on("change", function(e) {
	e.preventDefault();
	const val = $("#category option:selected").val();
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

$("#amenities").on("click", function(e) {
	const val = $("#category option:selected").val();
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
		$("#amenities").val(checkBoxArr);
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
		$("#amenities").val(checkBoxArr);
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
		$("#amenities").val(checkBoxArr);
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
		$("#amenities").val(checkBoxArr);
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
		$("#amenities").val(checkBoxArr);
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
		$("#amenities").val(checkBoxArr);
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
$(".calendarcancel").on("click", function(e) {
	e.preventDefault();
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