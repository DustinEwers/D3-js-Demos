
var w = 1200,
    h = 800;

var speed = 5,
    xm = speed,
    ym = speed,
    pad= 10,
    bounces = 2,
    targetNode = 1;
    pursuitFunction = moveChaserBounce,
    numNodes = 200;

var nodes = d3.range(numNodes).map(function() { return {radius: Math.random() * 12 + 4}; }),
    color = d3.scale.category20b();

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
    .style("fill", function(d, i) { return i===0 ? "AD0000" : color(i % 5); });

force.on("tick", function(e) {
  var q = d3.geom.quadtree(nodes),
      i = 0,
      n = nodes.length;

  pursuitFunction(root);

  while (++i < n) {
    q.visit(collide(nodes[i]));
  }

  svg.selectAll("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });

  force.resume();
});

var bounceCount = 0;
function moveChaserBounce(node){
  if(root.px >= w-pad || root.px <=pad ){
    xm *= -1;
    bounceCount++;
  }

  if(root.py >= h-pad || root.py <= pad){
    ym *= -1;
    bounceCount++;
  }

  if(bounceCount >= bounces){
   bounceCount = 0;
   pursuitFunction = moveChaserPursue;
  }

  root.px += xm;
  root.py += ym;
}

function moveChaserPursue(node){
  var sheep = nodes[targetNode];
  
  if(sheep.py > h || sheep.py < pad || sheep.px > w || sheep.px < pad){
    if(targetNode > numNodes){
      targetNode = 0;
    }
    targetNode++;
    pursuitFunction = moveChaserBounce;
  }

  root.px = root.px < sheep.px? root.px + speed : root.px - speed;
  root.py = root.py < sheep.py? root.py + speed : root.py - speed;
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
