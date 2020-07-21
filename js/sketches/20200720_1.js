var center = new Point(
  randFBtwn(window.innerWidth * 0.3, window.innerWidth * 0.7),
  randFBtwn(window.innerHeight * 0.3, window.innerHeight * 0.7)
);
for (var i = 0; i < 2; i++) {
  var diam = 200;
  custom_ellipse({
    Point_center: center,
    width: diam,
    height: diam,
    nsegments: 13,
    wobble: 2,
    stroke_width: randFBtwn(0.8, 1.5),
    stroke_color: 'black',
    stroke_cap: 'round',
    dash: false,
  });
}

for (var i = 0; i < 10; i++) {
  custom_line({
    Point_a: new Point(window.innerWidth * 0.1, 300 + i * randFBtwn(10, 50)),
    Point_b: new Point(window.innerWidth * 0.9, 300 + i * randFBtwn(10, 50)),
    nsegments: 25,
    wobble: 10,
    stroke_width: randFBtwn(0.5, 1),
    stroke_color: 'black',
    stroke_cap: 'round',
    dash: true,
  });
}

for (var j = 0; j < 10; j++) {
  for (var i = 0; i < 10; i++) {
    increment_x = (window.innerWidth * 0.78) / 10;
    increment_y = (window.innerHeight * 0.78) / 10;

    x = window.innerWidth * 0.11 + j * increment_x;
    y = window.innerHeight * 0.11 + i * increment_y;

    if (randFBtwn(0, 1) > 0.95) {
      for (var i = 0; i < 2; i++) {
        custom_rect({
          Point_anchor: new Point(x, y),
          width: increment_x * 0.9,
          height: increment_y * 0.9,
          nsegments: 5,
          wobble: 1,
          stroke_width: 0.8,
          stroke_color: 'red',
          stroke_cap: 'round',
          dash: false,
        });
      }
    }
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
