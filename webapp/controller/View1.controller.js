sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

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
			var timer = setInterval(startCountDown, interval);

		}

	});
});