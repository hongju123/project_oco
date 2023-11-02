const choose_pw = document.querySelector(".choose_pw");
const choose_id = document.querySelector(".choose_id");
const id_form = document.querySelector(".id_form");
const password_form = document.querySelector(".password_form");

choose_id.addEventListener("click", function(){
    choose_id.classList.add("color");
    choose_pw.classList.remove("color")
    id_form.classList.remove("hidden")
    password_form.classList.add("hidden")
})
choose_pw.addEventListener("click", function(){
    choose_pw.classList.add("color")
    id_form.classList.add("hidden");
    choose_id.classList.remove("color")
    password_form.classList.remove("hidden")
})


