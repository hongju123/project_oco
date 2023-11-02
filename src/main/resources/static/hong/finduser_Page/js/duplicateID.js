const id = document.querySelector(".userid_button")
id.addEventListener("click", function() {
    $.ajax({
        url: "/user/findbyid",
        type: "get",
        data: { userid: userid.value },
        success: function(result) {
            console.log(result);
            //false 일경우 같은 아이디가 있다는 의미
            if(result==false){
				id.value = "✅";
				id.classList.add("all_unset");
				userid.setAttribute("readonly", "readonly");
			}
        },
        error: function(result) {
            console.log(result.responseText);
        }
    });
});
