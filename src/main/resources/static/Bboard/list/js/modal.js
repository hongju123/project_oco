	const closebtn = document.querySelector(".close_area")

	closebtn.addEventListener("click", e => {
		modal.style.display = "none"
		if (category_list_create.lastChild) {
			while (category_list_create.lastChild) {
				category_list_create.removeChild(category_list_create.lastChild)
			}
			category_list_on = null
		}
	})
	modal.addEventListener("click", e => {
		const evTarget = e.target
		if (evTarget.classList.contains("modal")) {
			modal.style.display = "none"
			if (category_list_create.lastChild) {
				while (category_list_create.lastChild) {
					category_list_create.removeChild(category_list_create.lastChild)
				}
				category_list_on = null
			}
		}
	})