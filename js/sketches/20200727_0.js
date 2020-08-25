// Calculate the points
var P = new Point(window.innerWidth * 0.5, window.innerHeight * 0.5);
var d = 20;

var points = [];
for (var i = 0; i < 600; i++) {
  var move = sampleArray([
    [-10, -30],
    [-30, 10],
    [10, -30],
    [30, 10],
    [10, 30],
    [30, -10],
    [-10, 30],
    [-30, -10],
  ]);
  P = new Point(P.x + move[0], P.y + move[1]);
  points.push(P);
}

for (var i = 0; i < points.length; i++) {
  var from = points[i];
  var to = points[i + (1 % points.length)];
  custom_line({
    Point_a: from,
    Point_b: to,
    nsegments: 3,
    wobble: 1,
    stroke_width: 1,
    stroke_color: 'black',
    stroke_cap: 'round',
    dash: false,
  });
}

// Common
function custom_line(specs) {
  // Store relevant variables
  var delta_x = specs.Point_b.x - specs.Point_a.x;
  var delta_y = specs.Point_b.y - specs.Point_a.y;
  var increment_x = delta_x / specs.nsegments;
  var increment_y = delta_y / specs.nsegments;

  // Calculate the points
  var points = [];
  for (var i = 0; i < specs.nsegments; i++) {
    this_point = [
      specs.Point_a.x +
        increment_x * i +
        randFBtwn(-specs.wobble, specs.wobble),
      specs.Point_a.y +
        increment_y * i +
        randFBtwn(-specs.wobble, specs.wobble),
    ];
    points.push(this_point);
  }
  points.push(specs.Point_b);

  // Create path
  var myPath = new Path({
    segments: points,
  });

  // Style path
  myPath.strokeWidth = specs.stroke_width;
  myPath.strokeColor = specs.stroke_color;
  myPath.strokeCap = specs.stroke_cap;
  myPath.smooth();

  if (specs.dash) {
    myPath.dashArray = [8, 18];
  }
}

// Utilities
function randFBtwn(min, max) {
  return min + Math.random() * (max - min);
}

function sampleArray(arr) {
  return arr[Math.floor(randFBtwn(0, arr.length))];
}
