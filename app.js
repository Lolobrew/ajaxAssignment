

		//initialize array to push searched words
		var searchArray = ['Doge', 'Kitteh'];
		
		
		//function to render buttons for searchArray
		function displayButtons(){

			for (var i = 0; i < searchArray.length; i++) {
				
				//create new button
				var makeBtn = $('<button>');
				//add class, text, and a value
				makeBtn.addClass("gifBtn");
				makeBtn.text(searchArray[i].toUpperCase());
				makeBtn.val(searchArray[i]);
				//append to div
				$('#button_view').append(makeBtn);
			}
		}


		//click event for search button
		$("#searchButton").on("click", function(event) {
			event.preventDefault();
			//prevent re-adding terms
			$('#button_view').empty();      	
        	//capture value of search box
        	var freshTerm = $("#inputBox").val().trim();
        	//push to searchArray
        	searchArray.push(freshTerm);
        	//call function to update as button
        	displayButtons();

        //closes click event function for search button	
      	});



		//click event for created buttons
		$(document).on('click','.gifBtn', function(){	
			//empty current gifs
			$('#gifs_view').empty();

			//initialize vars for ajax call
			var searchTerm = $(this).val();
			//url - limit is 10, return rating, api key is public
			var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=10&rating&api_key=dc6zaTOxFJmzC";
			
			console.log(this)

			//ajax call
			$.ajax({
				url: queryURL,
				method: 'GET'
			}).done(function(response){
				console.log(response);

				//var for object data (is array)
				var responseArray = response.data;

				for (var i = 0; i < responseArray.length; i++) {

					//url for still image
					var stillGifs = responseArray[i].images.original_still.url;
					//url for animated image
					var animateGifs = responseArray[i].images.original.url;

					//create new div for each returned image
					var theDiv = $('<div>');

					//create p to hold ratings for each returned image
					var p = $('<p>');
					p.text('Rating: ' + responseArray[i].rating);


					console.log(stillGifs);
					console.log(p);
					
					
					//create img tag for each returned image and give src, class, and data attributes
					var initializeGifs = $('<img>');
					initializeGifs.attr('src', stillGifs);
					initializeGifs.attr('data-still', stillGifs);
					initializeGifs.attr('data-animate', animateGifs);
					initializeGifs.attr('data-state', 'still');
					initializeGifs.addClass('gif');

					//append rating to div
					theDiv.append(p);
					//append images to div
					theDiv.append(initializeGifs);
					//append divs to html div
					$('#gifs_view').append(theDiv);

				//closes for loop
				}

						//click event for images
		$('img').on('click', function(){

			//data-state attribute (starts as "still")
			var state = $(this).attr("data-state");
    		console.log(state);
    		console.log(this);

       		//animation attribute
	       	var animation = $(this).attr('data-animate');
	       	//still image attribute
			var stillState = $(this).attr('data-still');

			//changes animation states of images
			if (state === 'still'){        
				$(this).attr('src', animation);
				$(this).attr("data-state", 'animate');
			} else if (state === 'animate'){         
				$(this).attr('src', stillState);
				$(this).attr("data-state", 'still');
			}
		//closes img click event	
		});


			//closes promise
			});
		//closes click event for gif button
		});


		//callback to display Buttons		
		displayButtons();