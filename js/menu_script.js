
/*****************************************************************************************
										MENU PAGE
*****************************************************************************************/

$(document).ready(function(e){
	'use strict';
	changeTab();
	$(".head").click( function(){ displayDetails(this); });
	$(".head").mouseenter( function(){ $(this).css( 'cursor', 'pointer' ); });
	
	$("#btnHide").click( function() { $("#frmsearch").slideToggle(); });
	$("#btnClear").click( function() { displayAllMenuItems(); });
	$("#btnSearch").click ( function() { return displaySearchResults(); });


});

/**
 * Displays the tab that was clicked and hides the others. Also sets the first tab to
 * be visible when page is loaded.
 */
function changeTab(){
	'use strict';
	$(".tabNavigation a").click(function(){
		$(".tab").hide(); //hides only divs that are of the .tab class
		$(this.hash).show();
		return false;
	}).filter(":first").click(); // this simulates a click on the first link
}

/**
 * Displays/hides the detail section for a menu item.
 **/
function displayDetails(header){
	'use strict';
	$(header).find(".details").slideToggle();	
}

/**
 * Hides all menu items then displays the ones whose class matches the user's search
 * selections.
 **/
function displaySearchResults(){
	'use strict';
	//get the selected checkboxes
	var selectedIngredients = $("#frmsearch").find(":checked");
	
	//hide everything
	$(".head").addClass("hidden");
	
	//show the menu items that contain selected ingredients
	for ( var i = 0; i < selectedIngredients.length; i++ ){
		var ingredientClass = "." + selectedIngredients[i].value
		$(ingredientClass).parent().removeClass("hidden");	
	}
	
	return false; //do not reload
}

/**
 * Unhides all menu item headers (called when the user clicks "Clear Search Criteria").
 **/
function displayAllMenuItems(){
	'use strict';
	$(".head").removeClass("hidden");
}