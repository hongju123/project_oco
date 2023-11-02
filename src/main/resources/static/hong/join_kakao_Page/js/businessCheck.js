
const key = "HTGFYOwV3ffXzvYq15llpnJAyw%2B5n6RpMMjvmxOFkU%2F%2BFoSM0V6%2B99PoopsQqwZJPdXNyrYsc8FfiQLVGmur4g%3D%3D";
const key_url = `https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${key}`;


function onCheck(){
  const business_represent = document.querySelector(".business_represent")
  const business_date = document.querySelector(".business_date")
  const check_business_num = document.querySelector(".check_business_num")
	console.log(check_business_num.value)
  const data = {
      "businesses": [
          {
              "b_no": check_business_num.value,
              "start_dt": business_date.value,
              "p_nm": business_represent.value,
              "p_nm2": "",
              "b_nm": "",
              "corp_no": "",
              "b_sector": "",
              "b_type": "",
              "b_adr": ""
          }
      ]
  };
  
  
  $.ajax({
      url: key_url,
      type: "POST",
      data: JSON.stringify(data),
      dataType: "JSON",
      contentType: "application/json",
      success: function(result) {
          console.log(result);
      },
      error: function(result) {
          console.log(result.responseText);
      }
  });
}