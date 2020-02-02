var $ = require('jquery');

$(document).ready(function () {
	$(document).on('click', '#show-in-game-menu', function(){
		$('.shader').show();
		$('#in-game-menu').show();
	});

	$(document).on('click', '#hide-in-game-menu', function(){
		$('.shader').hide();
		$('#in-game-menu').hide();
	});

	$(document).on('click', '#start-game', function(){
		$('body').addClass('loaded');
		setTimeout(function () {
			$('#loader-wrapper').hide();
			$('#start-menu').hide();
		}, 1500);
	});

	$(document).on('click', '#end-game', function(){
		$('body').removeClass('loaded');
		$('#loader-wrapper').show();
		$('#start-menu').show();
		$('.shader').hide();
		$('#in-game-menu').hide();
	});
});
