var white = new Color('#f3ecc2');
var yellow = new Color('#f9d56e');
var black = new Color('#36454f');

var diam = window.innerWidth * 0.1;
var nsegments = 20;
var wobble = 8;

var elements = [];

for (var i = 0; i < 5; i++) {
  custom_ellipse({
    Point_center: new Point(
      randFBtwn(window.innerWidth * 0.3, window.innerWidth * 0.7),
      randFBtwn(window.innerHeight * 0.3, window.innerHeight * 0.7)
    ),
    width: diam,
    height: diam,
    nsegments: nsegments,
    wobble: wobble,
    stroke_width: 0,
    stroke_color: black,
    fill_color: white,
    stroke_cap: 'round',
    opacity: 1,
    dash: false,
  });
}

for (var x = 0; x < window.innerWidth; x += 3) {
  for (var y = 0; y < window.innerHeight; y += 60) {
    custom_line({
      Point_a: new Point(x, y + 1),
      Point_b: new Point(x + 20, y + 60),
      nsegments: 4,
      wobble: 0.5,
      stroke_width: 2,
      stroke_color: black,
      stroke_cap: 'round',
      dash: false,
    });
  }
}

// Background
var bg = new Path.Rectangle({
  point: [0, 0],
  size: [view.size.width, view.size.height],
  selected: false,
});
bg.sendToBack();
bg.fillColor = white;

// Create mask
var mask = bg;
for (var i = 0; i < elements.length; i++) {
  mask = mask.subtract(elements[i]);
}
mask.strokeColor = white;
mask.strokeWidth = 1;
mask.fillColor = black;
mask.bringToFront();

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

  // elements.push(myPath);
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
