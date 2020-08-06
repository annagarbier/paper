// Paramaterized fuzzy blobs, smaller.

var yellow = new Color('#f6d55c');
var navy = new Color('#173f5f');
var red = new Color('#ed553b');
var green = new Color('#3caea3');
var blue = new Color('#20639b');

var colors = [navy, red, green, blue, yellow];
var rcolor;
var diam_min = window.innerHeight * 0.1;
var diam_max = window.innerHeight * 0.25;
var left_frame = window.innerWidth * 0.25;
var right_frame = window.innerWidth * 0.75;
var top_frame = window.innerHeight * 0.25;
var bottom_frame = window.innerHeight * 0.75;

var elements = [];

// Texture 0
var texture0 = new Group();
rcolor = sampleArray(colors);
for (var x = 0; x < window.innerWidth; x += 2) {
  for (var y = 0; y < window.innerHeight; y += 60) {
    custom_line({
      Point_a: new Point(x, y + 1),
      Point_b: new Point(x + 30, y + 60),
      nsegments: 30,
      wobble: 40,
      stroke_width: 0.1,
      stroke_color: rcolor,
      // stroke_color: green,
      stroke_cap: 'round',
      dash: false,
      parent: texture0,
    });
  }
}

// Texture 1
var texture1 = new Group();
rcolor = sampleArray(colors);
for (var x = 0; x < window.innerWidth; x += 2) {
  for (var y = 0; y < window.innerHeight + 60; y += 60) {
    custom_line({
      Point_a: new Point(x, y),
      Point_b: new Point(x + 30, y + 60),
      nsegments: 30,
      wobble: 40,
      stroke_width: 0.1,
      stroke_color: rcolor,
      // stroke_color: yellow,
      stroke_cap: 'round',
      dash: false,
      parent: texture1,
    });
  }
}

// Texture 2
var texture2 = new Group();
rcolor = sampleArray(colors);
for (var x = 0; x < window.innerWidth; x += 2) {
  for (var y = 0; y < window.innerHeight + 60; y += 60) {
    custom_line({
      Point_a: new Point(x, y),
      Point_b: new Point(x + 30, y + 60),
      nsegments: 30,
      wobble: 40,
      stroke_width: 0.1,
      // stroke_color: rcolor,
      stroke_color: navy,
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
  var this_nsegments = Math.floor(diam * 0.08);
  var this_wobble = Math.floor(diam * 0.1);
  custom_ellipse({
    Point_center: new Point(
      randFBtwn(left_frame, right_frame),
      randFBtwn(top_frame, bottom_frame)
    ),
    width: diam,
    height: diam,
    nsegments: this_nsegments,
    wobble: this_wobble,
    stroke_width: 2,
    stroke_color: yellow,
    fill_color: navy,
    stroke_cap: 'round',
    dash: false,
    parent: mask0,
  });
}

// Mask 1
var mask1 = new Group();
for (var i = 0; i < 4; i++) {
  var diam = randFBtwn(diam_min, diam_max);
  var this_nsegments = Math.floor(diam * 0.08);
  var this_wobble = Math.floor(diam * 0.1);
  custom_ellipse({
    Point_center: new Point(
      randFBtwn(left_frame, right_frame),
      randFBtwn(top_frame, bottom_frame)
    ),
    width: diam,
    height: diam,
    nsegments: this_nsegments,
    wobble: this_wobble,
    stroke_width: 2,
    stroke_color: navy,
    fill_color: navy,
    stroke_cap: 'round',
    dash: false,
    parent: mask1,
  });
}

// Mask 2
var mask2 = new Group();
for (var i = 0; i < 4; i++) {
  var diam = randFBtwn(diam_min, diam_max);
  var this_nsegments = Math.floor(diam * 0.08);
  var this_wobble = Math.floor(diam * 0.1);
  custom_ellipse({
    Point_center: new Point(
      randFBtwn(left_frame, right_frame),
      randFBtwn(top_frame, bottom_frame)
    ),
    width: diam,
    height: diam,
    nsegments: this_nsegments,
    wobble: this_wobble,
    stroke_width: 2,
    stroke_color: navy,
    fill_color: navy,
    stroke_cap: 'round',
    dash: false,
    parent: mask2,
  });
}

// Clip 0
var clip0 = new Group(mask0, texture0);
clip0.clipped = true;
clip0.opacity = 0.8;

// Clip 1
var clip1 = new Group(mask1, texture1);
clip1.clipped = true;
clip1.opacity = 0.8;

// Clip 2
var clip2 = new Group(mask2, texture2);
clip2.clipped = true;
clip2.opacity = 0.8;

// Background
var bg = new Path.Rectangle({
  point: [0, 0],
  size: [view.size.width, view.size.height],
  selected: false,
});
bg.sendToBack();
bg.fillColor = rcolor;
bg.opacity = 0.1;

// Create mask
// var mask = bg;
// for (var i = 0; i < elements.length; i++) {
//   mask = mask.subtract(elements[i]);
// }
// mask.strokeColor = white;
// mask.strokeWidth = 2;
// mask.opacity = 0.3;
// mask.fillColor = navy;
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
