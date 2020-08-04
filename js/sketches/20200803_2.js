var white = new Color('#fcf6f0');
var yellow = new Color('#f9d56e');
// var black = new Color('#36454f');
// var white = new Color('white');
var black = new Color('black');
var elements = [];

// Texture 0
var texture0 = new Group();
for (var x = 0; x < window.innerWidth; x += 5) {
  for (var y = 0; y < window.innerHeight; y += 60) {
    custom_line({
      Point_a: new Point(x, y + 1),
      Point_b: new Point(x + 60, y + 60),
      nsegments: 30,
      wobble: 80,
      stroke_width: 0.05,
      stroke_color: black,
      stroke_cap: 'round',
      dash: false,
      parent: texture0,
    });
  }
}

// Texture 1
var texture1 = new Group();
for (var x = 0; x < window.innerWidth; x += 5) {
  for (var y = 0; y < window.innerHeight + 60; y += 60) {
    custom_line({
      Point_a: new Point(x, y),
      Point_b: new Point(x + 20, y - 60),
      nsegments: 30,
      wobble: 80,
      stroke_width: 0.05,
      stroke_color: white,
      stroke_cap: 'round',
      dash: false,
      parent: texture1,
    });
  }
}

// Mask 0
var mask0 = new Group();
for (var i = 0; i < 5; i++) {
  var diam = randFBtwn(50, 100);
  custom_ellipse({
    Point_center: new Point(
      view.center.x + randFBtwn(-400, 400),
      view.center.y + randFBtwn(-400, 400)
    ),
    width: diam,
    height: diam,
    nsegments: 10,
    wobble: 15,
    stroke_width: 2,
    stroke_color: white,
    fill_color: black,
    stroke_cap: 'round',
    dash: false,
    parent: mask0,
  });
}

// Mask 1
var mask1 = new Group();
for (var i = 0; i < 16; i++) {
  var diam = randFBtwn(100, 250);
  custom_ellipse({
    Point_center: new Point(
      view.center.x + randFBtwn(-400, 400),
      view.center.y + randFBtwn(-400, 400)
    ),
    width: diam,
    height: diam,
    nsegments: 20,
    wobble: 8,
    stroke_width: 2,
    stroke_color: white,
    fill_color: black,
    stroke_cap: 'round',
    dash: false,
    parent: mask1,
  });
}

// Clip 1
var clip1 = new Group(mask1, texture1);
clip1.clipped = true;

// Clip 0
var clip0 = new Group(mask0, texture0);
clip0.clipped = true;

// Background
var bg = new Path.Rectangle({
  point: [0, 0],
  size: [view.size.width, view.size.height],
  selected: false,
});
bg.sendToBack();
bg.fillColor = black;

// Create mask
var mask = bg;
for (var i = 0; i < elements.length; i++) {
  mask = mask.subtract(elements[i]);
}
mask.strokeColor = white;
mask.strokeWidth = 0.25;
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

  myPath.parent = specs.parent;
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

  myPath.parent = specs.parent;
  elements.push(myPath);
}

// Utilities using Math.random
function randFBtwn(min, max) {
  return min + Math.random() * (max - min);
}
function sampleArray(arr) {
  return arr[Math.floor(randFBtwn(0, arr.length))];
}
