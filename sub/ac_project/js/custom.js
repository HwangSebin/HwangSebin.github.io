	//버튼의 참조값 얻어오기
	var sendBtn = $('sendBtn');
	//버튼을 눌렀을때 실행할 함수 등록하기
	sendBtn.addEventListener("click",function () {
		var msg = $("inputMsg").value;
		console.log(msg);
	});