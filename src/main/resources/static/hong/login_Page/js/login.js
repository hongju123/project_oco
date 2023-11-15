// delete button 
const delete_innerText = document.querySelectorAll(".delete_innerText");

delete_innerText.forEach(data => {
  data.addEventListener("click", function (e) {
    e.preventDefault();
    e.target.previousElementSibling.value = "";
  });
});
// done 
// login_form submit

const login_button = document.querySelector(".login_button");

login_button.addEventListener("click", function () {
  document.querySelector(".login_form").submit();
})

// done
// kakao 로그인 

function loginWithKakao() {
  Kakao.Auth.authorize({
    redirectUri: 'http://localhost:8080/user/login-kakao',
  });
}

displayToken()
function displayToken() {
  var token = getCookie('authorize-access-token');

  if (token) {
    Kakao.Auth.setAccessToken(token);
    Kakao.Auth.getStatusInfo()
      .then(function (res) {
        if (res.status === 'connected') {
          document.getElementById('token-result').innerText
            = 'login success, token: ' + Kakao.Auth.getAccessToken();
        }
      })
      .catch(function (err) {
        Kakao.Auth.setAccessToken(null);
      });
  }
}

function getCookie(name) {
  var parts = document.cookie.split(name + '=');
  if (parts.length === 2) { return parts[1].split(';')[0]; }
}


// 카카오 로그인 끝 

// check cookie


function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

// 페이지 로드 시 쿠키 확인
window.onload = function () {
  var loginCookie = getCookie("login");
  if (loginCookie == "fail") {
    alert("로그인 실패");
  }
  var userid = getCookie("userId")
  if (userid != null) {
    console.log("userid : " + userid);
    document.querySelector(".userid_input").value = userid;
    document.querySelector(".userpw_input").focus();
  }

  /*쿠키 있을경우 alert으로 알림, pw는 이메일로 날라가게 해놨음*/
  var userpw = getCookie("userpw");
  if (userpw == "true") {
    alert("이메일을 확인해주세요");
  }
  onlyFindUserID
  var onlyFindUserID = getCookie("onlyFindUserID");
  if (onlyFindUserID != null) {
    document.querySelector(".userid_input").value = onlyFindUserID;
    alert("회원님의 아이디는" + onlyFindUserID + "입니다");
  }
}
console.log(document.cookie);

// done