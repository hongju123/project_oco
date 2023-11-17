const alarmingSpans = document.querySelectorAll('.alarming');
const functionCheck = [false, false, false, false, false];

for (let index = 0; index < functionCheck.length; index++) {
    console.log(functionCheck[index]);

}
//functionCheck
//0 아이디, 1 비밀번호, 2 이름 , 3email 코드 맞는지 확인 , 4 핸드폰
// 아이디 중복확인 , 아이디 변경시 더블클릭후 변경시 value값이 중복확인으로 돌아감
//ajax로 아이디 체크하는 부분 
const userid_button = document.querySelector(".userid_button")
let userid = document.querySelector(".userid");
let username = document.querySelector(".username");
userid.addEventListener("focusout", function () {
    //    아이디는 영문자로 시작하는 6~20자 영문자 또는 숫자이어야 합니다
    let reg = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (reg.test(userid.value)) {
        alarmingSpans[1].classList.add("hidden");
    } else {
        userid.classList.add("falseAction");
        setTimeout(function () {
            userid_button.classList.remove("falseAction");
        }, 1000)
        console.log(functionCheck[1]);
        alarmingSpans[1].classList.remove("hidden");
    }
})
userid_button.addEventListener("click", function () {
    let reg = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (reg.test(userid.value)) {
        alarmingSpans[1].classList.add("hidden");
        $.ajax({
            url: "/user/findbyid",
            type: "get",
            data: { userid: userid.value },
            success: function (result) {
                console.log(result);
                //true 일경우 없는것
                if (result == true) {
                    userid_button.value = "✅";
                    userid_button.classList.add("ani");
                    userid_button.classList.add("checkBox");
                    userid.setAttribute("readonly", "readonly");
                    functionCheck[0] = true;
                    console.log("아이디 :" + functionCheck[0]);
                    alarmingSpans[0].classList.add("hidden");
                } else {
                    userid_button.classList.remove("ani");
                    userid_button.classList.remove("checkBox");

                    userid.classList.add("falseAction");
                    setTimeout (function () {
                        userid.classList.remove("falseAction");
                    }, 1000)
                    functionCheck[0] = false;
                    userid_button.value = "중복확인";
                    alarmingSpans[0].classList.remove("hidden");
                }
            },
            error: function (result) {
                console.log(result.responseText);
                userid_button.classList.add("falseAction");
                setTimeout (function () {
                    userid_button.classList.remove("falseAction");
                }, 1000)
            }
        });
    } else {
        userid.classList.add("falseAction");
        userid.classList.add("falseBoard");
        setTimeout(function () {
            userid.classList.remove("falseAction");
            userid.classList.remove("falseBoard");
        }, 1000)
        alarmingSpans[1].classList.remove("hidden");
    }
});

// 더블클릭 하면 정보 수정하는 것으로 간주
userid.addEventListener("dblclick", function () {
    userid.removeAttribute("readonly");
    userid_button.classList.remove("ani");
    userid_button.classList.remove("checkBox");
    userid_button.classList.remove("unset");
    userid_button.value = "중복확인";
})

userid.addEventListener("change", function () {
    userid_button.value = "중복확인";
    userid_button.classList.remove("ani");
    userid_button.classList.remove("checkBox");
    functionCheck[0] = false;
    console.log(functionCheck[0]);
    userid_button.classList.remove("unset");
});

// end
// 비밀번호 확인하는 부분

//비밀번호 정규식
// 해당 정규식은 영문, 숫자, 특수문자 조합으로 이루어진 8~15자의 문자열에 대해 검증
let userpw = document.querySelector(".userpw")
let check_userpw = document.querySelector(".check_userpw")
userpw.addEventListener("change", function (e) {
    let reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
    let password = e.target.value; // 입력된 비밀번호

    if (reg.test(password)) {
        // 비밀번호가 유효한 경우
        console.log("비밀번호가 유효합니다.");
        alarmingSpans[2].classList.add("hidden");
    } else {
        // 비밀번호가 유효하지 않은 경우
        alarmingSpans[2].classList.remove("hidden");
        console.log("비밀번호가 유효하지 않습니다.");
        userpw.classList.add("falseAction")
        setTimeout(function () {
            userpw.classList.remove("falseAction")
        }, 1000)
    }
}
)
check_userpw.addEventListener("change", function () {
    if (userpw.value == "") {
        alarmingSpans[3].classList.remove("hidden");
        userpw.focus()
    } else {
        alarmingSpans[3].classList.add("hidden");
    }
    if (userpw.value == check_userpw.value) {
        // 체크된거임
        alarmingSpans[4].classList.add("hidden");
        functionCheck[1] = true;
    } else {
        alarmingSpans[4].classList.remove("hidden");
        check_userpw.classList.add("falseAction")
        setTimeout(function () {
            check_userpw.classList.remove("falseAction")
        }, 1000)
    }

})

