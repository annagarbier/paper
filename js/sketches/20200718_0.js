// Today's sketch - ten horizontal black lines
var increment = 40;
for (var i = 0; i < 10; i++) {
  custom_line({
    Point_a: new Point(
      window.innerWidth * 0.1,
      window.innerHeight * 0.3 + i * increment
    ),
    Point_b: new Point(
      window.innerWidth * 0.9,
      window.innerHeight * 0.3 + i * increment
    ),
    nsegments: 50,
    wobble: 2,
    stroke_width: increment * 0.9,
    stroke_color: 'black',
    stroke_cap: 'round',
    dash: false,
  });
}

// Common utils
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

  myPath.opacity = 0.85;
}

function randFBtwn(min, max) {
  return min + Math.random() * (max - min);
}
function sampleArray(arr) {
  return arr[Math.floor(randFBtwn(0, arr.length))];
}
