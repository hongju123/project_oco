// 마커 위에 커스텀오버레이를 표시합니다
										// 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
										/*var overlay = new kakao.maps.CustomOverlay({
											map: map,
											position: marker.getPosition(),  //마커 포지션
										});


										overlay.setMap(null); // 처음에는 지워둠
										clickOverlay = null;

										kakao.maps.event.addListener(marker, 'click', function () { // 마커를 클릭 했을때만 지움
											if (clickOverlay != null) {

												clickOverlay.setMap(null);
											}
											overlay.setMap(map)
											clickOverlay = overlay;
										});

										var info_wrap = document.createElement('div');
										info_wrap.className = 'info_wrap';

										var info = document.createElement('div');
										info.className = 'info';
										var title = document.createElement('div');
										title.className = 'title';
										title.innerHTML = use.businessStoreName
										var close = document.createElement('div');
										close.id = 'close';
										close.title = '닫기';
										close.onclick = function () {overlay.setMap(null);};

										var body = document.createElement('div');
										body.className = 'body';
										var img = document.createElement('div');
										img.className = 'img';
										var picture = document.createElement('img');
										picture.src = 'img/숙소.png';
										picture.style.cssText = "width:73px; height:70px";

										var desc = document.createElement('div');
										desc.className = 'desc';
										var ellipsis = document.createElement('div');
										ellipsis.className = 'ellipsis';
										ellipsis.innerHTML = use.businessAddress;
										var jibun = document.createElement('div');
										jibun.className = 'jibun ellipsis';
										jibun.innerHTML = use.businessAddress

										var in_a = document.createElement('div');
										var link = document.createElement('a');
										link.innerHTML = "개인 페이지"
										link.className = 'link';
										link.href = '#';



										info_wrap.appendChild(info).appendChild(title).append(close)
										info.appendChild(body).appendChild(img).appendChild(picture)
										body.appendChild(desc).appendChild(ellipsis)
										body.appendChild(desc).appendChild(jibun)
										body.appendChild(desc).appendChild(in_a).appendChild(link)





										overlay.setContent(info_wrap);*/