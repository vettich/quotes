empty = function(obj) {
	if(typeof obj == 'object') {
		return !Object.keys(obj).length
	}
	if(typeof obj == 'array') {
		return !obj.length
	}
	return !obj;
}

dateToString = function (date) {
	_date = date;
	return date instanceof Date ?
		(date.toLocaleDateString() + ' ' + date.toLocaleTimeString()) :
		date;
}
