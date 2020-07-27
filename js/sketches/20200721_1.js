// GLOBAL VARS
var w = window.innerWidth;
var h = window.innerHeight;

// Head
custom_ellipse({
  Point_center: new Point(w * 0.5, h * 0.2),
  width: randFBtwn(50, 100),
  height: (50, 100),
  nsegments: 15,
  wobble: 5,
  stroke_width: 1,
  stroke_color: 'black',
  stroke_cap: 'round',
  dash: false,
});

// Mouth
custom_line({
  Point_a: new Point(w * 0.5 - randFBtwn(10, 25), h * 0.28),
  Point_b: new Point(w * 0.5 + randFBtwn(10, 25), h * 0.28),
  nsegments: 2,
  wobble: 3,
  stroke_width: 1,
  stroke_color: 'black',
  stroke_cap: 'round',
  dash: false,
});

// Nose

// Eyes
custom_ellipse({
  Point_center: new Point(w * 0.5 - randFBtwn(10, 35), h * 0.21),
  width: randFBtwn(5, 15),
  height: randFBtwn(5, 15),
  nsegments: 6,
  wobble: 1,
  stroke_width: 1,
  stroke_color: 'black',
  stroke_cap: 'round',
  dash: false,
});
custom_ellipse({
  Point_center: new Point(w * 0.5 + randFBtwn(10, 35), h * 0.21),
  width: randFBtwn(5, 15),
  height: randFBtwn(5, 15),
  nsegments: 10,
  wobble: 1,
  stroke_width: 1,
  stroke_color: 'black',
  stroke_cap: 'round',
  dash: false,
});

// Eyelashes

// Eyebrows

// Hair

// Body

// Arms

// Hands

// Fingers

// Legs

// Feet

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

  //   myPath.fillColor = 'green';
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
