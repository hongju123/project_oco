	let i = /*[[${files.size()}]]*/'';
	let orgSize = i;

	let updateCheck = false;
	let uploadCheck = false;
	const updateCnt = $("#updateCnt");

	const orgName = document.getElementsByName("orgName");
	const org_thumbnail = {};

	for (let j = 0; j < orgName.length; j++) {
		org_thumbnail[orgName[j].value] = document.querySelector(".file" + j + "_cont .thumbnail")
	}
	let sysname = "";

	function cancelFile(name, systemName) {

		updateCnt.val(updateCnt.val() + "\\" + systemName)
		let num = name.split("e")[1];
		if (num == i) {
			return;
		}
		if (i != 0) {
			//tr지우기
			let temp = Number(name.split("e")[1]);
			//해당 행 지우기
			$(".r" + temp).remove();
			//지워진 다음 행 부터 숫자 바꿔주기
			for (let j = temp + 1; j <= i; j++) {
				const el = $("#boardForm tbody").find(".r" + j);
				el.attr("class", "r" + (j - 1) + " at");

				el.children('th').text("파일 첨부" + j);

				el.children('td').attr("class", "file" + (j - 1) + "_cont");

				const fileTag = el.find("input[type='file']");
				fileTag.attr("name", "files");
				fileTag.attr("id", "file" + (j - 1));

				el.find("span").attr("id", "file" + (j - 1) + "name");

				el.find("a")[0].href = "javascript:upload('file" + (j - 1) + "')"
				//el.find("a")[1].href = "javascript:cancelFile('file"+(j-1)+"','"+el.find("span").text()+"')"
				el.find("a")[1].href = decodeURI(el.find("a")[1].href.replace("'file" + j + "'", "'file" + (j - 1) + "'"));

			}
			i--;
		}
	}
	function upload(name, systemName) {
		let temp = $("#" + name + "name").text();
		num = Number(name.split("e")[1]);
		if (temp == '선택된 파일 없음') {
			$("#" + name).click();
		}
		else {
			updateCnt.val(updateCnt.val() + "\\" + systemName)
			sysname = systemName;
			$("#" + name).click();
		}
	}
	$("[name='files']").change(function (e) {
		const file = e.target.files[0];
		const fileTag = e.target;

		if (file == undefined) {
			if (!$("." + fileTag.id + "_cont [name='orgName']").val()) {
				//비어있던 곳에 파일이 업로드 되었다가 취소한 경우
				cancelFile(fileTag.id);
			}
			else {
				let n = orgName[num].value;
				let ext = n.split(".").pop();
				updateCnt.val(updateCnt.val().replaceAll("\\" + sysname, ""));
				$("#file" + num + "name").text(n);
				if (ext == 'jpeg' || ext == 'jpg' || ext == 'png' || ext == 'gif' || ext == 'webp') {
					$("." + fileTag.id + "_cont .thumbnail").remove();
					document.querySelector("." + fileTag.id + "_cont").appendChild(org_thumbnail[n]);
				}
				else {
					if (document.querySelector("." + fileTag.id + "_cont .thumbnail")) {
						$("." + fileTag.id + "_cont .thumbnail").remove();
					}
				}
				sysname = "";
			}
		}
		else {
			uploadCheck = true;
			//파일이 없었다가 업로드 한 경우
			//#file0name
			//업로드 된 파일의 확장자명
			let ext = file.name.split(".").pop();
			if (ext == 'jpeg' || ext == 'jpg' || ext == 'png' || ext == 'gif' || ext == 'webp') {
				$("#" + fileTag.id + "name").text(file.name);
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
				alert("사진 관련파일만 업로드 가능합니다")
				$(fileTag.val(""))
				if (temp != null) {
					temp.remove();
				}
			}
			//가장 마지막 파일 선택 버튼을 눌렀을 때
			if (num == i) {

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


				lastElement.find("a")[0].href = "javascript:upload('file" + i + "','')";
				lastElement.find("a")[1].href = "javascript:cancelFile('file" + i + "','선택된 파일 없음')"
			}
		}
	})