sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var map;

	return Controller.extend("sit.controller.View1", {
		onInit: function() {
			this.counter = 0;
			var interval = 1200;
			var oview = this.getView();
			
			function startCountDown() {

				// distance 
				var aData = jQuery.ajax({
					type: "GET",
					contentType: "application/json",
					//url: "https://us.wio.seeed.io/v1/node/GroveUltraRangerD0/",
					dataType: "json",
					async: false,
					success: function(data, textStatus, jqXHR) {
						//oModel.setData({modelData : data}); 
						//alert("success to post");
					}
				});
				var distance = JSON.parse(aData.responseText);
				//var oModel = new sap.ui.model.json.JSONModel({ greetingText: "Hi, my name is Harry Hawk"});
				var oModel = new sap.ui.model.json.JSONModel(distance);
				// Assign the model object to the SAPUI5 core
				sap.ui.getCore().setModel(oModel, 'temp');
				var element = oview.byId("__labelDistanceValue");
				element.setText(distance.range_cm);
			}
			//var timer = setInterval(startCountDown, interval);

		},
			onAfterRendering: function() {		
			document.getElementById('idMaps1--map_canvas').setAttribute("style","height:80vh; width:80vh");				
			//this.byId('map_canvas').setAttribute("style","height:100vh");				
			google.maps.event.addDomListener(window, 'load', this.initMap());
			this.findLocation();

		},
		findLocation: function(){
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(function(position){
				var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
				map.setCenter(pos);
				var infowindow = new google.maps.InfoWindow({
			        map: map,
			        position: pos,
			        content: 'This is you Location\n'+pos 
			      });
					});
			}
		
		},
		initMap: function(){
				var mapOptions = {
					    			zoom: 6
								};
				map = new google.maps.Map(document.getElementById('idMaps1--map_canvas'),mapOptions);
		
		}

	});
});