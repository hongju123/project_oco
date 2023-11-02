const id = document.querySelector(".userid_button")
id.addEventListener("click", function() {
    let userid = document.querySelector(".userid").value;
    console.log(userid);
    $.ajax({
        url: "/user/findbyid",
        type: "get",
        data: { userid: userid },
        success: function(result) {
            console.log(result);
        },
        error: function(result) {
            console.log(result.responseText);
        }
    });
});
