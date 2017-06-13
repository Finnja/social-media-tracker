var fbInterval;
var twInterval;

// checks to see if URL is changed
chrome.tabs.onUpdated.addListener(function() {
	checkAndCount()
});

// checks to see if active tab is changed
chrome.tabs.onActivated.addListener(function() {
	checkAndCount()
});

/* when one site tab is closed and another activated, the first site will count
continuously D: */


function checkAndCount() {
	chrome.tabs.getSelected(null, function(activeTab) {
		var activeTabUrl = activeTab.url;

		if (activeTab.status === 'complete' && activeTabUrl.indexOf('https://www.facebook.com') != -1) {
			alert('start facebook counting');
			var fb_today = idString('fb');
			var seconds = 0;

			chrome.storage.local.get(fb_today, function(item) {
				if (item[idString('fb')]) {seconds = item[idString('fb')];}
			});

			fbInterval = setInterval(function() {
				seconds++;
				chrome.storage.local.set({[fb_today]: seconds}, function() {
					console.log(seconds);
				});
			}, 1000)

			if (twInterval) {
				alert('stop twitter counting');
				clearInterval(twInterval);
				twInterval = false;
			}
		}

		else if (activeTab.status === 'complete' && activeTabUrl.indexOf('https://twitter.com/') != -1) {
			alert('start twitter counting');
			var tw_today = idString('tw');
			var seconds = 0;

			chrome.storage.local.get(tw_today, function(item) {
				if (item[idString('tw')]) {seconds = item[idString('tw')];}
			});

			twInterval = setInterval(function() {
				seconds++;
				chrome.storage.local.set({[tw_today]: seconds}, function() {
					console.log(seconds);
				});
			}, 1000)

			if (fbInterval) {
				alert('stop facebook counting');
				clearInterval(fbInterval);
				fbInterval = false;
			}
		}

		else {
			if (fbInterval) {
				alert('stop facebook counting');
				clearInterval(fbInterval);
				fbInterval = false;
			}

			if (twInterval) {
				alert('stop twitter counting');
				clearInterval(twInterval);
				twInterval = false;
			}
		}
	});
}

function idString(site) {
	// creates unique ids for both sites for each day
	var d = new Date();
	return(site + d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString());
}
