function wrapText(ctx, text, x, y, maxWidth, lineHeight, fontSize, align) {
	if(typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
		return;
	}
	var arrText = text.split('');
	var line = '';
	for(let i = 0; i < arrText.length; i++) {
		var testLine = line + arrText[i];
		var metrics = ctx.measureText(testLine);
		var testWidth = metrics.width;
		ctx.setFontSize(fontSize);
		  if ((testWidth*2)>=maxWidth){
		ctx.setTextAlign(align);
		ctx.fillText(line, x, y);
		line = arrText[i];
		y += lineHeight * lineHeight / 10;
		that.setData({
			windowHeight: that.data.windowHeight + lineHeight * 2,
		})
	} else {
		line = testLine;
	}
}
ctx.fillText(line, x, y);
}