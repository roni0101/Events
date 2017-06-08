var Events = (function () {
	
	function addMember(eventId) {
		var eventMember = $('[data-members="' + eventId + '"]');
		var membersNum  = $(eventMember[0]).text();
		membersNum = Number(membersNum) + 1;
		eventMember.text(membersNum);
	}
	function removeMember(eventId) {
		var eventMember = $('[data-members="' + eventId + '"]');
		var membersNum  = $(eventMember[0]).text();
		membersNum = Number(membersNum) - 1;
		eventMember.text(membersNum);
	}

	return{
		addMember:addMember,
		removeMember:removeMember
	}

})();