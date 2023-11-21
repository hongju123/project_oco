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
// original 
let i = 0;
	function upload(name) {
		$("#" + name).click();
	}
	$("[type='file']").change(function (e) {

		const file = e.target.files[0];
		const fileTag = e.target;

		if (file == undefined) {
			cancelFile(fileTag.id);
		}
		else {
			$("#" + fileTag.id + "name").text(file.name);

			let ext = file.name.split(".").pop();
			if (ext == 'jpeg' || ext == 'jpg' || ext == 'png' || ext == 'gif' || ext == 'webp') {
				$("." + fileTag.id + "_cont .thumbnail").remove();
				const reader = new FileReader();

				reader.onload = function (ie) {
					const img = document.createElement("img");
					img.setAttribute("src", ie.target.result)
					img.setAttribute("class", "thumbnail");
					document.querySelector("." + fileTag.id + "_cont").appendChild(img);
				}
				reader.readAsDataURL(file);
			}
			else {
				const temp = $("." + fileTag.id + "_cont .thumbnail");
				if (temp != null) {
					temp.remove();
				}
			}

			if (fileTag.id.split("e")[1] == i) {
				const cloneElement = $(".r" + i).clone(true);
				i++;
				cloneElement.appendTo("#boardForm tbody")
				const lastElement = $("#boardForm tbody").children().last();

				lastElement.attr("class", "r" + i + " at");
				lastElement.children("th").text("파일 첨부" + (i + 1));
				lastElement.children("td").attr("class", "file" + i + "_cont");

				lastElement.find("input[type='file']").attr("name", "files");
				lastElement.find("input[type='file']").attr("id", "file" + i);
				lastElement.find("input[type='file']").val("");

				lastElement.find("span").attr("id", "file" + i + "name");
				lastElement.find("span").text("선택된 파일 없음");

				lastElement.find("a")[0].href = "javascript:upload('file" + i + "')";
				lastElement.find("a")[1].href = "javascript:cancelFile('file" + i + "')"
			}

		}
	})

	function cancelFile(name) {

		if (name.split("e")[1] == i) { return; }

		if (i != 0) {

			let temp = Number(name.split("e")[1]);

			$(".r" + temp).remove();

			for (let j = temp + 1; j <= i; j++) {
				const el = $("#boardForm tbody").find(".r" + j);
				el.attr("class", "r" + (j - 1) + " at");

				el.children('th').text("파일 첨부" + j);

				el.children('td').attr("class", "file" + (j - 1) + "_cont");

				const fileTag = el.find("input[type='file']");
				fileTag.attr("name", "file" + (j - 1));
				fileTag.attr("id", "file" + (j - 1));

				el.find("span").attr("id", "file" + (j - 1) + "name");

				el.find("a")[0].href = "javascript:upload('file" + (j - 1) + "')"
				el.find("a")[1].href = "javascript:cancelFile('file" + (j - 1) + "')"

			}
			i--;
		}
	}

	function sendit() {
		const boardForm = document.querySelector("#boardForm");
		const boardtitle = document.querySelector(".board_title");
		const topic = document.querySelector(".topic")
		const category = document.querySelector(".category");
		const boardcontents = boardForm.querySelector(".boardContents");
		console.log("topic 값은:"+topic.value);
		
        if (boardtitle.value == "") {
            alert("제목을 입력하세요.");
            boardtitle.focus();
            boardtitle.classList.add("falseAction");
            setTimeout(function(){
                boardtitle.classList.remove("falseAction");
            }, 1000);
            return false;
        }
        
		if (topic.value=="topicNull") {
			alert("주제를 입력하세요")
			topic.focus()
			topic.classList.add("falseAction");
			setTimeout(function(){topic.classList.remove("falseAction")},1000)
			return false;
		}
		console.log(category.value);
		if(category.value=="categoryNull"){
			alert("카테고리를 입력하세요")
			category.focus()
			category.classList.add("falseAction");
			setTimeout(function(){category.classList.remove("falseAction")},1000)
			return false;
			
		}

		if (boardcontents.value == "") {
			alert("내용을 입력하세요.");
			boardcontents.focus();
			boardcontents.classList.add("falseAction");
			setTimeout(function(){boardcontents.classList.remove("falseAction")},1000)
			return false;
		}
		 
		boardForm.submit();
	}
	//textarea 크기 자동조절
	function resize(obj) {
    obj.style.height = '1px';
    obj.style.height = (12 + obj.scrollHeight) + 'px';
	}
// original end