# jQuery.zoomPanTouchSVG

*jQuery.zoomPanTouchSVG* is a jQuery plugin that utilizes the SVG `viewBox` attribute to Zoom In, Zoom Out and Pan around an SVG. 

For each element the plugin is called on, a Zoom In and Zoom Out button is appended to the DOM. Those buttons zoom to different percentages of the SVG's `viewBox` width and height.

Panning is possible either by dragging with the mouse, or by touch dragging on touch enabled devices.

## Example

Check out *jquery.zoomPanTouchSVG* live and in action [here](http://mpchadwick.github.io/jquery.zoomPanTouchSVG/index.html)...

## Usage

Calling *jQuery.zoomPanTouchSVG* on an SVG should look very familiar...

```
$('#mySVG').zoomPanTouchSVG();
```

### Notes

1) For *jQuery.zoomPanTouchSVG* to work, the SVG's `viewBox` attribute must be set to the SVGs width and height with zero offset in both the x and y direction!

2) In your CSS please be sure to make the following declaration as old versions of Internet Explorer display SVG overflow

```
svg {
	overflow: hidden;
}
```

3) The plugin requires SVGs to be embedded inline in HTML pages

4) **PRO TIP:** If you are doing fluid width SVGs use [this gist](https://gist.github.com/pfulton/4259378) to address a bug in Webkit browsers where height is incorrectly calculated

## Options

The following options are available to customize *jquery.zoomPanTouchSVG*'s behavior...

**zoomLevels:** A comma separated list of percentages to zoom to. Numbers should not contain percentage symbol. By default zoomLevels is set as follows... `"150, 200, 250, 300, 350"`

**initialZoom:** Percentage at which SVG is zoomed to initially. Number should not contain the percentage symbol. The default initial zoom is `100`

**initialMinX:** Initial offset on the x axis. By default the viewBox is initially centered horizontally. When setting the initialMinX if the value is `"0"` it must be in quotations!

**initialMinY:** Intial offset on the y asis. By default the viewBox is initially centered vertically. When setting the initialMinY if the value is `"0"` it must be in quotations!

**zoomInText:** Text used when displaying the Zoom In button. Defaults to `"Zoom In"`

**zoomOutText:** Text used when displaying the Zoom Out button. Defaults to `"Zoom Out"`

**zoomBtnContainer:** ID of element in which to place the Zoom In and Zoom Out buttons, including the `#` symbol. By default the buttons are placed in a new `<div>` which is appended to the DOM directly after the SVG element.

**zoomInBtnSrc:** The source of the image file to use for the Zoom In button. By default a `<button>` is used rather than an image.

**zoomOutBtnSrc:** The source of the image file to use for the Zoom Out button. By default a `<button>` is used rather than an image.

## Browser Support

SVG is not supported by IE < 9 and Android Browser < 3.0. 

If you require support for legacy IE look into [RaphaelJS](http://raphaeljs.com/). If you require support for legacy Android look into the [HTML 5 Canvas Element](http://www.w3schools.com/html/html5_canvas.asp).