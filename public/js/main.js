$(document).ready(function() {
	var psi = $('#psi').text();
	if (psi <= 50) {
		$('#psi').css('background-color', '#71E5F5');
	} else if (psi <= 100) {
		$('#psi').css('background-color', '#A8C3E0');
	} else if (psi <= 150) {
		$('#psi').css('background-color', '#9AA5B3');
	} else if (psi <= 200) {
		$('#psi').css('background-color', '#818B96');
	} else if (psi <= 250) {
		$('#psi').css('background-color', '#65838C');
	} else if (psi <= 300) {
		$('#psi').css('background-color', '#72787A');
	}
});