//비밀번호 끝
//이름 시작
username.addEventListener("change", function () {
    // 이름 정규식 2~4글자 이내 한글만 
    const reg = /^[가-힣]{2,4}$/;
    if (reg.test(username.value)) {
        functionCheck[2] = true;
    } else {
        functionCheck[2] = false;
        username.classList.add("falseAction")
        setTimeout(function () {
            username.classList.remove("falseAction")
        }, 1000)
    }
});
//이름 끝 


//이메일 시작
const email = document.querySelector(".email");
const get_code = document.querySelector(".get_code");

const check_code = document.querySelector(".check_code");
const check_code_button = document.querySelector(".check_code_button");

email.addEventListener("dblclick", function () {
    email.removeAttribute("readonly")
    get_code.value = "인증번호"
    get_code.classList.remove("ani");
    get_code.classList.remove("checkBox");
})

email.addEventListener("change", function (e) {
    let reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (reg.test(e.target.value)) {
        alarmingSpans[5].classList.add("hidden");
        get_code.removeAttribute("disabled")
        get_code.focus();
    } else {
        email.classList.add("falseAction")
        setTimeout(function () {
            email.classList.remove("falseAction")
        }, 1000)
        alarmingSpans[5].classList.remove("hidden");
        get_code.setAttribute("disabled", "disabled");
        get_code.value = "인증번호";
    }
})
get_code.addEventListener("click", function (e) {
    e.target.value = "";
    e.target.classList.add("loader");
    $.ajax({
        url: "/mail/getEmailcode",
        type: "POST",
        data: { "address": email.value },
        success: function (result) {
            console.log(result);
            if (result != null) {
                get_code.classList.remove("loader");
                get_code.value = "✅";
                get_code.classList.add("checkBox");
                get_code.classList.add("ani");
                email.setAttribute("readonly", "readonly")
            } else {
                get_code.classList.remove("ani");
                get_code.classList.remove("checkBox");
                get_code.classList.add("falseAction");
                setTimeout(function () {
                    get_code.classList.remove("falseAction");
                }, 1000)
                get_code.value = "인증번호";
            }

        },
        error: function (result) {
            //잘못된 입력시
        }
    });
})
check_code_button.addEventListener("click", function () {
    $.ajax({
        url: "/mail/checkcode",
        type: "POST",
        data: { code: check_code.value, email: email.value },
        success: function (result) {
            console.log("email 코드 :" + result);
            functionCheck[3] = result;
            if (result == true) {
                email.setAttribute("readonly", "readonly");
                check_code_button.value = "✅";
                check_code_button.classList.add("checkBox");
                check_code_button.classList.add("ani");
                
            } else {
                functionCheck[3] = false
                check_code_button.classList.remove("checkBox");
                check_code_button.classList.remove("ani");
                check_code_button.value = "확인";
                check_code.focus();
                check_code.classList.add("falseAction");
                setTimeout(function () {
                    check_code.classList.remove("falseAction");
                }, 1000)
            }
        },
        error: function (result) {
            console.log("email 코드 : " + result);
            functionCheck[3] = false
            check_code_button.classList.remove("unset");
            check_code_button.value = "인증";
            check_code.focus();
            check_code.classList.add("falseAction");
            setTimeout(function () {
                check_code.classList.remove("falseAction");
            }, 1000)
        }
    });
})
//이메일 끝
// 핸드폰 시작 
let userphonenumber = document.querySelector(".userphonenumber")

