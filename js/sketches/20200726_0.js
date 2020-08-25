var border = 10;
var rect_w = 50;
var rect_h = 50;
var x_step = window.innerWidth / 20;
var y_step = window.innerHeight / 10;
var wobble = 0.8;

for (var y = border; y < window.innerHeight - border; y += y_step) {
  for (var x = border; x < window.innerWidth - border; x += x_step) {
    var P = new Point(x + randFBtwn(0, rect_w), y + randFBtwn(0, rect_h));
    custom_rect({
      Point_anchor: new Point(x, y),
      width: rect_w,
      height: rect_h,
      nsegments: 3,
      wobble: wobble,
      stroke_width: 1,
      stroke_color: 'black',
      stroke_cap: 'round',
      dash: false,
    });

    custom_line({
      Point_a: new Point(x, y),
      Point_b: P,
      nsegments: 3,
      wobble: wobble,
      stroke_width: 1,
      stroke_color: 'black',
      stroke_cap: 'round',
      dash: false,
    });
    custom_line({
      Point_a: new Point(x + rect_w, y),
      Point_b: P,
      nsegments: 3,
      wobble: wobble,
      stroke_width: 1,
      stroke_color: 'black',
      stroke_cap: 'round',
      dash: false,
    });
    custom_line({
      Point_a: new Point(x + rect_w, y + rect_h),
      Point_b: P,
      nsegments: 3,
      wobble: wobble,
      stroke_width: 1,
      stroke_color: 'black',
      stroke_cap: 'round',
      dash: false,
    });
    custom_line({
      Point_a: new Point(x, y + rect_h),
      Point_b: P,
      nsegments: 3,
      wobble: wobble,
      stroke_width: 1,
      stroke_color: 'black',
      stroke_cap: 'round',
      dash: false,
    });
  }
}

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

  if (specs.dash) {
    myPath.dashArray = [20, 5];
  }
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
  //   points.push(points[0]);

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

  // myPath.fillColor = 'black';
  myPath.opacity = 0.8;
}

// custom_rect accepts an object containing rect specs,
// and draws a corresponding rect with a few custom
// features like a bit of wobbly-ness for a hand-drawn
// feeling.
function custom_rect(specs) {
  // Store relevant variables
  corners = [
    specs.Point_anchor,
    new Point(specs.Point_anchor.x + specs.width, specs.Point_anchor.y),
    new Point(
      specs.Point_anchor.x + specs.width,
      specs.Point_anchor.y + specs.height
    ),
    new Point(specs.Point_anchor.x, specs.Point_anchor.y + specs.height),
  ];

  for (var i = 0; i < 4; i++) {
    custom_line({
      Point_a: corners[i],
      Point_b: corners[(i + 1) % 4],
      nsegments: specs.nsegments,
      wobble: specs.wobble,
      stroke_width: specs.stroke_width,
      stroke_color: specs.stroke_color,
      stroke_cap: 'round',
      dash: specs.dash,
    });
  }
}

// Utilities using Math.random
function randFBtwn(min, max) {
  return min + Math.random() * (max - min);
}
function sampleArray(arr) {
  return arr[Math.floor(randFBtwn(0, arr.length))];
}
