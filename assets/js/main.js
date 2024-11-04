/*---------------------------------------------------------
	Index Of Script
-----------------------------------------------------------

	@version         : 1.1.0
	@Template Name   : Travello
	@Template author : initTheme
    
	:: Swiper Slider Active         :: Nice Scroll js             
	:: Fancy box                    :: Hover Tilt Effect        
	:: Search box                   :: Select 2                                  
	:: Mobile Menu                  :: Slick Nav       
	:: Animation                    :: Wow Animation      
	:: Sticky And Scroll Up         :: JS Year
	:: JS for Price Range slider    :: Play video Slider
	:: Custom click ad remove       :: Custom Dropdown
	:: Filter side nav              :: Password Show Hide
	:: Payment Gateway selection    
    
------------------------------------------------------------
	End-of Script
------------------------------------------------------------*/

// Function to fetch language data
async function fetchLanguageData(lang) {
	var fileName = `./${lang}.json`;
	const response = await fetch(fileName);
	return response.json();
}

// Function to set the language preference
function setLanguagePreference(lang) {
	localStorage.setItem('language', lang);
	//location.reload();
}

// Function to update content based on selected language
function updateContent(langData) {
	document.querySelectorAll('[data-i18n]').forEach(element => {
		const key = element.getAttribute('data-i18n');
		element.textContent = langData[key];
	});
}

// Function to change language
async function changeLanguage(lang) {
	await setLanguagePreference(lang);

	const langData = await fetchLanguageData(lang);
	updateContent(langData);
}

// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
	const userPreferredLanguage = localStorage.getItem('language') || 'es';
	const langData = await fetchLanguageData(userPreferredLanguage);
	updateContent(langData);
});


(function ($) {
	"use strict";

	/*-----------------------------------------------
		:: Slick Nav [ Mobile Menu ]
	-----------------------------------------------*/
	var slickNavInitialized = false;
	$(document).ready(function () {
		if (!slickNavInitialized) {
			var menu = $("#navigation");
			var filterMenu = $("#filterMenu");
			if (menu.length) {
				menu.slicknav({
					prependTo: ".mobile_menu",
					closedSymbol: "+",
					openedSymbol: "-",
				});
				slickNavInitialized = true;
			}
			if (filterMenu.length) {
				filterMenu.slicknav({
					label: "Filter",
					duplicate: true,
					duration: 200,
					easingOpen: "swing",
					easingClose: "swing",
					closedSymbol: "&#9658;",
					openedSymbol: "&#9660;",
					prependTo: ".filter_menu",
				});
				slickNavInitialized = true;
			}
		}
	});


	/*-------------------------------------------------
		:: Nav tab
	-------------------------------------------------*/

	$(".tab-section-one").show();
	$(".tab-btn a").on("click", function () {
		$(".tab-btn a").removeClass("active");
		$(this).addClass("active");
		$(".tab-section").hide();
		var tabId = $(this).data("tab-id");
		$("#" + tabId).show();
	});

	/*-------------------------------------------------
		:: WOW active
	-------------------------------------------------*/
	new WOW().init();


	/*----------------------------------------------
		Language Mode
	----------------------------------------------*/
	/*
	const setLanguage = (language) => {
		language ??= localStorage.language || "es";
		localStorage.language = language;
	};
	setLanguage();
*/
	// Button text change
	const updateTextButton = () => {
		if (localStorage.language === "es") {
			document.getElementById("languageButton").innerText = "Deutsch";
			/*
						$('[lang="de"]').hide();
						$('[lang="es"]').show();
			*/
		} else {
			document.getElementById("languageButton").innerText = "Español";
			/*
						$('[lang="es"]').hide();
						$('[lang="de"]').show();
			*/
		}
	};
	updateTextButton();

	//Toggle Buttons
	const ToggleLangs = document.getElementsByClassName("ChangeLanguageButton");
	for (const ToggleLang of ToggleLangs) {
		ToggleLang.addEventListener("click", () => {
			const lang = localStorage.language === "es" ? "de" : "es";
			//setLanguage(lang);
			changeLanguage(lang);
			updateTextButton();
		});
	}

})(jQuery);

/*

(function ($) {
	"use strict";

	var $window = $(window),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		default: ['1681px', null],
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Hack: Enable IE workarounds.
	if (browser.name == 'ie')
		$body.addClass('is-ie');

	// Mobile?
	if (browser.mobile)
		$body.addClass('is-mobile');

	// Scrolly.
	$('.scrolly')
		.scrolly({
			offset: 100
		});

	// Polyfill: Object fit.
	if (!browser.canUse('object-fit')) {

		$('.image[data-position]').each(function () {

			var $this = $(this),
				$img = $this.children('img');

			// Apply img as background.
			$this
				.css('background-image', 'url("' + $img.attr('src') + '")')
				.css('background-position', $this.data('position'))
				.css('background-size', 'cover')
				.css('background-repeat', 'no-repeat');

			// Hide img.
			$img
				.css('opacity', '0');

		});

		$('.gallery > a').each(function () {

			var $this = $(this),
				$img = $this.children('img');

			// Apply img as background.
			$this
				.css('background-image', 'url("' + $img.attr('src') + '")')
				.css('background-position', 'center')
				.css('background-size', 'cover')
				.css('background-repeat', 'no-repeat');

			// Hide img.
			$img
				.css('opacity', '0');

		});

	}

	// Gallery.
	$('.gallery')
		.on('click', 'a', function (event) {

			var $a = $(this),
				$gallery = $a.parents('.gallery'),
				$modal = $gallery.children('.modal'),
				$modalImg = $modal.find('img'),
				href = $a.attr('href');

			// Not an image? Bail.
			if (!href.match(/\.(jpg|gif|png|mp4)$/))
				return;

			// Prevent default.
			event.preventDefault();
			event.stopPropagation();

			// Locked? Bail.
			if ($modal[0]._locked)
				return;

			// Lock.
			$modal[0]._locked = true;

			// Set src.
			$modalImg.attr('src', href);

			// Set visible.
			$modal.addClass('visible');

			// Focus.
			$modal.focus();

			// Delay.
			setTimeout(function () {

				// Unlock.
				$modal[0]._locked = false;

			}, 600);

		})
		.on('click', '.modal', function (event) {

			var $modal = $(this),
				$modalImg = $modal.find('img');

			// Locked? Bail.
			if ($modal[0]._locked)
				return;

			// Already hidden? Bail.
			if (!$modal.hasClass('visible'))
				return;

			// Stop propagation.
			event.stopPropagation();

			// Lock.
			$modal[0]._locked = true;

			// Clear visible, loaded.
			$modal
				.removeClass('loaded')

			// Delay.
			setTimeout(function () {

				$modal
					.removeClass('visible')

				setTimeout(function () {

					// Clear src.
					$modalImg.attr('src', '');

					// Unlock.
					$modal[0]._locked = false;

					// Focus.
					$body.focus();

				}, 475);

			}, 125);

		})
		.on('keypress', '.modal', function (event) {

			var $modal = $(this);

			// Escape? Hide modal.
			if (event.keyCode == 27)
				$modal.trigger('click');

		})
		.on('mouseup mousedown mousemove', '.modal', function (event) {

			// Stop propagation.
			event.stopPropagation();

		})
		.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
		.find('img')
		.on('load', function (event) {

			var $modalImg = $(this),
				$modal = $modalImg.parents('.modal');

			setTimeout(function () {

				// No longer visible? Bail.
				if (!$modal.hasClass('visible'))
					return;

				// Set loaded.
				$modal.addClass('loaded');

			}, 275);

		});

})(jQuery);

*/