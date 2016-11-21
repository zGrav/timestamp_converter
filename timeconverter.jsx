function timeConverter(t) {
	const a = new Date(t * 1000);
	const today = new Date();
	const fiveminutes = new Date(Date.now() - 300000);
	const onehour = new Date(Date.now() - 3600000);
	const yesterday = new Date(Date.now() - 86400000);
	const sixdays = new Date(Date.now() - 518400000);
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const year = a.getFullYear();
	const month = months[a.getMonth()];
	const date = a.getDate();
	const hour = a.getHours();
	let min = a.getMinutes();
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const day = days[a.getDay()];


	min = (min < 10 ? '0' + min : min);

	if (Math.floor(a.getTime() / 1000) === Math.floor(onehour.getTime() / 1000)) {
		return '1 hour ago';
	}

	if ((Math.floor(a.getTime() / 1000) < Math.floor(onehour.getTime() / 1000)) === false) {
		if ((Math.floor(a.getTime() / 1000) < Math.floor(fiveminutes.getTime() / 1000)) === false) {
			return 'just now';
		} else {
			const mins = Math.floor(today.getTime() / 1000) - Math.floor(a.getTime() / 1000);
			return Math.floor(mins / 60) + ' minutes ago';
		}
	}

	if (a.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
		return 'Today, ' + hour + ':' + min;
	} else if (a.setHours(0, 0, 0, 0) === yesterday.setHours(0, 0, 0, 0)) {
		return 'Yesterday, ' + hour + ':' + min;
	} else if (a.setHours(0, 0, 0, 0) > sixdays.setHours(0, 0, 0, 0)) {
		return day + ', ' + hour + ':' + min;
	} else if (year === today.getFullYear()) {
		return date + ' ' + month + ', ' + hour + ':' + min;
	} else {
		return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min;
	}
}
