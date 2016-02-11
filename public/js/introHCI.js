'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	console.log("GETTING /project/" + idNumber);
	$.get("/project/" + idNumber, addProject);
}

function addProject(result) {
	// result is a JSON with fields id, title, date, summary
	
	// grabs the div with class project, id {{id}}
	//$('#project' + result['id'] + ' .details').html("please work");

	console.log(result['image']);
	var projectHTML = '<img src="' + result['image'] + '"class="detailsImage">'+
		'<h4>' + result['title'] + '</h4>' +
		'<p>' + result['date'] + '</p>' +
		'<p>' + result['summary'] + '</p>';
	$('#project' + result['id'] + ' .details').html(projectHTML);	
}

function changeColors (result) { 
	//call back fxn w/ color information

	// grabs the hex array within colors
	var colors = result['colors']['hex'];

	// edit the css
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	
	// call the callback fxn
  $.get("/palette", changeColors);
}
