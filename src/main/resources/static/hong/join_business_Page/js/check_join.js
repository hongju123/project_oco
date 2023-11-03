const alarmingSpans = document.querySelectorAll('.alarming');
const functionCheck = [false,false,false,false,false]; 

for (let index = 0; index < functionCheck.length; index++) {
   console.log( functionCheck[index]);
    
}

// 아이디 중복확인 , 아이디 변경시 더블클릭후 변경시 value값이 중복확인으로 돌아감
//ajax로 아이디 체크하는 부분 
const userid_button = document.querySelector(".userid_button")
let userid = document.querySelector(".userid");
let username = document.querySelector(".username");
userid_button.addEventListener("click", function() {
    $.ajax({
        url: "/user/findbyid",
        type: "get",
        data: { userid: userid.value },
        success: function(result) {
            console.log(result);
            //true 일경우 없는것
            if(result==true){
				userid_button.value = "✅";
				userid_button.classList.add("unset");
				userid.setAttribute("readonly", "readonly");
                functionCheck[0]=true;
                console.log("아이디 :"+ functionCheck[0]);
			}
        },
        error: function(result) {
            console.log(result.responseText);
        }
    });
});

userid.addEventListener("dblclick",function(){
    userid.removeAttribute("readonly");
    let tem_userid = userid.value;
    userid_button.classList.add("unset");
    userid_button.value = "✅";
})

userid.addEventListener("change",function(){
    userid_button.value = "중복확인";
    functionCheck[0]=false;
    console.log(functionCheck[0]);
    userid_button.classList.remove("unset");
});

    // end
    // 비밀번호 확인하는 부분

    //비밀번호 정규식
    // 해당 정규식은 영문, 숫자, 특수문자 조합으로 이루어진 8~15자의 문자열에 대해 검증
let userpw = document.querySelector(".userpw")
let check_userpw = document.querySelector(".check_userpw")
userpw.addEventListener("change",function(e){
    let reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
    let password = e.target.value; // 입력된 비밀번호

    if (reg.test(password)) {
        // 비밀번호가 유효한 경우
        console.log("비밀번호가 유효합니다.");
        alarmingSpans[1].classList.add("hidden");
    } else {
        // 비밀번호가 유효하지 않은 경우
        alarmingSpans[1].classList.remove("hidden");
        console.log("비밀번호가 유효하지 않습니다.");
    }
}
)
check_userpw.addEventListener("change",function(){
    if (userpw.value=="") {
        alert("앞에 안적었다")
        alarmingSpans[2].classList.remove("hidden");
        userpw.focus()
    } else{
        alarmingSpans[2].classList.add("hidden");
    }
    if (userpw.value==check_userpw.value) {
        // 체크된거임
        alarmingSpans[3].classList.add("hidden");
        functionCheck[1]=true; 
    }else{
        alarmingSpans[3].classList.remove("hidden");
    }
    
})    

//비밀번호 끝
//이름 시작
username.addEventListener("change",function (){
    // 이름 정규식 2~4글자 이내 한글만 
    const reg = /^[가-힣]{2,4}$/; 
    if (reg.test(username.value)) {
        username.style.border = "1px solid black"
        functionCheck[2]=true; 
    } else{
        username.style.border = "1px solid red"
        functionCheck[2]=false; 
    }
});
//이름 끝 


//이메일 시작
const email = document.querySelector(".email");
const get_code = document.querySelector(".get_code");

const check_code = document.querySelector(".check_code");
const check_code_button = document.querySelector(".check_code_button");

email.addEventListener("change",function(e){
    let reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (reg.test(e.target.value)) {
        alarmingSpans[4].classList.add("hidden");
        get_code.removeAttribute("disabled")
        get_code.focus();
    }else{
        alarmingSpans[4].classList.remove("hidden");
        get_code.setAttribute("disabled","disabled");
        get_code.value = "인증번호";
    }
})
// input button 에 readonly 속성 줬으나 visual studio과 sts 호환성 문제인지 적용이 안됐고 다시 sts에서 작성해보니 적용이됨. 
get_code.addEventListener("click",function(){
    console.log(email.value);
    $.ajax({
        url: "/mail/getEmailcode",
        type: "POST",
        data: {"address" : email.value},
        success: function(result) {
            console.log(result);
        },
        error: function(result) {
            console.log(result.responseText);
        }
  });
  })
  check_code_button.addEventListener("click",function(){
    $.ajax({
        url: "/mail/checkcode", 
        type: "POST",
        data: { code: check_code.value, email:email.value},
        success: function(result) {
            console.log("email 코드 :"+result);
            functionCheck[3]=result;
            if(result==true){
				email.setAttribute("readonly","readonly");
            	check_code_button.classList.add("unset");
            	check_code_button.value = "✅";

			}else{
				functionCheck[3]=false
	            check_code_button.classList.remove("unset");
	            check_code_button.value = "확인";
	            check_code.focus();
			}
        },
        error: function(result) {
            console.log("email 코드 : "+result);
            functionCheck[3]=false
            check_code_button.classList.remove("unset");
            check_code_button.value = "인증";
            check_code.focus();
        }
    });
})
//이메일 끝
// 핸드폰 시작 
let userphonenumber = document.querySelector(".userphonenumber")

userphonenumber.addEventListener("change",function(e){
    const regex = /^(?:\d{11}|\d{3}-\d{4}-\d{4})$/;

    if (regex.test(e.target.value)) {
        alarmingSpans[6].classList.add("hidden");
        functionCheck[4]=true;
    }else{
        alarmingSpans[6].classList.remove("hidden");
        functionCheck[4]=false;
    }
})

//성별 체크 시작
// 성별 체크 끝
// 취미 체크 
// const userhobby = document.querySelector(".userhobby")
// userhobby.addEventListener("change", function(e){
//         const reg =/^. {3,10}$/;
//         if (reg.test(e.target.value)) {
//             functionCheck[9]=true;
//         }else{
//             e.target.style.border ="1px solid red";
//         }
//     }
// )
// 취미 체크 끝 

// 핸드폰 끝

// 체크하는 식으로 



// 마무리 체크

const submitButton = document.querySelector("#submitButton");

submitButton.addEventListener("click",function(){
    if (checkFinal(functionCheck)) {
        document.querySelector(".join_form").submit();
    }else(
        console.log("안되네?")
    )
});


function checkFinal(arr){
    
    const zipcode = document.querySelector(".zipcode");
    const useraddress = document.querySelector(".useraddress");
    const useraddressdetail = document.querySelector(".useraddressdetail");

    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        console.log(index+ ":"+element);
        if (element!==true) {
            return false;
        }
    }
    if (zipcode.value=="") {
		console.log(zipcode.value);
        console.log("zip_code 누락");
        return false;
    }
    if (useraddressdetail.value=="") {
        console.log("useraddressdetail 누락");
        return false;
    }
    
    return true;
}

// 마무리 체크 끝 

// kakao addressAPI
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample6_extraAddress").value = extraAddr;
            
            } else {
                document.getElementById("sample6_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}
//Kakao address API 끝
