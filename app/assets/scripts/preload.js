var Preload = (function () {
	
	// Preload templates

	var sourceList = [];
	var sourcesToLoad = [
		{
			type:'templates',
			name:'event-item.html'
		},
		{
			type:'templates',
			name:'event.html'
		},
		{
			type:'templates',
			name:'nav-ul.html'
		},
		{
			type:'templates',
			name:'nav-ul-member.html'
		},
		{
			type:'templates',
			name:'nav-ul-admin.html'
		},
		{
			type:'data',
			name:'events.json'
		},
		{
			type:'templates',
			name:'c-panel-event.html'
		},
		{
			type:'templates',
			name:'cp-edit-event.html'
		}
	];
	var url = 'assets/';

	for( var i = 0; i < sourcesToLoad.length; i++ ){
		var source = sourcesToLoad[i];
		var sourceType = source.type;
		var sourceName = source.name;

		var templateUrl = url + sourceType + '/' + sourceName;

		// Use closure to set proper template name
		(function (srcName) {
			$.get(templateUrl, function (source) {

				// Save template as object in the arr templateList
				var sourceObj = {};
				sourceObj.name = srcName;
				sourceObj.content = source;
				sourceList.push(sourceObj);
				isDone();
			});			
		})(sourceName);
	}



	// Check if all files are loaded
	// If all files are loaded initialize app
	function isDone() {
		if(sourceList.length === sourcesToLoad.length){
			App.init();
		}
	}

	// Public function used after the preload
	// to get source based on name + extention
	function getSource(srcName) {
		for (var i = 0; i < sourceList.length; i++) {
			var sourceObj = sourceList[i];
			var sourceName = sourceObj.name;

			if(srcName == sourceName){
				return sourceObj.content;
			}
		}
	}

	// Get events 


	return {
		getSource: getSource
	}

})();