const getForm = $("#getForm");
const getListURL = "/reservation/categorywrite";
	$(".get").on("click", function (e) {
		e.preventDefault()
		let category = $(this).attr("href");
		console.log(" category:",category)
		let url = getListURL;
		getForm.append("<input type='hidden' name='category' value='" + category + "'>")
		getForm.attr("action", url);
		getForm.attr("method", "get");
		getForm.submit();
	})