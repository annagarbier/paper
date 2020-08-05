// Paramaterized fuzzy blobs, smaller.

var white = new Color('#f3ecc2');
var yellow = new Color('#f9d56e');
var black = new Color('#36454f');
var red = new Color('#e8505b');
var green = new Color('#14b1ab');

var colors = [yellow, red, green, white];
var rcolor;
var diam_min = window.innerWidth * 0.05;
var diam_max = window.innerWidth * 0.15;
var left_frame = window.innerWidth * 0.25;
var right_frame = window.innerWidth * 0.75;
var top_frame = window.innerHeight * 0.25;
var bottom_frame = window.innerHeight * 0.75;

var elements = [];

// Texture 0
var texture0 = new Group();
rcolor = sampleArray(colors);
for (var x = 0; x < window.innerWidth; x += 3) {
  for (var y = 0; y < window.innerHeight; y += 60) {
    custom_line({
      Point_a: new Point(x, y + 1),
      Point_b: new Point(x + 30, y + 60),
      nsegments: 20,
      wobble: 20,
      stroke_width: 0.15,
      stroke_color: rcolor,
      stroke_cap: 'round',
      dash: false,
      parent: texture0,
    });
  }
}

// Texture 1
var texture1 = new Group();
rcolor = sampleArray(colors);
for (var x = 0; x < window.innerWidth; x += 3) {
  for (var y = 0; y < window.innerHeight + 60; y += 60) {
    custom_line({
      Point_a: new Point(x, y),
      Point_b: new Point(x + 30, y + 60),
      nsegments: 20,
      wobble: 20,
      stroke_width: 0.15,
      stroke_color: rcolor,
      stroke_cap: 'round',
      dash: false,
      parent: texture1,
    });
  }
}

// Texture 2
var texture2 = new Group();
rcolor = sampleArray(colors);
for (var x = 0; x < window.innerWidth; x += 3) {
  for (var y = 0; y < window.innerHeight + 60; y += 60) {
    custom_line({
      Point_a: new Point(x, y),
      Point_b: new Point(x + 30, y + 60),
      nsegments: 20,
      wobble: 20,
      stroke_width: 0.15,
      stroke_color: rcolor,
      stroke_cap: 'round',
      dash: false,
      parent: texture2,
    });
  }
}

// Mask 0
var mask0 = new Group();
for (var i = 0; i < 2; i++) {
  var diam = randFBtwn(diam_min, diam_max);
  custom_ellipse({
    Point_center: new Point(
      randFBtwn(left_frame, right_frame),
      randFBtwn(top_frame, bottom_frame)
    ),
    width: diam,
    height: diam,
    nsegments: 10,
    wobble: 15,
    stroke_width: 2,
    stroke_color: yellow,
    fill_color: black,
    stroke_cap: 'round',
    dash: false,
    parent: mask0,
  });
}

// Mask 1
var mask1 = new Group();
for (var i = 0; i < 4; i++) {
  var diam = randFBtwn(diam_min, diam_max);
  custom_ellipse({
    Point_center: new Point(
      randFBtwn(left_frame, right_frame),
      randFBtwn(top_frame, bottom_frame)
    ),
    width: diam,
    height: diam,
    nsegments: 10,
    wobble: 15,
    stroke_width: 2,
    stroke_color: black,
    fill_color: black,
    stroke_cap: 'round',
    dash: false,
    parent: mask1,
  });
}

// Mask 2
var mask2 = new Group();
for (var i = 0; i < 4; i++) {
  var diam = randFBtwn(diam_min, diam_max);
  custom_ellipse({
    Point_center: new Point(
      randFBtwn(left_frame, right_frame),
      randFBtwn(top_frame, bottom_frame)
    ),
    width: diam,
    height: diam,
    nsegments: 10,
    wobble: 15,
    stroke_width: 2,
    stroke_color: black,
    fill_color: black,
    stroke_cap: 'round',
    dash: false,
    parent: mask2,
  });
}

// Clip 1
var clip1 = new Group(mask1, texture1);
clip1.clipped = true;

// Clip 0
var clip0 = new Group(mask0, texture0);
clip0.clipped = true;

// Clip 2
var clip2 = new Group(mask2, texture2);
clip2.clipped = true;

// Background
var bg = new Path.Rectangle({
  point: [0, 0],
  size: [view.size.width, view.size.height],
  selected: false,
});
bg.sendToBack();
bg.fillColor = black;

// Create mask
// var mask = bg;
// for (var i = 0; i < elements.length; i++) {
//   mask = mask.subtract(elements[i]);
// }
// mask.strokeColor = white;
// mask.strokeWidth = 2;
// mask.opacity = 0.3;
// mask.fillColor = black;
// mask.bringToFront();

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
