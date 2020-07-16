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
      nsegments: 5,
      wobble: specs.wobble,
      stroke_width: 7,
      stroke_color: 'black',
      stroke_cap: 'round',
      dash: false,
    });
  }
}

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

for (var j = 1; j < 5; j++) {
  for (var i = 1; i < 8; i++) {
    this_width = 100;
    this_height = 100;
    x = (window.innerWidth / 8) * i - this_width / 2;
    y = (window.innerHeight / 5) * j - this_height / 2;

    custom_rect({
      Point_anchor: new Point(x, y),
      width: this_width,
      height: this_height,
      nsegments: 10,
      wobble: x * 0.02,
      stroke_width: 5,
      stroke_color: 'red',
      stroke_cap: 'round',
      dash: false,
    });
  }
}

// Utilities
function randFBtwn(min, max) {
  return min + Math.random() * (max - min);
}
