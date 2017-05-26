// popup opens
window.onload = function() {
	var fb_today = idString('fb');
	var tw_today = idString('tw');

	chrome.storage.local.get(fb_today, function(item) {
			display = document.querySelector('#fb');
			if (item[fb_today]) {display.textContent = item[fb_today];} 
		});

	chrome.storage.local.get(tw_today, function(item) {
		display = document.querySelector('#tw');
		if (item[tw_today]) {display.textContent = item[tw_today];} 
	});

	setInterval(function() {
		chrome.storage.local.get(fb_today, function(item) {
			display = document.querySelector('#fb');
			if (item[fb_today]) {display.textContent = item[fb_today];} 
		});

		chrome.storage.local.get(tw_today, function(item) {
			display = document.querySelector('#tw');
			if (item[tw_today]) {display.textContent = item[tw_today];} 
		});
	}, 1000);

	// clear all stored data (delete before deploy)
	document.querySelector('#clear').onclick = function() {
		chrome.storage.local.clear(function() {
			alert('all data wiped');
		})
	}
}

function idString(site) {
	// creates unique ids for both sites for each day
	var d = new Date();
	return(site + d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString());
}