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

function fancyboxOninit() {
	$('#fancyboxOninit').trigger('click');
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

function sliderChooseCard() {
	// SLIDE CHỌN CARD
	var slideChooseCard = new Swiper('.slider-choose-card .swiper-container', {
		observer: true,
		observeParents: true,
		simulateTouch: false,
		slidesPerView: 4,
		spaceBetween: 10,
		// Navigation arrows
		navigation: {
			nextEl: '.slider-choose-card .swiper-button-next',
			prevEl: '.slider-choose-card .swiper-button-prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 5,
			},
			1024: {
				slidesPerView: 6,
			},
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

function chooseCard() {
	$('.slider-choose-card figure').on('click', function() {
		$(this).addClass('checked');
		$('.slider-choose-card .swiper-slide figure').not(this).removeClass('checked');
	})
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
		console.log(result);
		$('.result figure figcaption p').html(result);
	});
}

function getDataProvider() {
	$('.list-share-social-media .item').on('click', function() {
		$(this).addClass('checked');
		$('.list-share-social-media .item').not(this).removeClass('checked');
	})
}

// SUBMIT FORM
function ajaxForm() {
	$('#send-mail button').on('click', function() {
		// CÁC TRƯỜNG INPUT
		const provider = $('.list-share-social-media .item.checked').attr('data-provider');
		const formTo = $('#send-mail #formTo').val();
		const formTitle = $('#send-mail #formTitle').val();
		const formContent = $('#send-mail #formContent').val();
		const img = 'test';
		// URL GỬI DATA
		const url = $(this).attr('data-url');
		// AJAX GỬI DATA
		$.ajax({
			type: "POST",
			url: url,
			data: {
				provider: provider,
				formTo: formTo,
				formTitle: formTitle,
				formContent: formContent,
				img: img,
			},
			dataType: "JSON",
			error: function(err) {
				$('#thong-bao h3').html('Đã gửi thiệp');
				$.fancybox.open({
					src: '#thong-bao',
					type: 'inline',
					opts: {
						hash: false,
						closeExisting: true,
					}
				})
				window.open("nhan-thiep.html", '_blank')
			},
			success: function(res) {
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
		});
	});
}

// CÁC BƯỚC NHẬP THIỆP
function step_by_step() {

	$('.step-2').hide();
	$('.number-step-2').hide();

	// BẤM NEXT QUA BƯỚC 2
	$('.step-1 .button-next-step').on('click', function() {
		$('.step-1').hide(500);
		$('.step-2').show(500);
		$('.number-step-1').hide(500);
		$('.number-step-2').show(500);
		if ($('html').width() <= 768) {
			$('html, body').animate({
				scrollTop: $('#index-2').offset().top - 100
			}, 1000);
		}
	});
}

// XUẤT HÌNH
function getIMG() {
	$('.step-2 .item.download').one('click', function(e) {
		console.log('clicked');

		html2canvas(document.querySelector("#img-final"), {
			width: 440,
			height: 440,
			backgroundColor: 'transparent'
		}).then(canvas => {
			document.querySelector(".result-img").appendChild(canvas)
			console.log(canvas);

		});
	});
}

// CHẠY KHI DOCUMENT SẴN SÀNG
document.addEventListener('DOMContentLoaded', () => {

	// WOW JS
	new WOW().init();
	// LOADING
	loading().then(() => {
		setTimeout(() => {
			fancyboxOninit();
		}, 3000);
		// FANCYBOX
	});
	// SVG CONTROL
	SVG();
	// MENU
	scrollMenu();
	clickGoTop();
	// CHOOSE CARD
	chooseCard();
	// CHỌN CÂU CHÚC MẶC ĐỊNH
	chooseContentDefault();
	// CHỌN MÀU CHO CHỮ KẾ QUẢ
	chooseColorContent();
	// SHOW CONTENT
	showContent();
	// GET DATA PROVIDER
	getDataProvider();
	// AJAX FORM
	ajaxForm();
	// MENU MOBILE
	showMenuMobile();
	// SLIDER
	sliderBigIMG();
	sliderChooseCard();
	// CÁC BƯỚC CHỌN THIỆP
	step_by_step();
	// XUẤT HÌNH
	getIMG();
});