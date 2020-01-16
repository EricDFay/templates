var canvas = document.getElementById('canvasElement');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var layer = new Array();

function drawCircle(object) {
  if(object.fill) {
    context.beginPath();
    context.arc(
      object.data.center.x,
      object.data.center.y,
      object.data.radius,
      0, 2*Math.PI);
    context.fillStyle = object.fill.style;
    context.fill();
  }
  if(object.border) {
    context.beginPath();
    context.arc(
      object.data.center.x,
      object.data.center.y,
      object.data.radius,
      0, 2*Math.PI);
    context.lineWidth = object.border.thickness;
    context.strokeSytle = object.border.style;
    context.stroke();
  }
}
function drawSquare(object) {
  var s = object.data.length;
      x = object.data.center.x - s/2,
      y = object.data.center.y - s/2;
  if(object.fill){
    context.fillStyle = object.fill.style;
    context.fillRect(x,y,s,s);
  }
  if(object.border) {
    context.strokeStyle = object.border.style;
    context.lineWidth = object.border.thickness;
    context.strokeRect(x,y,s,s);
  }
}
function drawRegularPolygon(object) {
 //TODO
}

function refresh() {
  var i;
  for(i=0;i<layer.length;i++) {
    for(var object of layer[i]) {
      switch(object.shape) {
        case 'circle': drawCircle(object);break;
	case 'square': drawSquare(object);break;
	case 'rectangle': break;
	case 'text': break;
      }
    }
  }
}



function point(x,y) {
  drawCircle({
    'data': {
      'center': {'x': x, 'y': y},
      'radius': 2
    },
    'fill': {'style': 'red'},
    'border':{
      'thickness':1,
      'style':'#000'
    }
  });
}
function polygonHelper(vertices) {
  context.beginPath();
  for(var vertex of vertices) {
    context.lineTo(vertex.x, vertex.y);
  }
  context.closePath();
}
function polygon(vertices) {
  context.fillStyle = 'red';
  polygonHelper(vertices);
  context.fill();
  polygonHelper(vertices);
  context.stroke();
}
v = [
  {'x': 10,'y': 10},
  {'x': 10,'y': 50},
  {'x': 30,'y': 50},
  {'x': 50,'y': 80},
  {'x': 50,'y': 10},
  {'x': 30,'y': 20}
];
function regularStarPolygon(p,q,radius) {
  offset = -1/p *Math.PI + 1/4 * 2*Math.PI;
  vertices = [];
  for(var k = 0; k < p; k++) {
    vertices.push({
      'x': radius*Math.cos(((k*q)%p)/p*2*Math.PI + offset),
      'y': radius*Math.sin(((k*q)%p)/p*2*Math.PI + offset)
    });
  }
  polygon(vertices);
}
function regularPolygon(n,r) {
  regularStarPolygon(n,1,r);
}
function text(str) {
  var lastFillStyle = context.fillStyle;
  var lastStrokeStyle = context.strokeStyle;
  var lastLineWidth = context.lineWidth;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.lineWidth = 4;
  context.strokeStyle = '#fff';
  context.strokeText(str,0,0);
  context.fillStyle = '#000';
  context.fillText(str,0,0);
  // set things back
  context.fillStyle = lastFillStyle;
  context.strokeStyle = lastStrokeStyle;
  context.lineWidth = lastLineWidth;
}
var r = 30;
var maxP = 20, minP = 10;
var maxQ = 10, minQ = 1;
for(var q = minQ; q <= maxQ; q++) {
  for(var p = minP; p <= maxP; p++) {
    context.translate((p-minP+0.5)*2*r,(q-minQ+0.5)*2*r);
    regularStarPolygon(p,q,r);
    text('('+p+','+q+')',0,0);
    context.setTransform();
  }
}
