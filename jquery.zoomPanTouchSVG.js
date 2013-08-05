/**
 * File: 	touchableZoomablePannableSVG.js
 * Author: 	Max Chadwick
 *
 * This jQuery plugin zooms and pans an SVG by altering the viewBox attribute.
 * For the plugin to function properly the SVG must initially have a viewBox attribute
 * set to exactly contain the contents of the SVG.
 */

(function($) {

	$.fn.zoomPanTouchSVG = function( options ) {
		
		/**
		 * Initial settings
		 */ 
		var settings = $.extend({		
			zoomLevels: 		"150, 200, 250, 300, 350",
			initialZoom: 		"100",
			initialMinX: 		false, 						// Important! If initial minX is 0 must be in quotes or else it is registered as false
			initialMinY: 		false, 
			zoomInText: 		"Zoom In",
			zoomOutText: 		"Zoom Out",
			zoomBtnContainer: 	false,						// Element ID including "#"
			zoomInBtnSrc: 		false,						// In case an image is desired
			zoomOutBtnSrc: 		false		
		}, options);

		
		/** 
		 * Cache, setup
		 */
		var $this = 				$(this);				
		var jsThis = 				document.getElementById($this.attr("id"));		
		var masterViewBoxArr = 		jsThis.getAttribute('viewBox').split(" ");
		
		var zoomLevels = 			settings.zoomLevels.split(", ")
									zoomLevels.push(settings.initialZoom);
									zoomLevels.sort(function(a,b) {return a-b});
		
		var viewBoxDims = 			new Array();
		var curZoomIndex =			0; // Index is incremented and decremented during zoom in and out

		for(i = 0; i < zoomLevels.length; i++) { // Store the viewBox width and heights for each zoom level
			var viewBoxWidth = masterViewBoxArr[2] / (zoomLevels[i] / 100);
		 	var viewBoxHeight = masterViewBoxArr[3] / (zoomLevels[i] / 100);
		 	viewBoxDims[i] = viewBoxWidth + " " + viewBoxHeight;
		 	if(zoomLevels[i] == settings.initialZoom) { // If we're at the initial zoom
		 		curZoomIndex = i;
		 		if(!settings.initialMinX) {
		 			var minx = (masterViewBoxArr[2] - viewBoxWidth) / 2; // Center by default
		 		} else {
		 			var minx = parseInt(settings.initialMinX);
		 			if((minx + parseInt(viewBoxWidth)) > parseInt(masterViewBoxArr[2])) {
		 				minx = parseInt(masterViewBoxArr[2]) - parseInt(viewBoxWidth);
		 			}
		 		}
		 		if(!settings.initialMinY) {
		 			var miny = (masterViewBoxArr[3] - viewBoxHeight) / 2;
		 		} else {
		 			var miny = settings.initialMinX;
		 			if((miny + parseInt(viewBoxHeight)) > parseInt(masterViewBoxArr[3])) {
		 				miny = parseInt(masterViewBoxArr[3]) - parseInt(viewBoxHeight);
		 			}
		 		}
		 		jsThis.setAttribute('viewBox', minx + " " + miny + " " + viewBoxWidth + " " + viewBoxHeight);
		 	}
		}


		/** 
		 * Append zoom in and zoom out button
		 */ 

		// Elements that get appended need an index number in case there are multiple instances
		// of the plugin
		var zoomInBtns = $('*[id^="tZPSVGZoomIn"]'); 
		if(!zoomInBtns) {
			tzpIndex = 0
		} else {
			tzpIndex = zoomInBtns.length;
		}

		var zoomInBtnID = 'tZPSVGZoomIn' + tzpIndex;
		if(!settings.zoomInBtnSrc) {
			var zoomInBtnHTML = '<button class="tZPSVGBtn" id="' + zoomInBtnID + '">' + settings.zoomInText + '</button>';
		} else {
			var zoomInBtnHTML = '<img src="' + options.zoomInSrc + '" id="' + zoomInBtnID + '">';
		}
		
		var zoomOutBtnID = 'tZPSVGZoomOut' + tzpIndex;
		if(!settings.zoomOutBtnSrc) {
			var zoomOutBtnHTML = '<button class="tZPSVGBtn" id="' + zoomOutBtnID + '">' + settings.zoomOutText + '</button>';
		} else {
			var zoomOutBtnHTML = '<img src="' + options.zoomOutSrc + '" id="' + zoomOutBtnID + '">';
		}

		if(!settings.zoomBtnContainer) {
			zoomBtnContainerID = 'tZPSVGBtnContainer' + tzpIndex;
			$this.after('<div id="' + zoomBtnContainerID + '">' + zoomInBtnHTML + zoomOutBtnHTML + '</div>');
		} else {
			var zoomBtnContainer = $(settings.zoomBtnContainer);
			zoomBtnContainer.html(zoomInBtnHTML + zoomOutBtnHTML);
		}


		/**
		 * Zoom in and out functionality
		 */
		 function zoom(direction) {
		 	if(direction == 'in' && curZoomIndex == (zoomLevels.length - 1)) {
		 		return false;
		 	} else if (direction == 'out' && curZoomIndex == 0){
				return false
		 	} else { // OK to zoom!
		 		if(direction == 'in') {
		 			curZoomIndex++;
		 		} else {
		 			curZoomIndex--;
		 		}
		 		var curViewBoxArr = jsThis.getAttribute('viewBox').split(" ");
		 		var nextViewBoxDimsArr = viewBoxDims[curZoomIndex].split(" ");
		 		var minx = parseInt(curViewBoxArr[0]) + parseInt((parseInt(curViewBoxArr[2]) - parseInt(nextViewBoxDimsArr[0])) / 2);
		 		minx = parseInt(minx);
		 		if(minx < 0) { // Too far left!
		 			minx = 0;
		 		} else if((minx + parseInt(nextViewBoxDimsArr[0])) > parseInt(masterViewBoxArr[2])) { // Too far right!
		 			minx = parseInt(masterViewBoxArr[2]) - parseInt(nextViewBoxDimsArr[0]);
		 		}
		 		var miny = parseInt(curViewBoxArr[1]) + parseInt((parseInt(curViewBoxArr[3]) - parseInt(nextViewBoxDimsArr[1])) / 2);
		 		var miny = parseInt(miny);
		 		if(miny < 0) { // Too far up!
		 			miny = 0;
		 		} else if((miny + parseInt(nextViewBoxDimsArr[1])) > parseInt(masterViewBoxArr[3])) { // Too far down!
		 			miny = parseInt(masterViewBoxArr[3]) - parseInt(nextViewBoxDimsArr[1]);
		 		}
		 		jsThis.setAttribute("viewBox", parseInt(minx) + " " + parseInt(miny) + " " + nextViewBoxDimsArr[0] + " " + nextViewBoxDimsArr[1]);
		 	}
		 }

		// Bind zoom function to Zoom In and Zoom Out buttons
		
		$('#' + zoomInBtnID).click(function() {
			zoom('in');
		})
		$('#' + zoomOutBtnID).click(function() {
			zoom('out');
		})


		/**
		 * Touchable Pannable Functionality
		 */
		var mouseTouchEvent = false;

		function registerMouseTouchEvent(event) {
			mouseTouchEvent = true;
			if(!event.touches) {
				startX = event.clientX;
				startY = event.clientY;
			} else {
				startX = event.touches[0].clientX;
				startY = event.touches[0].clientY;
			}
			event.preventDefault();
		}

		function unregisterMouchTouchEvent(event) {
			mouseTouchEvent = false;
			//event.preventDefault();
		}

		function drag(event) {
			
			if(mouseTouchEvent) {			
				
				if(!event.touches) {
					var dX = startX - event.clientX;
					var dY = startY - event.clientY;
				} else {
					var dX = startX - event.touches[0].clientX;
					var dY = startY - event.touches[0].clientY;
				}

				var curViewBoxArr = jsThis.getAttribute('viewBox').split(" ");

				if(dX < 0 && curViewBoxArr[0] < 0) {
					dX = 0
				} else if(dX > 0 && (parseInt(curViewBoxArr[2]) + parseInt(curViewBoxArr[0]) > masterViewBoxArr[2])) {
					dX = 0
				} else if(dY < 0 && curViewBoxArr[1] < 0) {
					dY = 0;
				} else if(dY > 0 && (parseInt(curViewBoxArr[3]) + parseInt(curViewBoxArr[1]) > masterViewBoxArr[3])) {
					dY = 0;
				}

				var newMinX = parseInt(curViewBoxArr[0]) + (parseInt(dX));
				if(newMinX < 0) {
					newMinX = 0;
				}
				var newMinY = parseInt(curViewBoxArr[1]) + (parseInt(dY));
				if(newMinY < 0) {
					newMinY = 0;
				}
				jsThis.setAttribute('viewBox', newMinX + " " + newMinY + " " + curViewBoxArr[2] + " " + curViewBoxArr[3]);
				
				if(!event.touches) {
					startX = event.clientX;
					startY = event.clientY;
				} else {
					startX = event.touches[0].clientX;
					startY = event.touches[0].clientY;
				}

				event.preventDefault();

			}

		}

		jsThis.onmousedown = registerMouseTouchEvent;
		jsThis.ontouchstart = registerMouseTouchEvent;
		
		jsThis.onmouseup = unregisterMouchTouchEvent;
		jsThis.ontouchend = unregisterMouchTouchEvent;
		
		jsThis.onmousemove = drag;
		jsThis.ontouchmove = drag;

		return this;

	}

}(jQuery));