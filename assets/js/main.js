/*---------------------------------------------------------
	Index Of Script
-----------------------------------------------------------

	@version         : 1.1.0
	@Template Name   : Travello
	@Template author : initTheme
    
------------------------------------------------------------
	End-of Script
------------------------------------------------------------*/

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

})(jQuery);