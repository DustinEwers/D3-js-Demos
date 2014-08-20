
var w = 1000,
    h = 800;

var nodes = d3.range(200).map(function() { return {radius: Math.random() * 12 + 4}; }),
    color = d3.scale.category10();

var force = d3.layout.force()
    .gravity(0.05)
    .charge(function(d, i) { return i ? 0 : -2000; })
    .nodes(nodes)
    .size([w, h]);

var root = nodes[0];
root.radius = 15;
root.fixed = true;

force.start();

var svg = d3.select("#body").append("svg")
    .attr("width", w)
    .attr("height", h);

svg.selectAll("circle")
    .data(nodes)
  .enter().append("svg:circle")
    .attr("r", function(d) { return d.radius - 2; })
    .style("fill", function(d, i) { return i===0 ? "AD0000" : color(i % 3); });

force.on("tick", function(e) {
  var q = d3.geom.quadtree(nodes),
      i = 0,
      n = nodes.length;

  moveChaserPursue(root);

  while (++i < n) {
    q.visit(collide(nodes[i]));
  }

  svg.selectAll("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });

  force.resume();
});

  /*
svg.on("mousemove", function() {

  var p1 = d3.mouse(this);
  root.px = p1[0];
  root.py = p1[1];
  force.resume();
});
  */


var xm = 5,
    ym = 5,
    pad= 10;

function moveChaserBounce(node){
  if(root.px >= w-pad || root.px <=pad ){
    xm *= -1;
  }

  if(root.py >= h-pad || root.py <= pad){
    ym *= -1;
  }

  root.px += xm;
  root.py += ym;
}


var speed = 5;
function moveChaserPursue(node){
  // TODO - Change it so that it picks one node to chase, and then chases a new node when the first one leaves the box
  var sheep = nodes.slice(50, 51);
  
  var x = sheep.reduce(function(prev, curr, index){
    return prev + curr.x;
  }, 0);

  x = x / sheep.length;

  var y = sheep.reduce(function(prev, curr, index){
    return prev + curr.y;
  }, 0);

  y = y / sheep.length;

  root.px = root.px < x? root.px + speed : root.px - speed;
  root.py = root.py < y? root.py + speed : root.py - speed;
}

function collide(node) {
  var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2
        || x2 < nx1
        || y1 > ny2
        || y2 < ny1;
  };
}
