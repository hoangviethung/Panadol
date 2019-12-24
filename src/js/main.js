// import here !!!
import loading from './lib/loading';
import html2canvas from "html2canvas";

// CONTROL SVG
function SVG() {
	jQuery('img.svg').each(function() {
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');

			// Add replaced image's ID to the new SVG
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
			}

			// Replace image with new SVG
			$img.replaceWith($svg);

		}, 'xml');
	});
}

const clickGoTop = () => {
	let goTopButton = document.getElementById('button-to-top');
	if (goTopButton) {
		goTopButton.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		})
	}
}

function sliderBigIMG() {
	var slideBigIMG = new Swiper('.index-3 .swiper-container', {
		autoHeight: true, //enable auto height
		speed: 1000,
		loop: true,
		autoplay: {
			delay: 3000,
		},
		// Navigation arrows
		navigation: {
			nextEl: '.index-3 .swiper-button-next',
			prevEl: '.index-3 .swiper-button-prev',
		}
	});
}

function scrollMenu() {
	$('.list-nav .nav-item .link').on('click', function() {
		$('body').removeClass('disabled');
		$('.overlay').removeClass('active');
		$('.list-nav').removeClass('active');
		$('.button-mobile').removeClass('active');
		$(this).addClass('active');
		$('.list-nav .nav-item .link').not(this).removeClass('active')
		let url = $(this).attr('data-href');
		$('html, body').animate({
			scrollTop: $(url).offset().top - 100
		}, 1000);
	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > ($('#index-2').offset().top) - 200) {
			$('.link[data-href="#index-2"]').addClass('active');
			$('.link[data-href="#index-1"]').removeClass('active');
		} else {
			$('.link[data-href="#index-1"]').addClass('active');
			$('.link[data-href="#index-2"]').removeClass('active');
		}
	});
}

function chooseContentDefault() {
	// CHỌN TEXT MẶC ĐỊNH TỪ ĐẦU
	var textDefault = $('.choose-to-write .item.checked').text();
	$('.write textarea').html(textDefault);

	$('.choose-to-write .item').on('click', function() {
		// RESET KHI CHỌN TEXT
		$('.write textarea').val('');
		// CHECKED
		$(this).addClass('checked');
		$('.choose-to-write .item').not(this).removeClass('checked');
		// NỘI DUNG TEXT MẪU
		textDefault = $(this).text();
		// SET NỘI DUNG VÀO BOX WRITE
		$('.write textarea').val(textDefault);
		showContent();
	});
}

// CHỌN MÀY CHỮ
function chooseColorContent() {
	$('.write .list-bottom .color-content span').on('click', function() {
		$(this).addClass('checked');
		$('.write .list-bottom .color-content span').not(this).removeClass('checked');

		if ($(this).attr('data-bg') == "white") {
			$('.result-img figcaption p').addClass('red');
		} else {
			$('.result-img figcaption p').removeClass('red');
		}
	})
}

// SHOW MENU IN MOBILE
function showMenuMobile() {
	$('.button-mobile').on('click', function() {
		$(this).toggleClass('active');
		$(this).siblings('.list-nav').toggleClass('active');
		$('body').toggleClass('disabled');
		$('.overlay').toggleClass('active');
	});

	$('.overlay').on('click', function() {
		$(this).removeClass('active');
		$('.list-nav').removeClass('active');
		$('body').removeClass('disabled');
		$('.button-mobile').toggleClass('active');
	});
}

// HIỆN KẾ QUẢ CHỌN THIỆP
function showContent() {
	var result = $('.write textarea').val();
	$('.result figure figcaption p').html(result);

	$('.write textarea').on('keyup', function() {
		result = $(this).val();
		$('.result figure figcaption p').html(result);
	});
}

function getDataProvider() {
	$('.list-share-social-media .item').on('click', function() {
		$(this).addClass('checked');
		$('.list-share-social-media .item').not(this).removeClass('checked');
	})
}

function b64toBlob(b64Data, contentType, sliceSize) {
	contentType = contentType || '';
	sliceSize = sliceSize || 512;

	var byteCharacters = atob(b64Data);
	var byteArrays = [];

	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize);

		var byteNumbers = new Array(slice.length);
		for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		var byteArray = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

	var blob = new Blob(byteArrays, {
		type: contentType,
	});
	return blob;
}

// XUẤT HÌNH
function exportPicture() {

	$('.step-2').hide();
	$('.number-step-2').hide();
	// QUA BƯỚC 2
	$('.step-1 .button-next-step').on('click', function(e) {
		const result = new Promise((resolve) => {
			let widthX = $('#img-final').width();
			let heightX = $('#img-final').height();
			let widthY = $(window).width();
			let heightY = $(window).height();
			let offsetTop = $('#img-final').offset().top;
			let offsetLeft = $('#img-final').offset().left;
			html2canvas(document.querySelector("#img-final"), {
				windowWidth: widthY,
				windowHeight: heightY,
				width: widthX,
				heihgt: heightX,
				x: offsetLeft,
				y: offsetTop

			}).then((canvas) => {
				let imgBase64 = canvas.toDataURL("image/png");
				$('.step-1').hide(500);
				$('.step-2').show(500);
				$('.number-step-1').hide(500);
				$('.number-step-2').show(500);
				if ($('html').width() <= 768) {
					$('html, body').animate({
						scrollTop: $('#index-2').offset().top - 100
					}, 1000);
				}
				resolve(imgBase64);
			})
		})

		result.then(imageCanvas => {
			const ImageURL = imageCanvas;
			document.querySelector("#download-hidden").setAttribute("href", ImageURL);
		})
	});
	// TRỞ LẠI BƯỚC 1
	$('.step-2 .button-prev-step').on('click', function() {
		$('.step-2').hide(500);
		$('.step-1').show(500);
		$('.number-step-2').hide(500);
		$('.number-step-1').show(500);
	})
}

