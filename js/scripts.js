// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

// Моб. версия
fakeResize = false
fakeResize2 = true

if (document.body.clientWidth < 375) {
	document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
}

$(() => {
	
})

$(window).on('load', () => {
	if ($('.swiper-left').length) {
		new Swiper(".swiper-left", {
			spaceBetween: 0,
			speed: 6000,
			autoplay: {
				delay: 1,
				reverseDirection: true
			},
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			loop: true,
			slidesPerView:'auto',
			allowTouchMove: false,
			disableOnInteraction: true,
		});
	}

	if ($('.swiper-right').length) {
		new Swiper(".swiper-right", {
			spaceBetween: 0,
			speed: 3800,
			autoplay: {
				delay: 1,
				reverseDirection: true
			},
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			loop: true,
			slidesPerView:'auto',
			allowTouchMove: false,
			disableOnInteraction: true,
			initialSlide: 1,
			breakpoints: {
				'320': {
					speed: 6000,
					initialSlide: 1,
				},
				'480': {
					speed: 6000,
					initialSlide: 1,
				},
				'768': {
					speed: 6000,
					initialSlide: 1,
				},
				'1660': {
					speed: 6000,
					initialSlide: 1,
				}
			},
		});
	}
})

const container = document.querySelector('.bonus__container');
document.querySelector('.bonus__slider').addEventListener('input', (e) => {
	container.style.setProperty('--position', `${e.target.value}%`);
})


$(window).on('resize', () => {
	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
});