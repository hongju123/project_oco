const area = {
	"전체": [],
	"숙소": ["모든 숙소", "모텔", "호텔", "펜션", "에어비앤비", "캠핑장"],
	"카페": ["모든 카페", '개인', '프랜차이즈', '베이커리', '디저트'],
	"식당": ["모든 식당", '한식', '일식', '중식', '분식', '야식'],
	"렌터카": ["모든 렌터카", '경형/소형', '중형,대형', 'SUV/승합'],
	"기타": ['회의실', '파티룸']
}


function selectCategory_main() {
	if (category_list_on !== "main") {
		const category_list = document.createElement("li")
		while (category_list_create.lastChild) {
			category_list_create.removeChild(category_list_create.lastChild)
		}
		modal.style.display = "flex"
		body.style.display = "inline"
		category_list.className = "category_list"
		category_list_create.appendChild(category_list)

		if (category_list.children.length === 0) {
			for (let key in area) {
				const ul_1 = document.createElement('li')
				ul_1.innerHTML = key
				ul_1.className = "category_2"
				category_list.appendChild(ul_1)

				if (ul_1.innerHTML == "전체") {
					ul_1.addEventListener("click", function() {
						category_main.setAttribute("value", key)
						category_select()
						modal.style.display = "none"
						body.style.display = "none"

						while (category_list.lastChild) {
							category_list.removeChild(category_list.lastChild)
						}
						while (category_list_create.lastChild) {
							category_list_create.removeChild(category_list_create.lastChild)
							category_list_on = null
						}
					})
				}
				ul_1.addEventListener("click", function() {
					if (ul_1.children.length == 0) {
						for (let detail of area[key]) {
							const li_2 = document.createElement("li")
							li_2.innerHTML = detail
							li_2.className = "category_2_detail"
							ul_1.appendChild(li_2)
							li_2.addEventListener("click", function() {
								category_main.setAttribute("value", key + "/" + detail)
								category_select()
								modal.style.display = "none"
								body.style.display = "none"


								while (category_list.lastChild) {
									category_list.removeChild(category_list.lastChild)
								}
								while (category_list_create.lastChild) {
									category_list_create.removeChild(category_list_create.lastChild)
									category_list_on = null
								}
							})
						}
					}
					else {
						while (ul_1.lastChild && ul_1.lastChild !== ul_1.firstChild) {
							ul_1.removeChild(ul_1.lastChild)
						}
					}
				})
			}
		}
		else {
			while (category_list.lastChild) {
				category_list.removeChild(category_list.lastChild)
			}
		}
		category_list_on = "main"
	} else {
		if (category_list_create.lastChild) {
			category_list_create.removeChild(category_list_create.lastChild)
		}
		category_list_on = null
	}
}