// HÌNH THỨC XUẤT HÌNH
function method_ExportPicture(params) {
	// CÁC TRƯỜNG INPUT
	const provider = $('.list-share-social-media .item.checked').attr('data-provider');
	// URL GỬI DATA
	const url = $(this).attr('data-url');
	// LINK HÌNH
	const ImageURL = $('#download-hidden').attr('href');
	const block = ImageURL.split(";");
	const contentType = block[0].split(":")[1];
	const realData = block[1].split(",")[1];
	const blob = b64toBlob(realData, contentType);
	// AJAX GỬI DATA
	let formData = new FormData();
	formData.append('provider', provider);
	formData.append('img', blob, 'happy-new-year.png');
	// GỬI HÌNH
	if (params === "sendMail") {
		ajaxFormSendMail();
	} else if (params === "facebook") {
		$.ajax({
			type: "POST",
			url: url,
			data: formData,
			processData: false,
			contentType: false,
			success: function(res) {
				if (res.Code == 200) {
					const fullUrl = "https://www.facebook.com/sharer/sharer.php?u=" + window.location.protocol + "//" + window.location.host + res.Result
					$("#facebook-share").append(`<a href=${fullUrl} target="_blank"></a>`)
					window.open(fullUrl)
				} else {
					$('#thong-bao h3').html(res.Message);
					$.fancybox.open({
						src: '#thong-bao',
						type: 'inline',
						opts: {
							hash: false,
							closeExisting: true,
						}
					})
				}
			}
		});
	} else if (params === "messenger") {
		$.ajax({
			type: "POST",
			url: url,
			data: formData,
			processData: false,
			contentType: false,
			success: function(res) {
				if (res.Code == 200) {
					console.log("Gửi thành công" + res.Result);
				} else {
					console.log("Gửi thất bại" + res.Result);
				}
			}
		});
	} else if (params === "zalo") {
		$.ajax({
			type: "POST",
			url: url,
			data: formData,
			processData: false,
			contentType: false,
			success: function(res) {
				if (res.Code == 200) {
					console.log("Gửi thành công" + res.Result);
				} else {
					console.log("Gửi thất bại" + res.Result);
				}
			}
		});
	} else if (params === "download") {
		document.querySelector("#download-hidden").click()
	}
}

// SUBMIT FORM SEND MAIL
function ajaxFormSendMail() {
	$('#send-mail button').on('click', function() {
		// CÁC TRƯỜNG INPUT
		const provider = $('.list-share-social-media .item.checked').attr('data-provider');

		const formTo = $('#send-mail #formTo').val();
		const formTitle = $('#send-mail #formTitle').val();
		const formContent = $('#send-mail #formContent').val();

		const ImageURL = $('#download-hidden').attr('href');
		const block = ImageURL.split(";");
		// Get the content type
		const contentType = block[0].split(":")[1];
		const realData = block[1].split(",")[1];

		const blob = b64toBlob(realData, contentType);
		// URL GỬI DATA
		const url = $(this).attr('data-url');
		// AJAX GỬI DATA
		let formData = new FormData();
		formData.append('provider', provider);
		formData.append('formTo', formTo);
		formData.append('formTitle', formTitle, );
		formData.append('formContent', formContent, );
		formData.append('img', blob, 'happy-new-year.png');
		$.ajax({
			type: "POST",
			url: url,
			data: formData,
			processData: false,
			contentType: false,
			// error: function(err) {
			// 	$('#thong-bao h3').html('Đã gửi thiệp');
			// 	$.fancybox.open({
			// 		src: '#thong-bao',
			// 		type: 'inline',
			// 		opts: {
			// 			hash: false,
			// 			closeExisting: true,
			// 		}
			// 	})
			// 	window.open("nhan-thiep.html", '_blank')
			// },
			success: function(res) {
				if (res.Code === 200) {
					$('#thong-bao h3').html(res.Message);
					$.fancybox.open({
						src: '#thong-bao',
						type: 'inline',
						opts: {
							hash: false,
							closeExisting: true,
						}
					})
				} else {
					$('#thong-bao h3').html(res.Message);
					$.fancybox.open({
						src: '#thong-bao',
						type: 'inline',
						opts: {
							hash: false,
							closeExisting: true,
						}
					})
				}
			}
		});
	});
}

function openCard() {
	$('.block-img-final').hide();
	$('.block-nhan-thiep').on('click', function() {
		$(this).hide(500);
		$('.nhan-thiep .action').hide(500);
		$('.block-img-final').show(1000);
	})
}

// CHẠY KHI DOCUMENT SẴN SÀNG
document.addEventListener('DOMContentLoaded', () => {
	// WOW JS
	new WOW().init();
	// LOADING
	loading().then(() => {
		// FANCYBOX
		setTimeout(() => {
			// $('#fancyboxOninit').trigger('click');
		}, 3000);
	});
	// SVG CONTROL
	SVG();
	// MENU
	scrollMenu();
	clickGoTop();
	// CHỌN CÂU CHÚC MẶC ĐỊNH
	chooseContentDefault();
	// CHỌN MÀU CHO CHỮ KẾ QUẢ
	chooseColorContent();
	// SHOW CONTENT
	showContent();
	// GET DATA PROVIDER
	getDataProvider();
	// MENU MOBILE
	showMenuMobile();
	// SLIDER
	sliderBigIMG();
	// XUẤT HÌNH
	exportPicture();
	// HÌNH THỨC XUẤT HÌNH
	$(".list-share-social-media .item").on("click", function() {
		let method = $(this).attr("data-provider");
		method_ExportPicture(method)
	})
	// MỞ THIỆP
	openCard();
});