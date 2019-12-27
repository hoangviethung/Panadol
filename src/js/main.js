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

// CHỌN MÀU CHỮ
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
	$('.step-3').hide();
	$('.number-step-3').hide();
	$('.step-4').hide();
	$('.number-step-4').hide();

	// QUA BƯỚC 2
	$('.step-1 .button-next-step').on('click', function() {
		$('.step-1').hide(500);
		$('.number-step-1').hide(500);
		$('.step-2').show(500);
		$('.number-step-2').show(500);
	});

	// TRỞ VỀ BƯỚC 1
	$('.step-2 .button-prev-step').on('click', function() {
		$('.step-2').hide(500);
		$('.number-step-2').hide(500);
		$('.step-1').show(500);
		$('.number-step-1').show(500);
	});

	// TỚI BƯỚC 3
	$('.step-2 .button-next-step').on('click', function(e) {
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
				$('.step-2').hide(500);
				$('.step-3').show(500);
				$('.number-step-2').hide(500);
				$('.number-step-3').show(500);
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

	// TRỞ LẠI BƯỚC 2
	$('.step-3 .button-prev-step').on('click', function() {
		$('.step-3').hide(500);
		$('.step-2').show(500);
		$('.number-step-3').hide(500);
		$('.number-step-2').show(500);
	})

	// TỚI BƯỚC 4
	$('.step-3 .button-next-step').on('click', function() {
		$('.step-3').hide(500);
		$('.step-4').show(500);
		$('.number-step-3').hide(500);
		$('.number-step-4').show(500);
	})

	// TRỞ LẠI BƯỚC 3
	$('.step-4 .button-prev-step').on('click', function() {
		$('.step-4').hide(500);
		$('.step-3').show(500);
		$('.number-step-4').hide(500);
		$('.number-step-3').show(500);
	})
}

// HÌNH THỨC XUẤT HÌNH
function method_ExportPicture(params, _this) {

	const setImageUrlToShare = response => {
		const ImageUrlHiddenInput = document.getElementById('image-url');
		if (ImageUrlHiddenInput) {
			ImageUrlHiddenInput.value = window.location.protocol + "//" + window.location.host + response.Result;
		}
	}

	const getImageUrlToShare = () => {
		const ImageUrlHiddenInput = document.getElementById('image-url');
		if (ImageUrlHiddenInput) {
			const ImageUrlHiddenInputValue = ImageUrlHiddenInput.value;
			if (ImageUrlHiddenInputValue.length > 0) {
				return document.getElementById('image-url').value
			}
			return null;
		}
		return null;
	};

	// CÁC TRƯỜNG INPUT
	const provider = $('.list-share-social-media .item.checked').attr('data-provider');
	// URL GỬI DATA
	const _thisreal = _this;
	const url = _thisreal.attr('data-url');
	// LINK HÌNH
	const ImageURL = $('#download-hidden').attr('href');
	const name = $('#name').val();
	const email = $('#email').val();
	const block = ImageURL.split(";");
	const contentType = block[0].split(":")[1];
	const realData = block[1].split(",")[1];
	const blob = b64toBlob(realData, contentType);
	// AJAX GỬI DATA
	let formData = new FormData();
	formData.append('provider', provider);
	formData.append('name', name);
	formData.append('email', email);
	formData.append('img', blob, 'happy-new-year.png');
	// GỬI HÌNH
	if (params == 4) {
		ajaxFormSendMail();
	} else if (params == 1) {
		if (getImageUrlToShare() == null) {
			$.ajax({
				type: "POST",
				url: url,
				data: formData,
				processData: false,
				contentType: false,
				success: function(res) {
					if (res.Code == 200) {
						setImageUrlToShare(res);
						const fullUrl = "https://www.facebook.com/sharer/sharer.php?u=" + window.location.protocol + "//" + window.location.host + res.Result
						window.open(fullUrl, 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
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
		} else {
			const fullUrl = "https://www.facebook.com/sharer/sharer.php?u=" + getImageUrlToShare()
			window.open(fullUrl, '_blank');
		}
	} else if (params == 2) {

		if (getImageUrlToShare() == null) {
			$.ajax({
				type: "POST",
				url: url,
				data: formData,
				processData: false,
				contentType: false,
				// error: function() {
				// 	$.fancybox.open({
				// 		src: '#coppy-link',
				// 		type: 'inline',
				// 		opts: {
				// 			hash: false,
				// 			closeExisting: true,
				// 			touch: false,
				// 		}
				// 	})
				// 	$('#coppy-link input').val('ádasdasd');
				// 	$('#coppy-link button').on('click', function() {
				// 		var copyText = document.getElementById("link-final");
				// 		copyText.select();
				// 		copyText.setSelectionRange(0, 99999)
				// 		document.execCommand("copy");
				// 	})
				// },
				success: function(res) {
					if (res.Code == 200) {
						setImageUrlToShare(res);
						$.fancybox.open({
							src: '#coppy-link',
							type: 'inline',
							opts: {
								hash: false,
								closeExisting: true,
								touch: false,
							}
						})
						$('#coppy-link input').val(res.Result);
						$('#coppy-link button').on('click', function() {
							var copyText = document.getElementById("link-final");
							copyText.select();
							copyText.setSelectionRange(0, 99999)
							document.execCommand("copy");
						})
					} else {
						console.log("Gửi thất bại");
					}
				}
			});
		} else {
			$.fancybox.open({
				src: '#coppy-link',
				type: 'inline',
				opts: {
					hash: false,
					closeExisting: true,
					touch: false,
				}
			})
			$('#coppy-link input').val(getImageUrlToShare());
			$('#coppy-link button').on('click', function() {
				var copyText = document.getElementById("link-final");
				copyText.select();
				copyText.setSelectionRange(0, 99999)
				document.execCommand("copy");
			})
		}
	} else if (params == 3) {
		if (getImageUrlToShare() == null) {
			$.ajax({
				type: "POST",
				url: url,
				data: formData,
				processData: false,
				contentType: false,
				// error: function() {
				// 	$.fancybox.open({
				// 		src: '#coppy-link',
				// 		type: 'inline',
				// 		opts: {
				// 			hash: false,
				// 			closeExisting: true,
				// 			touch: false,
				// 		}
				// 	})
				// 	$('#coppy-link button').on('click', function() {
				// 		var copyText = document.getElementById("link-final");
				// 		copyText.select();
				// 		copyText.setSelectionRange(0, 99999)
				// 		document.execCommand("copy");
				// 	})
				// },
				success: function(res) {
					if (res.Code == 200) {
						setImageUrlToShare(res);
						$.fancybox.open({
							src: '#coppy-link',
							type: 'inline',
							opts: {
								hash: false,
								closeExisting: true,
								touch: false,
							}
						})
						$('#coppy-link input').val(res.Result);
						$('#coppy-link button').on('click', function() {
							var copyText = document.getElementById("link-final");
							copyText.select();
							copyText.setSelectionRange(0, 99999)
							document.execCommand("copy");
						})
					} else {
						console.log("Gửi thất bại");
					}
				}
			});
		} else {
			$.fancybox.open({
				src: '#coppy-link',
				type: 'inline',
				opts: {
					hash: false,
					closeExisting: true,
					touch: false,
				}
			})
			$('#coppy-link input').val(getImageUrlToShare());
			$('#coppy-link button').on('click', function() {
				var copyText = document.getElementById("link-final");
				copyText.select();
				copyText.setSelectionRange(0, 99999)
				document.execCommand("copy");
			})
		}
	} else if (params == 5) {
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

function clearImageUrlInputHidden() {
	$('.button-prev-step').on('click', function() {
		$('#image-url').val(null)
	})
}

function openCard() {
	$('.block-nhan-thiep').on('click', function() {
		$(this).addClass('close');
		$('.nhan-thiep .action').addClass('d-none');
		$('.nhan-thiep .block-img-final').addClass('open');
		$('.nhan-thiep .button-go-home').addClass('active');
	})
}

function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function eraseCookie(name) {
	document.cookie = name + '=; Max-Age=-99999999;';
}


function getInfoFromUrl() {
	var urlString = window.location.href;
	var url = new URL(urlString);

	var Source = url.searchParams.get('utm_source');
	var Medium = url.searchParams.get('utm_medium');
	var Campaign = url.searchParams.get('utm_campaign');
	var Term = url.searchParams.get('utm_term');
	var UTMContent = url.searchParams.get('tm_content');
	var fbclid = url.searchParams.get('fbclid');
	var gclid = url.searchParams.get('gclid');
	let Social, SocialId;

	if (fbclid) {
		Social = 'fbclid';
		SocialId = fbclid;
	} else if (gclid) {
		Social = 'gclid';
		SocialId = gclid;
	} else {
		Social = null
		SocialId = null;
	}
	if (Source || Medium || Campaign || Term || UTMContent || fbclid || gclid || Social || SocialId) {
		return {
			Source: Source,
			Medium: Medium,
			Campaign: Campaign,
			Term: Term,
			UTMContent: UTMContent,
			Social: Social,
			SocialId: SocialId
		}
	} else {
		return false;
	}
}

function convertInformationToB64(param) {
	return window.btoa(JSON.stringify(param));
}

// CHẠY KHI DOCUMENT SẴN SÀNG
document.addEventListener('DOMContentLoaded', () => {

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
		const _this = $(this);
		method_ExportPicture(method, _this)
	})
	// MỞ THIỆP
	openCard();
	clearImageUrlInputHidden();
	// COOKIE
	if (!getCookie('utm') && getInfoFromUrl()) {
		setCookie('utm', convertInformationToB64(getInfoFromUrl()), 1);
	}
	// document.cookie.split(';').forEach(cookie => {
	// 	console.log(cookie.substring(cookie.indexOf('=') + 1, cookie.length));
	// })
	// WOW JS
	new WOW().init();
});