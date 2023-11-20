//이메일 아이디찾기부분 시작
const email = document.querySelector(".email");
const get_code = document.querySelector(".get_code");

const check_code = document.querySelector(".check_code");
const check_code_button = document.querySelector(".check_code_button");

const finduser_Page_button = document.querySelector(".finduser_Page_button");

email.addEventListener("dblclick", function () {
    email.removeAttribute("readonly")
    get_code.value = "인증번호"
    get_code.classList.remove("ani");
    get_code.classList.remove("checkBox");
})

email.addEventListener("change", function (e) {
    let reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (reg.test(e.target.value)) {
        get_code.removeAttribute("disabled")
        get_code.focus();
    } else {
        email.classList.add("falseAction")
        setTimeout(function () {
            email.classList.remove("falseAction")
        }, 2000)
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
                }, 2000)
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
            if (result == true) {
                email.setAttribute("readonly", "readonly");
                check_code_button.value = "✅";
                check_code_button.classList.add("checkBox");
                check_code_button.classList.add("ani");
            } else {
                check_code_button.classList.remove("checkBox");
                check_code_button.classList.remove("ani");
                check_code_button.value = "확인";
                check_code.focus();
            }
        },
        error: function (result) {
            console.log("email 코드 : " + result);
            check_code_button.classList.remove("unset");
            check_code_button.value = "인증";
            check_code.focus();
        }
    });
})
function submitHandler(){
    const finduser_Page_button = document.querySelector(".finduser_Page_button");
    if (get_code.value!="✅") {
        get_code.classList.add("falseAction");
        setTimeout(function(){get_code.classList.remove("falseAction")},2000)

        finduser_Page_button.classList.add("falseAction");
        setTimeout(function(){finduser_Page_button.classList.remove("falseAction")},2000)
        return false
    }
    if (check_code_button.value!="✅") {
        check_code_button.classList.add("falseAction");
        setTimeout(function(){check_code_button.classList.remove("falseAction")},2000)

        finduser_Page_button.classList.add("falseAction");
        setTimeout(function(){finduser_Page_button.classList.remove("falseAction")},2000)
        return false
    }
    id_form.submit();
}
//이메일 아이디찾기부분 끝
//이메일 비빌번호 찾기 부분 시작
const email_2 = document.querySelector(".email_2");
const get_code_2 = document.querySelector(".get_code_2");

const check_code_2 = document.querySelector(".check_code_2");
const check_code_button_2 = document.querySelector(".check_code_button_2");

const finduser_Page_button_2 = document.querySelector(".finduser_Page_button_2");

email_2.addEventListener("dblclick", function () {
    email_2.removeAttribute("readonly")
    get_code_2.value = "인증번호"
    get_code_2.classList.remove("ani");
    get_code_2.classList.remove("checkBox");
})

