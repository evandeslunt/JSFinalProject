/* Code for Volcano Sushi */

/* Global Variables */
var menuItems = []; 
var itemsOrdered = 0;
var currSlide = 0;

$(document).ready(function(e){
	'use strict';
	
	initMenuItemArray();
	
	/*********************************** MAIN PAGE ***********************************/
	//make the first slideshow image visible:
	/*
	var slideshowPhotos = $("#photocontainer").children();
	$(slideshowPhotos[0]).show();
	$("#forward").click( function() { advanceSlideshow() });
	$("#back").click( function() { reverseSlideshow() });
	$("#forward").mouseenter( function(){ $(this).css( 'cursor', 'pointer' ); });
	$("#back").mouseenter( function(){ $(this).css( 'cursor', 'pointer' ); });
	*/
	initializeSlideshow();
	/*********************************** MENU PAGE ***********************************/
	changeTab();
	$(".head").click( function(){ displayDetails(this); });
	$(".head").mouseenter( function(){ $(this).css( 'cursor', 'pointer' ); });
	$("#btnHide").click( function() { $("#frmsearch").slideToggle(); });
	$("#btnClear").click( function() { displayAllMenuItems(); });
	$("#btnSearch").click ( function() { return displaySearchResults(); });
	/*********************************** ORDER PAGE ***********************************/
	$("#addItem").click( function(){ addMenuItemCBO(); });
	
	/*********************************** VALIDATOR ***********************************/
	/* Form validation plugin logic */
	$("#frmOrder1").validate({
		rules: {
			firstName: 	{ required: true },
			lastName: 	{ required: true },
			phone: 		{ required: true },
			
		},
		messages: {
			firstName: 	{ required: "Please enter your first name." },
		  	lastName: 	{ required: "Please enter your last name." },
		  	phone: 		{ required: "Please enter your phone number." },
		},
		submitHandler: function(form) {
			return displayOrderForm2();
		}
	});
	
	$("#frmOrder2").validate({
		rules: {
			address: 	{ required: true },
			city: 		{ required: true },
			state: 		{ required: true },
			zip: 		{ required: true },
			guests: 	{ required: true },
			resDate: 	{ required: true, date: true },
			resTime: 	{ required: true }
		},
		messages: {
			address: 	{ required: "Please enter your address." },
			city: 		{ required: "Please enter your city." },
			state: 		{ required: "Please enter your state." },
			zip: 		{ required: "Please enter your zip code." },
			guests: 	{ required: "Please enter the number of guests." },
			resDate: 	{ required: "Please enter your reservation date." ,
						  date: 	"Please enter a valid date."
						},
			resTime: 	{ required: "Please enter your reservation time." }
		},
		submitHandler: function(form) {
			return placeOrder();
		}
	});	
});

/*****************************************************************************************
							        MAIN PAGE SLIDESHOW
*****************************************************************************************/

function initializeSlideshow(){
      $('#slides').slidesjs({
        width: 940,
        height: 528
      });
}
    


/**
 * Causes slideshow to back up one slide.
 **/
function reverseSlideshow(){
	'use strict';
	var photos = $("#photocontainer").children();
	
	if (currSlide == 0){
		$(photos[currSlide + 1]).hide();
		$(photos[0]).show();	
		currSlide = photos.length - 1;
	} else if (currSlide == photos.length - 1){
		$(photos[0]).hide();
		$(photos[currSlide]).show();
		currSlide--;
	} else {
		$(photos[currSlide + 1]).hide();
		$(photos[currSlide]).show();
		currSlide--;
	}

}

/**
 * Causes slideshow to advance one slide.
 **/
function advanceSlideshow(){
	'use strict';
	var photos = $("#photocontainer").children();
	
	if (currSlide == photos.length - 1){
		$(photos[currSlide - 1]).hide();
		$(photos[0]).show();	
		currSlide = 0;
	} else if (currSlide == 0){
		$(photos[photos.length - 1]).hide();
		$(photos[currSlide]).show();
		currSlide++;
	} else {
		$(photos[currSlide - 1]).hide();
		$(photos[currSlide]).show();
		currSlide++;
	}
}

/*****************************************************************************************
										MENU PAGE
*****************************************************************************************/
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

