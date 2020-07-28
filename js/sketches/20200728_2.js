var white = new Color('#f3ecc2');
var yellow = new Color('#f9d56e');
var black = new Color('#36454f');

var diam = window.innerWidth * 0.2;
var nsegments = 20;
var wobble = 5;

var elements = [];

custom_ellipse({
  Point_center: new Point(window.innerWidth * 0.5, window.innerHeight * 0.5),
  width: diam,
  height: diam,
  nsegments: nsegments,
  wobble: wobble,
  stroke_width: 1,
  stroke_color: black,
  fill_color: yellow,
  stroke_cap: 'round',
  opacity: 1,
  dash: false,
});

for (var y = 0; y < 1; y += 0.007) {
  custom_line({
    Point_a: new Point(window.innerWidth * 0.1, window.innerHeight * y),
    Point_b: new Point(window.innerWidth * 0.9, window.innerHeight * y),
    nsegments: 15,
    wobble: 1,
    stroke_width: 0,
    stroke_color: 'purple',
    stroke_cap: 'round',
    dash: false,
  });
}

// Intersection
var intersections = [];
for (var i = 0; i < elements.length - 1; i++) {
  var intersection = elements[0].intersect(elements[i + 1]);
  intersection.strokeColor = black;
  intersection.strokeWidth = 1;
}

// Background - toggle for black background
var bg = new Path.Rectangle({
  point: [0, 0],
  size: [view.size.width, view.size.height],
  selected: false,
});
bg.sendToBack();
bg.fillColor = white;

/* COMMON **********************************************************/
// custom_line accepts an object containing line specs,
// and draws a corresponding line with a few custom
// features like a bit of wobbly-ness for a hand-drawn
// feeling.
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

  elements.push(myPath);
}

// custom_ellipse accepts an object containing ellipse specs,
// and draws a corresponding ellipse with a few custom
// features like a bit of wobbly-ness for a hand-drawn
// feeling.
function custom_ellipse(specs) {
  // Calculate the points
  var points = [];
  for (var i = 0; i < specs.nsegments; i++) {
    var segment_incrementer = (Math.PI * 2) / specs.nsegments;
    var this_theta = segment_incrementer * i;
    this_point = [
      specs.Point_center.x +
        specs.width * Math.cos(this_theta) +
        randFBtwn(-specs.wobble, specs.wobble),
      specs.Point_center.y +
        specs.height * Math.sin(this_theta) +
        randFBtwn(-specs.wobble, specs.wobble),
    ];
    points.push(this_point);
  }

  // Create path
  var myPath = new Path({
    segments: points,
  });

  // Style path
  myPath.strokeWidth = specs.stroke_width;
  myPath.strokeColor = specs.stroke_color;
  myPath.strokeCap = specs.stroke_cap;
  myPath.closed = true;
  myPath.smooth();

  if (specs.dash) {
    myPath.dashArray = [3, 3];
  }

  myPath.fillColor = specs.fill_color;
  myPath.opacity = specs.opacity;

  elements.push(myPath);
}

// Utilities using Math.random
function randFBtwn(min, max) {
  return min + Math.random() * (max - min);
}
function sampleArray(arr) {
  return arr[Math.floor(randFBtwn(0, arr.length))];
}
