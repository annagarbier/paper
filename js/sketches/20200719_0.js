// Today's sketch - colorful grid of lines
function horizontal() {
  for (var j = 0; j < 10; j++) {
    for (var i = 0; i < 50; i++) {
      if (i % 5 != 0) {
        var increment_y = 10;
        var increment_x = 100;
        var start_x = window.innerWidth * 0.1;
        var start_y = window.innerHeight * 0.1;
        custom_line({
          Point_a: new Point(
            start_x + j * increment_x,
            start_y + i * increment_y
          ),
          Point_b: new Point(
            start_x + (j + 1) * increment_x - 10,
            start_y + i * increment_y
          ),
          nsegments: 5,
          wobble: increment_y * 0.1,
          stroke_width: increment_y * 0.8,
          stroke_color: sampleArray([
            'red',
            'orange',
            'blue',
            'green',
            'purple',
          ]),
          stroke_cap: 'round',
          dash: false,
        });
      }
    }
  }
}

horizontal();

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
