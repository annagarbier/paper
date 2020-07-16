// nsegments, offset, width
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
    myPath.dashArray = [8, 18];
  }
}

custom_line({
  Point_a: new Point(window.innerWidth * 0.1, 100),
  Point_b: new Point(window.innerWidth * 0.9, 100),
  nsegments: 10,
  wobble: 3,
  stroke_width: 7,
  stroke_color: 'red',
  stroke_cap: 'round',
  dash: false,
});

custom_line({
  Point_a: new Point(window.innerWidth * 0.1, 200),
  Point_b: new Point(window.innerWidth * 0.9, 200),
  nsegments: 50,
  wobble: 2,
  stroke_width: 7,
  stroke_color: 'purple',
  stroke_cap: 'round',
  dash: false,
});

custom_line({
  Point_a: new Point(window.innerWidth * 0.1, 300),
  Point_b: new Point(window.innerWidth * 0.9, 300),
  nsegments: 5,
  wobble: 25,
  stroke_width: 7,
  stroke_color: 'green',
  stroke_cap: 'round',
  dash: false,
});

custom_line({
  Point_a: new Point(window.innerWidth * 0.1, 400),
  Point_b: new Point(window.innerWidth * 0.9, 400),
  nsegments: 100,
  wobble: 10,
  stroke_width: 7,
  stroke_color: 'orange',
  stroke_cap: 'round',
  dash: false,
});

custom_line({
  Point_a: new Point(window.innerWidth * 0.1, 500),
  Point_b: new Point(window.innerWidth * 0.9, 500),
  nsegments: 5,
  wobble: 10,
  stroke_width: 7,
  stroke_color: 'blue',
  stroke_cap: 'round',
  dash: true,
});

custom_line({
  Point_a: new Point(window.innerWidth * 0.1, 600),
  Point_b: new Point(window.innerWidth * 0.9, 600),
  nsegments: 50,
  wobble: 2,
  stroke_width: 7,
  stroke_color: 'black',
  stroke_cap: 'round',
  dash: false,
});

custom_line({
  Point_a: new Point(window.innerWidth * 0.1, 600),
  Point_b: new Point(window.innerWidth * 0.9, 600),
  nsegments: 50,
  wobble: 2,
  stroke_width: 7,
  stroke_color: 'black',
  stroke_cap: 'round',
  dash: false,
});

// Utilities
function randFBtwn(min, max) {
  return min + Math.random() * (max - min);
}
