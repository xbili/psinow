$(document).ready(function() {
	var psi = $('#psi').text();
	if (psi <= 50) {
		$('.app').css('background-color', '#71E5F5');
	} else if (psi <= 100) {
		$('.app').css('background-color', '#A8C3E0');
	} else if (psi <= 150) {
		$('.app').css('background-color', '#9AA5B3');
	} else if (psi <= 200) {
		$('.app').css('background-color', '#818B96');
	} else if (psi <= 250) {
		$('.app').css('background-color', '#65838C');
	} else if (psi <= 300) {
		$('.app').css('background-color', '#72787A');
	}
});