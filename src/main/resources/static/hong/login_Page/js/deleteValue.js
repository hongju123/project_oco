const delete_innerText = document.querySelectorAll(".delete_innerText");

delete_innerText.forEach(data => {
    data.addEventListener("click", function(e) {
        e.preventDefault();
        e.target.previousElementSibling.value = "";
    });
});
