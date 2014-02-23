
//  
//  WebCC
//  Made by 1lann and GravityScore
//  



var canvas = document.getElementById("canvas");
var overlayCanvas = document.getElementById("overlay-canvas");

var context = canvas.getContext("2d");
var overlayContext = overlayCanvas.getContext("2d");


context.font = "16px 'minecraftia'";
overlayContext.font = "16px 'minecraftia'";


var loaded = false;
var render = {};



//  ----------------  Rendering Functions  ----------------  //


render.character = function(x, y, text, foreground, background, ctx) {
	if (typeof(ctx) == "undefined") {
		ctx = context;
	}

	if (x >= 1 && y >= 1 && x <= term.width && y <= term.height) {
		var offset = 0;
		if (typeof(globals.offsets[text]) != "undefined") {
			offset = globals.offsets[text];
		}

		var cellX = ((x - 1) * config.cellWidth + config.borderWidth);
		var cellY = ((y - 1) * config.cellHeight + config.borderHeight);

		var textX = ((x - 1) * config.cellWidth) + config.borderWidth + 1 + offset;
		var textY = (y * config.cellHeight);

		ctx.beginPath();
		if (typeof(background) != "undefined") {
			ctx.rect(cellX, cellY, config.cellWidth, config.cellHeight);
			ctx.fillStyle = background;
			ctx.fill();
		}

		ctx.fillStyle = foreground;
		ctx.fillText(text, textX, textY);
	}
}


render.text = function(x, y, text, foreground, background, ctx) {
	if (x >= 1 && y >= 1 && x <= term.width && y <= term.height) {
		for (var i = 0; i < text.length; i++) {
			render.character(x + i, y, text.charAt(i), foreground, background, ctx);
		}
	}
}


render.cursorBlink = function() {
	if (term.cursorBlink && term.cursorFlash) {
		overlayContext.clearRect(0, 0, canvas.width, canvas.height);
		render.text(term.cursorX, term.cursorY, "_", term.textColor, undefined, overlayContext);
	} else {
		overlayContext.clearRect(0, 0, canvas.width, canvas.height);
	}
}