userphonenumber.addEventListener("change", function (e) {
    const regex = /^(?:\d{11}|\d{3}-\d{4}-\d{4})$/;

    if (regex.test(e.target.value)) {
        alarmingSpans[7].classList.add("hidden");
        functionCheck[4] = true;
    } else {
        alarmingSpans[7].classList.remove("hidden");
        functionCheck[4] = false;
        userphonenumber.classList.add("falseAction");
        setTimeout (function () {
            userphonenumber.classList.remove("falseAction");
        }, 1000)
        
    }
})
//핸드폰 끝

// 체크하는 식으로 



// 마무리 체크

const submitButton = document.querySelector("#submitButton");
const zipcode = document.querySelector(".zipcode");
const useraddress = document.querySelector(".useraddress");
const useraddressdetail = document.querySelector(".useraddressdetail");

submitButton.addEventListener("click", function () {
    if (checkFinal(functionCheck)) {
        console.log("성공?")
        document.querySelector(".join_form").submit();
    } else (
        console.log("안되네?")
    )
});


function checkFinal(arr) {
    const check_business = document.querySelector(".check_business")
    
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
    if (check_business.value!="✅") {
        return false
    }

    return true;
}

// 마무리 체크 끝 

// kakao addressAPI
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
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
            if (data.userSelectedType === 'R') {
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraAddr !== '') {
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
const postcodeCheckBox = document.querySelector(".postcodeCheckBox")
zipcode.addEventListener("click", function () {
    postcodeCheckBox.classList.add("falseAction")
})
//Kakao address API 끝
//비지니스 유저 카테고리

const businessCategory = document.querySelector(".businessCategory");
const house = document.querySelector(".house");
const food = document.querySelector(".food");
const bakery = document.querySelector(".bakery");
const car = document.querySelector(".car");
const another = document.querySelector(".another");
businessCategory.addEventListener("change", function (e) {

    switch (e.target.value) {
        case "숙소":
            console.log(e.target.value);
            console.log(house.value);
            house.classList.remove("hidden");
            food.classList.add("hidden");
            bakery.classList.add("hidden");
            car.classList.add("hidden");
            another.classList.add("hidden");
            house.removeAttribute("disabled");

            food.setAttribute("disabled", "disabled");
            bakery.setAttribute("disabled", "disabled");
            car.setAttribute("disabled", "disabled");
            another.setAttribute("disabled", "disabled");
            break;
        case "식당":
            console.log(e.target.value);
            house.classList.add("hidden");
            food.classList.remove("hidden");
            bakery.classList.add("hidden");
            car.classList.add("hidden");
            another.classList.add("hidden");
            food.removeAttribute("disabled");

            house.setAttribute("disabled", "disabled");
            bakery.setAttribute("disabled", "disabled");
            car.setAttribute("disabled", "disabled");
            another.setAttribute("disabled", "disabled");

            break;
        case "카페":
            console.log(e.target.value);
            house.classList.add("hidden");
            food.classList.add("hidden");
            bakery.classList.remove("hidden");
            car.classList.add("hidden");
            another.classList.add("hidden");
            bakery.removeAttribute("disabled");

            house.setAttribute("disabled", "disabled");
            food.setAttribute("disabled", "disabled");
            car.setAttribute("disabled", "disabled");
            another.setAttribute("disabled", "disabled");
            break;
        case "렌터카":
            console.log(e.target.value);
            house.classList.add("hidden");
            food.classList.add("hidden");
            bakery.classList.add("hidden");
            car.classList.remove("hidden");
            another.classList.add("hidden");
            car.removeAttribute("disabled");

            house.setAttribute("disabled", "disabled");
            food.setAttribute("disabled", "disabled");
            bakery.setAttribute("disabled", "disabled");
            another.setAttribute("disabled", "disabled");
            break;
        case "기타":
            console.log(e.target.value);
            house.classList.add("hidden");
            food.classList.add("hidden");
            bakery.classList.add("hidden");
            car.classList.add("hidden");
            another.classList.remove("hidden");
            another.removeAttribute("disabled");

            house.setAttribute("disabled", "disabled");
            food.setAttribute("disabled", "disabled");
            bakery.setAttribute("disabled", "disabled");
            car.setAttribute("disabled", "disabled");
            break;
        default: break;
    }
})
//비지니스 끝 
