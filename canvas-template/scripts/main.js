//document.addEventListener('click',function(event){});
document.addEventListener('click',function(event){
  var x = event.clientX,
      y = event.clientY;
  layer.push(new Array());
  layer[0].push({
    'shape':'circle',
    'data':{
      'center':{'x':x,'y':y},
      'radius':20
    },
    'fill':{'style':'red'},
    'border':{
      'thickness':3,
      'style':'#077'
    }
  });
  console.log(layer);
  refresh();
});
