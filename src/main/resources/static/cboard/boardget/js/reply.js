/*
function f(){
	return {};
}
const replyService = f();
*/
const replyService = (function() {
	function insert(reply, callback) {
		console.log(reply.boardNum)
		$.ajax({
			type: "POST",
			url: "/reply/regist",
			data: JSON.stringify(reply),
			contentType: "application/json;charset=utf-8",
			dataType: "json",
			success: function(result, status, xhr) {
				callback(result);
			}
		});
	}

	function selectAll(data, callback) {
		let boardNum = data.boardNum;
		let pagenum = data.pagenum;

		$.getJSON(
			"/reply/pages/" + boardNum + "/" + pagenum,
			function(data) {
				//data : {replyCnt:댓글개수, list:[....]}
				callback(data.replyCnt, data.list);
			}
		)
	}

	function drop(replyNum, callback, error) {
		$.ajax({
			type: "DELETE",
			url: "/reply/" + replyNum,
			success: function(result, status, xhr) {
				callback(result);
			},
			error: function(xhr, status, err) {
				error(err);
			}
		})
	}

	function update(reply, callback, error) {
		$.ajax({
			type: "PUT",
			url: "/reply/" + reply.replyNum,
			data: JSON.stringify(reply),
			contentType: "application/json;charset=utf-8",
			success: function(result) {
				if (callback) {
					callback(result);
				}
			},
			error: function(err) {
				if (error) {
					error(err);
				}
			}
		})
	}

	function fmtTime(reply) {
		const regDate = reply.regDate;
		const updateDate = reply.updateDate;

		const now = new Date();

		const check = regDate == updateDate;

		const dateObj = new Date(check ? regDate : updateDate);
		//date객체.getTime() : date객체가 가지고 있는 시간 정보를 밀리초 단위로 추출
		let gap = now.getTime() - dateObj.getTime();

		let str = "";
		if (gap < 1000 * 60 * 60 * 24) {
			let hh = dateObj.getHours();
			let mi = dateObj.getMinutes();
			let ss = dateObj.getSeconds();
			str = (hh > 9 ? '' : '0') + hh + ":" + (mi > 9 ? '' : '0') + mi + ":" + (ss > 9 ? '' : '0') + ss;
		}
		else {
			let yy = dateObj.getFullYear();
			let mm = dateObj.getMonth() + 1;
			let dd = dateObj.getDate();

			str = (yy > 9 ? '' : '0') + yy + "/" + (mm > 9 ? '' : '0') + mm + ":" + (dd > 9 ? '' : '0') + dd;
		}
		return (check ? '' : '(수정됨) ') + str;
	}


	return { add: insert, getList: selectAll, remove: drop, modify: update, displayTime: fmtTime }
})();









