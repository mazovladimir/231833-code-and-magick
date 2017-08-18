'use strict';

window.renderStatistics = function (ctx, names, times) {
  function drawCloud(x, y, sizeHorizontal, sizeVertical, color) {
    ctx.fillStyle = color;
    ctx.strokeRect(x, y, sizeHorizontal, sizeVertical);
    ctx.fillRect(x, y, sizeHorizontal, sizeVertical);
  }  

  function getRandom(max, min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; 
  ctx.fillRect(110, 20, 420, 270);

  drawCloud(100, 10, 420, 270, 'rgba(256, 256, 256, 1.0)');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = -1;

  for (var i = 0 ; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }
  
  var histogramHeight = 150;              
  var step = histogramHeight / (max - 0);

  var barWidth = 40; 
  var indent = 90;  
  var initialX = 150;
  var initialY = 240; 
  
  ctx.textBaseline = 'top';
  for(var i = 0; i < times.length; i++) {
    if (names[i] !== 'Вы') {
      ctx.fillStyle = 'rgba(0, 0, 250, ' +  getRandom(1,0) + ')';
    } else {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(initialX + indent * i, initialY, barWidth, times[i] * -step);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], initialX + indent * i, initialY + 5);
    ctx.fillText(Math.round(times[i]), initialX + indent * i, initialY - times[i] * step - 20);
  }
};
