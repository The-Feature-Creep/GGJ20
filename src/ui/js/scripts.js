var $ = require('jquery');

$(document).ready(function () {
	$(document).on('click', '#show-in-game-menu', function(){
		$('#in-game-menu').show();
	});

	$(document).on('click', '#hide-in-game-menu', function(){
		$('#in-game-menu').hide();
	});
});
