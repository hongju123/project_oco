//비지니스 유저 카테고리

const category = document.querySelector(".category");
const house = document.querySelector(".house");
const food = document.querySelector(".food");
const bakery = document.querySelector(".bakery");
const car = document.querySelector(".car");
const another = document.querySelector(".another");
category.addEventListener("change",function(e){
    
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

            food.setAttribute("disabled","disabled");
            bakery.setAttribute("disabled","disabled");
            car.setAttribute("disabled","disabled");
            another.setAttribute("disabled","disabled");
            break;
            case "식당":
            console.log(e.target.value);
            house.classList.add("hidden");
            food.classList.remove("hidden");
            bakery.classList.add("hidden");
            car.classList.add("hidden");
            another.classList.add("hidden");
            food.removeAttribute("disabled");

            house.setAttribute("disabled","disabled");
            bakery.setAttribute("disabled","disabled");
            car.setAttribute("disabled","disabled");
            another.setAttribute("disabled","disabled");

            break;
            case "카페":
            console.log(e.target.value);
            house.classList.add("hidden");
            food.classList.add("hidden");
            bakery.classList.remove("hidden");
            car.classList.add("hidden");
            another.classList.add("hidden");
            bakery.removeAttribute("disabled");

            house.setAttribute("disabled","disabled");
            food.setAttribute("disabled","disabled");
            car.setAttribute("disabled","disabled");
            another.setAttribute("disabled","disabled");
            break;
        case "렌터카":
            console.log(e.target.value);
            house.classList.add("hidden");
            food.classList.add("hidden");
            bakery.classList.add("hidden");
            car.classList.remove("hidden");
            another.classList.add("hidden");
            car.removeAttribute("disabled");

            house.setAttribute("disabled","disabled");
            food.setAttribute("disabled","disabled");
            bakery.setAttribute("disabled","disabled");
            another.setAttribute("disabled","disabled");
            break;
        case "기타":
            console.log(e.target.value);
            house.classList.add("hidden");
            food.classList.add("hidden");
            bakery.classList.add("hidden");
            car.classList.add("hidden");
            another.classList.remove("hidden");
            another.removeAttribute("disabled");

            house.setAttribute("disabled","disabled");
            food.setAttribute("disabled","disabled");
            bakery.setAttribute("disabled","disabled");
            car.setAttribute("disabled","disabled");
            break;
        default : break;   
    }
})
//비지니스 끝 
//