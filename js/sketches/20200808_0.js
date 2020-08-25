// Paramaterized fuzzy blobs, smaller.
// Primary color version.
// Ensures one layer of each color, in random order.
// Also includes outline.

var white = new Color('#f3ecc2');
var yellow = new Color('#f9d56e');
var black = new Color('#36454f');
var red = new Color('#e8505b');
var green = new Color('#14b1ab');

var colors = [yellow, red, green];

// var yellow = new Color('#f0e035');
// var navy = new Color('#173f5f');
// var red = new Color('#f21f18');
// var green = new Color('#17bd19');
// var blue = new Color('#2c58f5');
// var white = new Color('#fefff5');
// var black = new Color('#373647');
// var bg_color = new Color('#0e1017'); // dark
// var bg_color = new Color('white'); // light

// var colors = [red, blue, white];
var rcolor;
var diam_min = window.innerHeight * 0.15;
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
      // stroke_color: rcolor,
      stroke_color: green,
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
      // stroke_color: rcolor,
      stroke_color: yellow,
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
      stroke_color: red,
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
    fill_color: red,
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
    stroke_color: red,
    fill_color: red,
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
    stroke_color: red,
    fill_color: red,
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
bg.fillColor = black;
bg.opacity = 1;

// // Texture 4
// var texture4 = new Group();
// for (var x = 0; x < window.innerWidth; x += 10) {
//   for (var y = 0; y < window.innerHeight; y += 10) {
//     custom_line({
//       Point_a: new Point(x, y + 1),
//       Point_b: new Point(x + 5, y + 5),
//       nsegments: 2,
//       wobble: 1,
//       stroke_width: 1,
//       stroke_color: white,
//       stroke_cap: 'round',
//       dash: false,
//       parent: texture4,
//     });
//   }
// }

// Create mask
// var mask = bg;
// for (var i = 0; i < elements.length; i++) {
//   mask = mask.subtract(elements[i]);
// }
// mask.strokeColor = new Color('#373647');
// mask.strokeWidth = 2;
// mask.fillColor = new Color(1, 1, 1, 0);
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
  shuffle(arr);
  var choice = arr[arr.length - 1];
  arr.pop();
  return choice;
}
// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(arr) {
  var j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
}
