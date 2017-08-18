'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // black;
  ctx.fillRect(110, 20, 420, 270);
  //ctx.strokeRect(110, 20, 420, 270);

  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)'; // white;
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:!', 120, 60);

  var max = -1;
  var maxIndex = -1;

  for (var i = 0 ; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
      maxIndex = i;
    }
  }
  
  var histogramWidth = 150;              // px;
  var step = histogramWidth / (max - 0); // px;
  
  ctx.fillText('Худшее время: ' + max.toFixed(2) + 'мс у игрока ' + names[maxIndex], 120, 80);
  
  var barHeigth = 20; // px; 
  var indent = 40;    // px;
  var initialX = 120; // px;
  var initialY = 100;  // px;
  
  ctx.textBaseline = 'top'; // положение надписи от левого верхнего угла
  for(var i = 0; i < times.length; i++) {
    ctx.fillRect(initialX, initialY + indent * i, times[i] * step, barHeigth);
    ctx.fillText(names[i], initialX + histogramWidth, initialY + indent * i);
  }
};