function displaySearchResults(){
	'use strict';
	//get the selected checkboxes
	var selectedIngredients = $("#frmsearch").find(":checked");
	
	//hide everything
	$(".head").addClass("hidden");
	//$(".head").css("background-color","blue");
	//show the menu items that contain selected ingredients
	for ( var i = 0; i < selectedIngredients.length; i++ ){
		var ingredientClass = "." + selectedIngredients[i].value
		console.log(ingredientClass);
		//$(ingredientClass).parent().css("background-color", "red");
		$(ingredientClass).parent().removeClass("hidden");	
	}
	
	return false;
}

function displayAllMenuItems(){
	'use strict';
	$(".head").removeClass("hidden");
}
/*****************************************************************************************
									ORDER FORM PAGE
*****************************************************************************************/
/**
 * Displays the appropriate fields in the second order form, based on the user's selection
 * for order type (delivery, carryout, or dine-in).
 **/
function displayOrderForm2(){
	'use strict';
	var numItems = 1;
	var orderType = $("#orderType").val();
	$("#submit1").val("Change Order Type");
	
	if (orderType == "carryout"){
		$(".del").hide(); 
		$(".dinein").hide();
		$(".carry").show();
		addMenuItemCBO(itemsOrdered);
	} else if (orderType == "delivery"){
		$(".carry").hide();
		$(".dinein").hide();
		$(".del").show();
		addMenuItemCBO(itemsOrdered);
	} else if (orderType == "dine"){
		$(".carry").hide();
		$(".del").hide();
		$(".dinein").show();
	}
	$("#btnOrder").show();
	
	return false;
};

/** 
 * Adds an "item" combo box to the order form. Uses the global itemNumber variable to
 * create a unique ID and increments the counter.
 **/
 
function addMenuItemCBO(itemNumber){
	'use strict';
	itemsOrdered++;
	var itemID = "item" + itemNumber;
	var qtyID = "qty" + itemNumber;
	var cboHTML = '<div id=itemCBO' + itemNumber + '>'
				  + '<label for="' + itemID + '">Select Item:</label><select>'; 
				  
	for (var i = 0; i < menuItems.length; i++){
		var curr = menuItems[i];
		cboHTML += '<option value="' + curr.description + '">' + curr.description + '</option>';
	}
	
	cboHTML += '</select><br/>'
				  + '<label for="' + qtyID + '">Order Quantity:</label>'
				  + '<input type="text" id="' + qtyID + '" name="' + qtyID + '" class="qty"/>'
				  + '<input type="button" id="btnRemoveItem" onclick="removeMenuItemCBO('
				  + 'itemCBO' + itemNumber + ')" value="remove" class="button"/></div>';
	
	$("#addItem").before(cboHTML);
	
}

/**
 * Removes the given combo box and quantity from the form.
 **/
function removeMenuItemCBO(cbo){
	'use strict';
	$(cbo).remove();
}

/** 
 * Displays the order summary/confirmation, and hides the order form.
 **/
function placeOrder(){
	'use strict';
	
	displayOrderInfo();
	
	$("#orderConfirm").toggle();
	$("#orderArea").toggle();
	
	return false;

};

/**
 * Displays the order summary.
 */
function displayOrderInfo(){
	'use strict';
	var orderType = $("#orderType").val();
	var fullName = $("#firstName").val() + " " + $("#lastName").val();
	var phone = $("#phone").val();
	var headerText = "";
	
	if (orderType == "carryout"){
		headerText = "Your Carry Out Order";
		displayItemInfo();
	} else if (orderType == "delivery"){
		headerText = "Your Delivery Order";
		displayDeliveryInfo();
	} else if (orderType == "dine"){
		headerText = "Your Dine-In Reservation";
		displayReservation();
	}	
	
	$("#orderSummary").before("<h3>" + headerText + "</h3>" 
							  + "<p>Name: " + fullName + "</p>"
							  + "<p>Phone: " + phone + "</p>");
	
};

/**
 * Displays reservation-specific information in the order summary.
 */
function displayReservation(){
	'use strict';
	var numGuests = $("#guests").val();
	var resDate = $("#resDate").val();
	var resTime = $("#resTime").val();
	
	$("#orderSummary").append("<p>Number of Guests: " + numGuests + "</p>"
							  + "<p>Reservation Date: " + resDate + "</p>"
							  + "<p>Reservation Time: " + resTime + "</p>"
							  + "We will contact you within the next 24 hours to confirm" 
							  + " your reservation.");
};

