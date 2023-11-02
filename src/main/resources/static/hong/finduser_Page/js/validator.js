const userid = document.querySelector(".userid");
const email = document.querySelectorAll(".email");
const get_code = document.querySelectorAll(".get_code");
const check_code = document.querySelectorAll(".check_code");
const check_code_button = document.querySelectorAll(".check_code_button");
let emailInput = "null"
get_code.forEach(data => {
    data.addEventListener("click", function(e) {
		 emailInput = e.target.previousElementSibling.value;
        $.ajax({
            url: "/mail/getEmailcode",
            type: "POST",
            data: { "address": emailInput },
            success: function (result) {
                console.log(result);
            },
            error: function (result) {
				
                /*console.log(result.responseText);*/
            	alert("잘못된 입력입니다")
            }
        });

    });
});

check_code_button.forEach(data => {
    data.addEventListener("click", function(e) {
        const codeInput = e.target.previousElementSibling.value;
        console.log(codeInput);
        $.ajax({
        url: "/mail/checkcode",
        type: "POST",
        data: { code: codeInput, email :emailInput },
        success: function (result) {
			/*성공했을경우 onlyread로 이메일 못바꾸게하기*/
            console.log(result);
            email.forEach(data=>data.setAttribute("readonly", "readonly"));
            userid.setAttribute("readonly", "readonly");
            /*임시로 아이디,비밀번호창도 그냥 묶어서 onlyread줬음*/
        },
        error: function (result) {
            console.log(result.responseText);
            
        }
    });
    });
});