email_2.addEventListener("change", function (e) {
    let reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (reg.test(e.target.value)) {
        get_code_2.removeAttribute("disabled")
        get_code_2.focus();
    } else {
        email_2.classList.add("falseAction")
        setTimeout(function () {
            email_2.classList.remove("falseAction")
        }, 2000)
        get_code_2.setAttribute("disabled", "disabled");
        get_code_2.value = "인증번호";
    }
})
get_code_2.addEventListener("click", function (e) {
    e.target.value = "";
    e.target.classList.add("loader");
    $.ajax({
        url: "/mail/getEmailcode",
        type: "POST",
        data: { "address": email_2.value },
        success: function (result) {
            console.log(result);
            if (result != null) {
                get_code_2.classList.remove("loader");
                get_code_2.value = "✅";
                get_code_2.classList.add("checkBox");
                get_code_2.classList.add("ani");
                email_2.setAttribute("readonly", "readonly")
            } else {
                get_code_2.classList.remove("ani");
                get_code_2.classList.remove("checkBox");
                get_code_2.classList.add("falseAction");
                setTimeout(function () {
                    get_code_2.classList.remove("falseAction");
                }, 2000)
                get_code_2.value = "인증번호";
            }

        },
        error: function (result) {
            //잘못된 입력시
        }
    });
})
check_code_button_2.addEventListener("click", function () {
    console.log(email_2.value);
    console.log(check_code_2.value);
    $.ajax({
        url: "/mail/checkcode",
        type: "POST",
        data: { code: check_code_2.value, email: email_2.value },
        success: function (result) {
            console.log("email_2 코드 :" + result);
            if (result == true) {
                email_2.setAttribute("readonly", "readonly");
                check_code_button_2.value = "✅";
                check_code_button_2.classList.add("checkBox");
                check_code_button_2.classList.add("ani");
            } else {
                check_code_button_2.classList.remove("checkBox");
                check_code_button_2.classList.remove("ani");
                check_code_button_2.value = "확인";
                check_code_2.focus();
            }
        },
        error: function (result) {
            console.log("email_2 코드 : " + result);
            check_code_button_2.classList.remove("unset");
            check_code_button_2.value = "인증";
            check_code_2.focus();
        }
    });
})

function submitHandler_2(){
    const finduser_Page_button_2 = document.querySelector(".finduser_Page_button_2");

    if (userid_button_2.value!="✅") {
        userid_button_2.classList.add("falseAction");
        setTimeout(function(){userid_button_2.classList.remove("falseAction")},2000)
        
        finduser_Page_button_2.classList.add("falseAction");
        setTimeout(function(){finduser_Page_button_2.classList.remove("falseAction")},2000)
        return false
    }
    if (get_code_2.value!="✅") {
        get_code_2.classList.add("falseAction");
        setTimeout(function(){get_code_2.classList.remove("falseAction")},2000)

        finduser_Page_button_2.classList.add("falseAction");
        setTimeout(function(){finduser_Page_button_2.classList.remove("falseAction")},2000)
        return false
    }
    if (check_code_button_2.value!="✅") {
        check_code_button_2.classList.add("falseAction");
        setTimeout(function(){check_code_button_2.classList.remove("falseAction")},2000)

        finduser_Page_button_2.classList.add("falseAction");
        setTimeout(function(){finduser_Page_button_2.classList.remove("falseAction")},2000)
        return false
    }
    password_form.submit();

}


// 이메일 비빌번호 찾기 부분 끝

//아이디 중복확인
const userid_button_2 = document.querySelector(".userid_button_2")
userid_button_2.addEventListener("click", function () {
    const userid_2 = document.querySelector(".userid_2");
    $.ajax({
        url: "/user/findbyid",
        type: "get",
        data: { userid: userid_2.value },
        success: function (result) {
            console.log(result);
            //false 일경우 같은 아이디가 있다는 의미
            if (result == false) {
                userid_button_2.value = "✅";
                userid_button_2.classList.add("checkBox");
                userid_2.setAttribute("readonly", "readonly");
            }
        },
        error: function (result) {
            console.log(result.responseText);
        }
    });
});

// delete 버튼
const delete_innerText = document.querySelectorAll(".delete_innerText");

delete_innerText.forEach(data => {
    data.addEventListener("click", function (e) {
        e.preventDefault();
        e.target.previousElementSibling.value = "";
    });
});

// 끝
// option 선택하기
const choose_pw = document.querySelector(".choose_pw");
const choose_id = document.querySelector(".choose_id");
const id_form = document.querySelector(".id_form");
const password_form = document.querySelector(".password_form");

choose_id.addEventListener("click", function () {
    choose_id.classList.add("color");
    choose_pw.classList.remove("color")
    id_form.classList.remove("hidden")
    password_form.classList.add("hidden")
})
choose_pw.addEventListener("click", function () {
    choose_pw.classList.add("color")
    id_form.classList.add("hidden");
    choose_id.classList.remove("color")
    password_form.classList.remove("hidden")
})


// 끝