function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function eraseCookie(name) {
	document.cookie = name + '=; Max-Age=-99999999;';
}


function getInfoFromUrl() {
	var urlString = window.location.href;
	var url = new URL(urlString);

	var Source = url.searchParams.get('utm_source');
	var Medium = url.searchParams.get('utm_medium');
	var Campaign = url.searchParams.get('utm_campaign');
	var Term = url.searchParams.get('utm_term');
	var UTMContent = url.searchParams.get('tm_content');
	var fbclid = url.searchParams.get('fbclid');
	var gclid = url.searchParams.get('gclid');
	let Social, SocialId;

	if (fbclid) {
		Social = 'fbclid';
		SocialId = fbclid;
	} else if (gclid) {
		Social = 'gclid';
		SocialId = gclid;
	} else {
		Social = null
		SocialId = null;
	}
	if (Source || Medium || Campaign || Term || UTMContent || fbclid || gclid || Social || SocialId) {
		return {
			Source: Source,
			Medium: Medium,
			Campaign: Campaign,
			Term: Term,
			UTMContent: UTMContent,
			Social: Social,
			SocialId: SocialId
		}
	} else {
		return false;
	}
}

function convertInformationToB64(param) {
	return window.btoa(JSON.stringify(param));
}


if (!getCookie('utm') && getInfoFromUrl()) {
	setCookie('utm', convertInformationToB64(getInfoFromUrl()), 1);
}

// document.cookie.split(';').forEach(cookie => {
// 	console.log(cookie.substring(cookie.indexOf('=') + 1, cookie.length));
// })