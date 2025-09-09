$(() => {
	// Observer API
	const boxes = document.querySelectorAll('.lazyload')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-src') && !entry.target.classList.contains('loaded')) {
				entry.target.classList.add('loaded')

				entry.target.src = entry.target.getAttribute('data-src')
			}

			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-srcset') && !entry.target.classList.contains('loaded')) {
				entry.target.srcset = entry.target.getAttribute('data-srcset')

				entry.target.classList.add('loaded')
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))
	

	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')


	// Плавная прокрутка к якорю
	$('body').on('click', '.scroll-link', function(e) {
		e.preventDefault()

		let href = $(this).data('anchor')

		$('html, body').stop().animate({
			scrollTop: $(href).offset().top - 50
		}, 1000)
	})

	// Меню
	inView.offset(250)

	if( $('#anchor1').length ) {
		inView('#anchor1')
			.on('enter', function(el){
				$('.nav-menu__item:eq(0) button').addClass('_active')
			})
			.on('exit', function(el){
				$('.nav-menu__item:eq(0) button').removeClass('_active')
			})
	}

	if( $('#anchor2').length ) {
		inView('#anchor2')
			.on('enter', function(el){
				$('.nav-menu__item:eq(1) button').addClass('_active')
			})
			.on('exit', function(el){
				$('.nav-menu__item:eq(1) button').removeClass('_active')
			})
	}

	if( $('#anchor3').length ) {
		inView('#anchor3')
			.on('enter', function(el){
				$('.nav-menu__item:eq(2) button').addClass('_active')
			})
			.on('exit', function(el){
				$('.nav-menu__item:eq(2) button').removeClass('_active')
			})
	}


	// Моб. меню
	$('body').on('click', '.mob-menu-link', function(e) {
		e.preventDefault()

		$('.header__box').addClass('_show')

		$('.overlay').fadeIn()

		$('.close-menu').fadeIn()

		$('body').addClass('_lock-add')
    })

    $('body').on('click', '.close-menu, .overlay', function(e) {
		e.preventDefault()
		$('.header__box').removeClass('_show')

		$('.overlay').fadeOut()

		$('.close-menu').fadeOut()

		$('body').removeClass('_lock-add')
	})

	$('body').on('click', '.header__box .nav-menu__item button', function() {
		$('.header__box').removeClass('_show')

		$('.overlay').fadeOut()

		$('.close-menu').fadeOut()

		$('body').removeClass('_lock-add')
    })

	// Всплывающие окна
	$('body').on('click', '.modal-btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('content'),
			type: 'inline'
		}],
		)
	})

	$('body').on('click', '.modal-close', function (e) {
		e.preventDefault()

		Fancybox.close()
	})


	// Увеличение картинки
	Fancybox.bind('.fancy-img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})
})

$(window).on('load', () => {
	// Шапка
	if( $(window).scrollTop() > 0 ){
		$('header').addClass('_fixed')
	} else{
		$('header').removeClass('_fixed')
	}

	$(window).scroll(function(){
		if( $(window).scrollTop() > 0 ) {
			$('header').addClass('_fixed')
		} else{
			$('header').removeClass('_fixed')
		}
	})
})

// Вспомогательные функции
const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}

const is_touch_device = () => !!('ontouchstart' in window)