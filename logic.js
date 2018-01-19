var topics = ["Rick and Morty", "The Wire", "The Simpsons", "gilligans island", "laugh-in", "seinfeld", "friends", "how i met your mother", "the west wing", "I love lucy", "family guy", "bewitched", "M*A*S*H", "Lost", "Dragon Ball Z", "the sopranos", "Breaking Bad", "game of thrones", "house", "big bang theory", "looney tunes"]

$(document).ready(function() {
	addBtn()
});

$("#submitBtn").on("click", function(){
	event.preventDefault();
	var newButton = $("#fillField").val().trim()
	topics.push(newButton)
	addBtn()
})

function addBtn () {
	$("#buttonContainer").empty();
	for (var i = 0; i < topics.length; i++) {
		var button = $("<button>")
		button.addClass("category")
		button.addClass("btn btn-primary")
		button.text(topics[i])
		$("#buttonContainer").append(button)
	}
}


function animateClick(){
	if ($(this).attr("status") == "still") {

		$(this).attr("src", $(this).attr("animatedUrl"))
		$(this).attr("status", "animated")
	}

	else if ($(this).attr("status") == "animated") {

		$(this).attr("src", $(this).attr("stillUrl"))
		$(this).attr("status", "still")
	}
}




function apiSearch(){

	var search = $(this).text()
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=V2GOrTSaCMVa0l9wlbByaBRhKMncbWr8&q="+search+"&limit=10&offset=0&rating=G&lang=en"
	
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		console.log(response)
		$("#gifContainer").empty()

		for (var i = 0; i < response.data.length; i++) {
			var gifDiv = $("<div>")
			var gif = $("<img>");

			gifDiv.addClass("gifDiv")

			gif.attr("src", response.data[i].images.fixed_height_still.url)
			gif.addClass("gif")

			gif.attr("status", "still")

			gif.attr("stillUrl", response.data[i].images.fixed_height_still.url)
			gif.attr("animatedUrl", response.data[i].images.fixed_height.url)

			gifDiv.html(gif)
			gifDiv.append("<div>Rating: "+response.data[i].rating+"</div>")

			$("#gifContainer").append(gifDiv)
		}
	});
}

$("#buttonContainer").on("click", ".category", apiSearch);
$("#gifContainer").on("click", ".gif", animateClick);



