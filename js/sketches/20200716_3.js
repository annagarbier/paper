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
    myPath.dashArray = [8, 18];
  }
}

function drawTick(Tick) {
  for (var i = 0; i < 2; i++) {
    custom_line({
      Point_a: Tick,
      Point_b: new Point(Tick.x + 10, Tick.y + 10),
      nsegments: 3,
      wobble: 1,
      stroke_width: 1,
      stroke_color: 'black',
      stroke_cap: 'round',
      dash: false,
    });
    custom_line({
      Point_a: new Point(Tick.x + 10, Tick.y + 10),
      Point_b: new Point(Tick.x + 20, Tick.y - 30),
      nsegments: 3,
      wobble: 1,
      stroke_width: 1,
      stroke_color: 'black',
      stroke_cap: 'round',
      dash: false,
    });
  }
}
for (var j = 0; j < 16; j++) {
  for (var i = 0; i < 41; i++) {
    x = (i * window.innerWidth) / 40;
    y = (j * window.innerHeight) / 15;
    drawTick(new Point(x, y));
  }
}

// Background - toggle for black background
// var bg = new Path.Rectangle({
//   point: [0, 0],
//   size: [view.size.width, view.size.height],
//   selected: false,
// });
// bg.sendToBack();
// bg.fillColor = {
//   hue: 350,
//   saturation: 0.1,
//   lightness: 0.1,
// };

// Utilities
function randFBtwn(min, max) {
  return min + Math.random() * (max - min);
}