/**
 * Displays delivery-order specific information in the order summary.
 **/
function displayDeliveryInfo(){
	'use strict';
	var addr = $("#address").val();
	var apt = $("#apt").val();
	var city = $("#city").val();
	var state = $("#state").val();
	var zip = $("#zip").val();
	var deliveryMessage = "Your delivery order is on the way! You can expect delivery " 
			+ "within the next 30 - 60 minutes. Any questions or delays beyond 60 minutes, " 
			+ "call us at 262-378-9086.";
	
	$("#orderSummary").append("<p>Delivery Address: <br/>" + addr + "<br/>Apt./Suite " + apt + "<br/>"
							  + city + ", " + state + " " + zip + "</p>"
							  + "<p>" + deliveryMessage + "</p>");
}

/**
 * Displays the items ordered in delivery/carryout orders.
 **/
function displayItemInfo(){
	'use strict';
	var items = $("#frmOrder2").find("select");
	var qtys = $("#frmOrder2").find(".qty");
	//console.log("carryout");

	for (var i = 0; i < items.length; i++){
		var currQty = $(qtys[i]).val();
		if (currQty < 0){
			$("orderSummary").html("<p>We're sorry, there was a problem placing your order." 
			+ " Please re-enter your order.</p>");
		}
		var currItemID = $(items[i]).val();
		if ( $(currQty).attr("id") != "btnOrder" ){
			var lookupResult = $.grep(menuItems, function(e){ return e.id == currItemID; });
			$("#orderSummary").append("<p>(" + currQty + ") of " + currItemID + "</p>");
		}
		
	}
	
};


/*****************************************************************************************
							GENERAL CODE NOT PAGE SPECIFIC
*****************************************************************************************/

/** 
 * Object that stores menu item information.
 **/
function menuItem(id, description, price){
	this.id = id;
	this.description = description;
	this.price = price;
}

/**
 * Initializes the menu item array with a list of all menu items, their id, and their price.
 **/
function initMenuItemArray(){		
	'use strict';
	menuItems = [ new menuItem("alaska_roll", "Alaska Roll", 5.50)
				 ,new menuItem("avocado_roll", "Avocado Roll", 5.00)
				 ,new menuItem("boston_roll", "Boston Roll", 6.00)
				 ,new menuItem("california_roll", "California Roll", 6.00)
				 ,new menuItem("dragon_roll", "Dragon Roll", 6.50)
				 ,new menuItem("eel_avocado_roll", "Eel Avocado Roll", 5.50)
				 ,new menuItem("philidelphia_roll", "Philadelphia Roll", 6.50)
				 ,new menuItem("rainbow_roll", "Rainbow Roll", 7.50)
				 ,new menuItem("salmon_roll", "Salmon Roll", 5.00)
				 ,new menuItem("spider_roll", "Spider Roll", 7.00)
				 ,new menuItem("super_tempura_roll", "Super Tempura Roll", 6.50)
				 ,new menuItem("tempura_roll", "Tempura Roll", 6.00)
				 ,new menuItem("tuna_roll", "Tuna Roll", 5.00)
				 ,new menuItem("vegetable_roll", "Vegetable Roll", 5.00)
				 ,new menuItem("yellowtail_roll", "Yellowtail Roll", 6.00)
				 ,new menuItem("milwaukee_roll", "Milwaukee Roll", 15.50)
				 ,new menuItem("waukesha_roll", "Waukesha Roll", 14.50)
				 ,new menuItem("rock_n_roe", "Rock 'n Roe Roll", 17.50)
				 ,new menuItem("tuna_loca_roll", "Tuna Loca Roll", 16.50)
				 ,new menuItem("firebreather_roll", "Firebreather Roll", 18.00)
				 ,new menuItem("salmon_sashimi", "Salmon Sashimi", 6.00)
				 ,new menuItem("tuna_sashimi", "Tuna Sashimi", 6.00)
				 ,new menuItem("yellowtail_sashimi", "Yellowtail Sashimi", 6.00)
				 ,new menuItem("salmon_nigiri", "Salmon Nigiri", 6.00)
				 ,new menuItem("tuna_nigiri", "Tuna Nigiri", 6.00)
				 ,new menuItem("yellowtail_sashimi", "Yellowtail Nigiri", 6.00)
				 
				 
				]
				
				
}

