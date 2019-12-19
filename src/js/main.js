// import here !!!
import loading from './lib/loading';
import mapping from "./lib/mapping";

// Script Cho Tab
class Tab {
	selector;
	titleList;
	contentList;

	constructor(selector) {
		this.selector = document.querySelector(selector);
		if (this.selector) {
			this.titleList = this.selector.querySelectorAll("[toggle-for]")
			this.contentList = this.selector.querySelectorAll("[tab-id]")
			this.init();
		}
	}

	runTabWhenClicked() {
		Array.prototype.forEach.call(this.titleList, (element, index) => {
			element.addEventListener("click", e => {
				e.preventDefault();
				const tabTarget = element.attributes["toggle-for"].value;
				const targetDOM = this.selector.querySelector(`[tab-id='${tabTarget}']`);
				element.classList.add("active");
				Array.prototype.forEach.call(this.titleList, (eleClicked, eleClickedIndex) => {
					if (eleClickedIndex != index) {
						eleClicked.classList.remove("active")
					}
				});
				Array.prototype.forEach.call(this.contentList, (tabContentElement) => {
					if (tabContentElement.attributes["tab-id"].value != tabTarget) {
						tabContentElement.style.display = "none"
						tabContentElement.classList.remove("show")
					}
				});
				targetDOM.style.display = "block",
					setTimeout(() => {
						targetDOM.classList.add("show")
					}, 50);
			})
		})
	}

	activeFirstTab() {
		this.titleList[0].click();
	}

	init() {
		this.runTabWhenClicked();
		this.activeFirstTab();
	}
}

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
	$('#fancyboxOninit').trigger('click')
}

function sliderBigIMG() {
	var slideBigIMG = new Swiper('.index-3 .swiper-container', {
		speed: 1000,
		autoplay: {
			delay: 10000,
		},
		// Navigation arrows
		navigation: {
			nextEl: '.index-3 .swiper-button-next',
			prevEl: '.index-3 .swiper-button-prev',
		},
		// on: {
		// 	slideChangeTransitionEnd: function() {
		// 		// VDIEO CHẠY
		// 		const video = document.querySelector('.index-3 .swiper-container .swiper-slide-active video');
		// 		// VIDEO DỪNG
		// 		const pause_video = document.querySelector('.index-3 .swiper-container .swiper-slide video');
		// 		if (video) {
		// 			video.play();
		// 		} else {
		// 			pause_video.pause();
		// 		}
		// 	}
		// }
	});
}

function sliderChooseCard() {
	// SLIDE CHỌN CARD
	var slideChooseCard = new Swiper('.slider-choose-card .swiper-container', {
		observer: true,
		observeParents: true,
		simulateTouch: false,
		slidesPerView: 4,
		spaceBetween: 8,
		// Navigation arrows
		navigation: {
			nextEl: '.slider-choose-card .swiper-button-next',
			prevEl: '.slider-choose-card .swiper-button-prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 5,
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
		let url = $(this).attr('data-href');
		$('html, body').animate({
			scrollTop: $(url).offset().top - 123 // Means Less header height
		}, 1000);
	});
}

function chooseIMG() {
	// CHỌN HÌNH MẶC ĐỊNH TỪ ĐẦU
	var imgUrl = $('.choose-image .list-item .item').find('img').attr('src');
	$('.result-choose-img figure img').attr('src', imgUrl);

	$('.choose-image .list-item .item').on('click', function() {
		// CHỌN HÌNH
		$(this).addClass('checked');
		$('.choose-image .list-item .item').not(this).removeClass('checked');
		// ĐỔI HÌNH Ở BLOCK KẾT QUẢ
		imgUrl = $(this).find('img').attr('src');
		$('.result-choose-img figure img').attr('src', imgUrl);
	})
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
	});
}

function chooseBackground() {
	$('.write .list-bottom .color-content span').on('click', function() {
		$(this).addClass('checked');
		$('.write .list-bottom .color-content span').not(this).removeClass('checked');

		if ($(this).attr('data-bg') == "white") {
			$('.result-choose-img figcaption p').addClass('white');
		} else {
			$('.result-choose-img figcaption p').removeClass('white');
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

// SUBMIT FORM
function ajaxForm() {
	$('.index-4 button').on('click', function() {
		// CÁC TRƯỜNG INPUT
		const name = $('.index-4 #name').val();
		const email = $('.index-4 #email').val();
		const phone = $('.index-4 #phone').val();
		const content = $('.index-4 #content').val();
		// URL GỬI DATA
		const url = $(this).attr('data-url');
		// AJAX GỬI DATA
		$.ajax({
			type: "POST",
			url: url,
			data: {
				name: name,
				emai: email,
				phone: phone,
				content: content
			},
			dataType: "JSON",
			// error: function(err) {
			// 	alert('Cảm ơn bạn đã đăng kí');
			// },
			success: function(res) {
				alert(res.Message)
			}
		});
	});
}

// CÁC BƯỚC NHẬP THIỆP
function step_by_step() {

	$('.step-2').hide();
	$('.step-3').hide();

	// BẤM NEXT QUA BƯỚC 2
	$('.step-1 .button-next-step').on('click', function() {
		$('.step-1').hide(500);
		$('.step-2').show(500);
	});

	// BẤM NEXT QUA BƯỚC 3
	$('.step-2 .button-next-step').on('click', function() {
		$('.step-2').hide(500);
		$('.step-3').show(500);
	});

	// TRỞ LẠI BƯỚC 1
	$('.step-2 .button-prev-step').on('click', function() {
		$('.step-2').hide(500);
		$('.step-1').show(500);
	});
}

// CHẠY KHI DOCUMENT SẴN SÀNG
document.addEventListener('DOMContentLoaded', () => {
	// WOW JS
	new WOW().init();
	// LOADING
	loading();
	// SVG CONTROL
	SVG();
	// FANCYBOX
	// fancyboxOninit();
	// MENU
	scrollMenu();
	clickGoTop();
	// CHOOSE IMAGE
	chooseIMG();
	// CHOOSE CARD
	chooseCard();
	// CHỌN CÂU CHÚC MẶC ĐỊNH
	chooseContentDefault();
	// CHỌN MÀU CHO BACKGROUND
	chooseBackground();
	// SHOW CONTENT
	showContent();
	// AJAX FORM
	ajaxForm();
	// MENU MOBILE
	showMenuMobile();
	// SLIDER
	sliderBigIMG();
	sliderChooseCard();
	// CÁC BƯỚC CHỌN THIỆP
	step_by_step();
});

// CHẠY KHI WINDOWN SCROLL
window.addEventListener('scroll', () => {})