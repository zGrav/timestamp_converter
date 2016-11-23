function defaultLanguageCode() {
	let userLang;

	try {
		userLang = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage;
	} catch (e) {
		userLang = 'en-US';
	}

	return userLang;
}

function timeConverter(t, isCompact) {
	const a = new Date(t * 1000);
	const today = new Date();
	const oneminute = new Date(Date.now() - 60000);
	const onehour = new Date(Date.now() - 3600000);
	const yesterday = new Date(Date.now() - 86400000);
	const sevendays = new Date(Date.now() - 604800000);
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const year = a.getFullYear();
	const month = months[a.getMonth()];
	const date = a.getDate();
	let hour = a.getHours();
	const min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const day = days[a.getDay()];

	const is12hour = today.toLocaleString(defaultLanguageCode()).endsWith('M');

	let ampm = '';

	if (is12hour) {
		ampm = (a.getHours() >= 12) ? ' PM' : ' AM';
		hour = (a.getHours() >= 12) ? a.getHours() - 12 : a.getHours();
	}

	if (Math.floor(a.getTime() / 1000) === Math.floor(onehour.getTime() / 1000)) {
		return isCompact ? '1 hour' : '1 hour ago';
	}

	if ((Math.floor(a.getTime() / 1000) < Math.floor(onehour.getTime() / 1000)) === false) {
		if ((Math.floor(a.getTime() / 1000) < Math.floor(oneminute.getTime() / 1000)) === false) {
			return isCompact ? 'now' : 'just now';
		}
		const mins = Math.floor(today.getTime() / 1000) - Math.floor(a.getTime() / 1000);
		if (isCompact) {
			return Math.floor(mins / 60) === 1 ? Math.floor(mins / 60) + ' min' : Math.floor(mins / 60) + ' mins';
		}
		return Math.floor(mins / 60) === 1 ? Math.floor(mins / 60) + ' min ago' : Math.floor(mins / 60) + ' mins ago';
	}

	if (a.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
		return hour + ':' + min + ampm;
	} else if (a.setHours(0, 0, 0, 0) === yesterday.setHours(0, 0, 0, 0)) {
		return isCompact ? 'Yesterday' : 'Yesterday, ' + hour + ':' + min + ampm;
	} else if (a.setHours(0, 0, 0, 0) > sevendays.setHours(0, 0, 0, 0)) {
		return isCompact ? day : day + ', ' + hour + ':' + min + ampm;
	} else if (year === today.getFullYear()) {
		if (is12hour) {
			return isCompact ? month + ' ' + date : month + ' ' + date + ', ' + hour + ':' + min + ampm;
		}
		return isCompact ? date + ' ' + month : date + ' ' + month + ', ' + hour + ':' + min + ampm;
	}
	if (is12hour) {
		return isCompact ? month + ' ' + date + ' ' + year : month + ' ' + date + ' ' + year + ', ' + hour + ':' + min + ampm;
	}
	return isCompact ? date + ' ' + month + ' ' + year : date + ' ' + month + ' ' + year + ', ' + hour + ':' + min + ampm;
}
