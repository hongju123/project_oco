
const replyService = (function() {

	function insert(reply, callback) {
		console.log(reply)
		$.ajax({
			method: "POST",
			url: "/Bboard/insertReply",
			data: JSON.stringify(reply),
			contentType: "application/json;charset=utf-8",
			success: function(result, status, xhr) {
				callback(result);
			}
		});
	}

	function selectAll(data, callback) {
		let boardnum = data.boardNum
		let pagenum = data.pagenum;
		$.ajax({
			method: "GET",
			url: "/Bboard/replyPages",
			data: { "boardNum": boardnum, "pagenum": pagenum },
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				callback(data.replyCnt, data.list);
			}
		})
	}

	function drop(replynum,businessInfoIdx, callback, error) {
		$.ajax({
			type: "GET",
			url: "/Bboard/deletereply",
			data: { "replynum": replynum,"businessInfoIdx":businessInfoIdx },
			success: function(result) {
				callback(result)
			},
			error: function(xhr, status, err) {
				error(err);
			}
		})
	}

	function update(reply, callback, error) {
		console.log(reply)
		$.ajax({
			type: "POST",
			url: "/Bboard/replyUpdate",
			data: JSON.stringify(reply),
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(callback){
					callback(data);
				}
			},
			error:function(err){
				if(error){
					error(err)
				}
			}
		})
	}

	function fmtTime(reply) {
	
		const regdate = reply.regDate;
		const updatedate = reply.updateDate;

		const now = new Date();

		const check = regdate == updatedate;

		const dateObj = new Date(check ? regdate : updatedate);

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
			let mm = dateObj.getMonth();
			let dd = dateObj.getDate();

			str = (yy > 9 ? '' : '0') + yy + "/" + (mm > 9 ? '' : '0') + mm + ":" + (dd > 9 ? '' : '0') + dd;
		}
		return (check ? '' : '(수정됨) ') + str;
	}
	return { add: insert, getList: selectAll, remove: drop, modify: update, displayTime: fmtTime }
})();