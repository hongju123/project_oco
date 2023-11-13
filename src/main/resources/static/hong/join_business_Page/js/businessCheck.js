
const key = "HTGFYOwV3ffXzvYq15llpnJAyw%2B5n6RpMMjvmxOFkU%2F%2BFoSM0V6%2B99PoopsQqwZJPdXNyrYsc8FfiQLVGmur4g%3D%3D";
const key_url = `https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${key}`;

function onCheck(e){
  const business_represent = document.querySelector(".business_represent");
  const business_date = document.querySelector(".business_date");
  const check_business_num = document.querySelector(".check_business_num");
  const check_business = document.querySelector(".check_business");
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
          console.log(result.data[0].valid)
          if (result.data[0].valid==2) {
            const businessAlarming = document.querySelector(".businessAlarming");
            check_business.classList.remove("checkBox");
            check_business.classList.remove("ani");
            check_business.value = "확인";
            businessAlarming.classList.remove("hidden");
            check_business.classList.add("falseAction");
            setInterval(function(){
              check_business.classList.remove("falseAction");
            },1000)
          } else{
            check_business.value = "✅";
            business_represent.setAttribute("readonly","readonly")
            business_date.setAttribute("readonly","readonly")
            check_business_num.setAttribute("readonly","readonly")
            check_business.classList.add("checkBox");
            check_business.classList.add("ani");
            businessAlarming.classList.add("hidden");
          }
            
        },
      error: function(result) {
          const businessAlarming = document.querySelector(".businessAlarming");
          check_business.classList.remove("checkBox");
          check_business.classList.remove("ani");
          check_business.classList.add("falseAction");
          setInterval(function(){
            check_business.classList.remove("falseAction");
          },1000)
          check_business.value = "확인";
          businessAlarming.classList.remove("hidden");
      }
  });
}