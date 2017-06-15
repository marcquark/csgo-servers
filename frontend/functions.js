var config = {
	metaUrl: 'https://www.csgo-servers.eu/api/meta',
	listUrl: 'https://www.csgo-servers.eu/api/list'
}

var meta;

$(document).ready(function(){
	updateMeta();
});

function updateMeta() {
	$.ajax({
		url: config.metaUrl,
		dataType: 'json',
		success: function(data) {
			meta = data;

			let categoryPicker = $('#categoryPicker');
			for(let i = 0; i < meta.categories.length; i++) {
				let categoryOption = $(document.createElement("option"));
				categoryOption.attr({
					value: meta.categories[i].id
				});
				categoryOption.text(meta.categories[i].name);

				categoryPicker.append(categoryOption);
			}

			let tagSelector = $('#tagSelector');
			for(let i = 0; i < meta.tags.length; i++) {
				let tagButton = $(document.createElement("button"));
				tagButton.attr({
					type: "button",
					name: meta.tags[i].id,
					onClick: "tagSwitch(this)"
				});
				tagButton.text(meta.tags[i].name);
				tagButton.addClass('btn');
				tagButton.addClass('btn-default');

				tagSelector.append(tagButton);
			}

			$('#serversTable').bootstrapTable({
				url: config.listUrl
			});
		},
		error: function(e) {
			console.log(e.responseText);
		}
    });
}

function refreshServers() {
	$('#serversTable').bootstrapTable('refresh');
}

function apiResponseHandler(res) {
	let data = res.servers;

	let tableContent = new Array();
	for(let i = 0; i < data.length; i++) {
		if(data[i].tags)
			data[i].tags = data[i].tags.split(',');
		else
			data[i].tags = new Array();

		data[i].ip = data[i].ip + ':' + data[i].port;
	}

	return data;
}

function apiQueryParams(params) {
	params = {
		category: $('#categoryPicker').val()
	};

	if($('#notfullCheckbox').prop('checked')) {
		params.notfull = 1;
	}
	if($('#notemptyCheckbox').prop('checked')) {
		params.notempty = 1;
	}

	$('#tagSelector').children().each(function() {
		if(this.classList.contains('btn-success')) {
			if(!params.tag) {
				params.tag = new Array();
			}
			params.tag.push(this.name);
		}
		else if(this.classList.contains('btn-danger')) {
			if(!params.notag) {
				params.notag = new Array();
			}
			params.notag.push(this.name);
		}
	});

	return params;
}

function ipFormatter(value, row, index) {
	return '<a href="steam://connect/' + value + '">' + value + '</a>';
}

function playersFormatter(value, row, index) {
	return value + '/' + row.players_max;
}

function tagsFormatter(value, row, index) {
	let tagHtml = '';

	for(let i = 0; i < row.tags.length; i++) {
		for(let j = 0; j < meta.tags.length; j++) {
			if(row.tags[i] == meta.tags[j].id) {
				tagHtml += meta.tags[j].name + ', ';
				break;
			}
		}
	}

	return tagHtml.slice(0, -2);
}

function tagSwitch(btn) {
	if(btn.classList.contains('btn-success')) {
		btn.classList.toggle('btn-success');
		btn.classList.toggle('btn-danger');
	}
	else if(btn.classList.contains('btn-danger')) {
		btn.classList.toggle('btn-danger');
	}
	else {
		btn.classList.toggle('btn-success');
	}

	btn.blur();

	refreshServers();
}