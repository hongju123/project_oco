const email = document.querySelector(".email");
	const get_code = document.querySelector(".get_code");

	const check_code = document.querySelector(".check_code");
  	const check_code_button = document.querySelector(".check_code_button");

  	
	get_code.addEventListener("click",function(){
	console.log(email.value);
    $.ajax({
      url: "/getcode",
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
    url: "/checkcode", 
    type: "POST",
    data: { code: check_code.value},
    success: function(result) {
        console.log(result);
        },
    error: function(result) {
        console.log(result.responseText);
    }
});
  })
  