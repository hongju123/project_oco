

// 쿠키를 읽는 함수
function getCookie(name) {
	console.log(name);
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// 페이지 로드 시 쿠키 확인
window.onload = function() {
    var info = getCookie("info");
    console.log(info)
    if (info == "false") {
        alert("잘못된 입력입니다");
    } 

}
console.log(document.cookie);