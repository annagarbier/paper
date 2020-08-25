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
    myPath.dashArray = [8, 18];
  }
}

for (var i = 0; i < 15; i++) {
  var this_width = 10 + i * 10;
  var this_height = 10 + i * 10;
  custom_ellipse({
    Point_center: new Point(window.innerWidth * 0.2, window.innerHeight / 2),
    width: this_width,
    height: this_height,
    nsegments: 10 + i,
    wobble: i,
    stroke_width: 4,
    stroke_color: 'purple',
    stroke_cap: 'round',
    dash: false,
  });
}

for (var i = 0; i < 15; i++) {
  var this_width = 10 + i * 10;
  var this_height = 10 + i * 10;
  custom_ellipse({
    Point_center: new Point(window.innerWidth * 0.5, window.innerHeight / 2),
    width: this_width,
    height: this_height,
    nsegments: 5,
    wobble: 3,
    stroke_width: 4,
    stroke_color: 'purple',
    stroke_cap: 'round',
    dash: false,
  });
}

for (var i = 0; i < 15; i++) {
  var this_width = 10 + i * 10;
  var this_height = 10 + i * 10;
  custom_ellipse({
    Point_center: new Point(window.innerWidth * 0.8, window.innerHeight / 2),
    width: this_width,
    height: this_height,
    nsegments: 30 + i * 20,
    wobble: 3 + i * 0.4,
    stroke_width: 4,
    stroke_color: 'purple',
    stroke_cap: 'round',
    dash: false,
  });
}

// Utilities
function randFBtwn(min, max) {
  return min + Math.random() * (max - min);
}
