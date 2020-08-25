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
      stroke_width: specs.strok_width,
      stroke_color: 'black',
      stroke_cap: 'round',
      dash: false,
    });
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
      stroke_color: 'red',
      stroke_cap: 'round',
      dash: false,
    });
    custom_line({
      Point_a: new Point(Tick.x + 10, Tick.y + 10),
      Point_b: new Point(Tick.x + 20, Tick.y - 30),
      nsegments: 3,
      wobble: 1,
      stroke_width: 1,
      stroke_color: 'red',
      stroke_cap: 'round',
      dash: false,
    });
  }
}

function drawBox(Point) {
  for (var i = 0; i < 2; i++) {
    custom_rect({
      Point_anchor: Point,
      width: 20,
      height: 20,
      nsegments: 3,
      wobble: 1,
      stroke_width: 1,
      stroke_color: 'black',
      stroke_cap: 'round',
      dash: false,
    });
  }
}

function drawText(Point_a, Point_b) {
  custom_line({
    Point_a: Point_a,
    Point_b: Point_b,
    nsegments: 100,
    wobble: 6,
    stroke_width: 1.25,
    stroke_color: 'black',
    stroke_cap: 'round',
    dash: false,
  });
}

// Elements
// Items
for (var i = 0; i < 10; i++) {
  var Anchor = new Point(window.innerWidth * 0.3, 180 + 50 * i);
  if (randFBtwn(0, 1) < 0.8) {
    drawTick(Anchor);
  }
  drawBox(new Point(Anchor.x, Anchor.y - 5));
  drawText(
    new Point(Anchor.x + 40, Anchor.y + 5),
    new Point(Anchor.x + randFBtwn(150, 250), Anchor.y + 5)
  );
}
// Paper border
for (var i = 0; i < 2; i++) {
  custom_rect({
    Point_anchor: new Point(window.innerWidth * 0.3 - 50, 50),
    width: 400,
    height: 650,
    nsegments: 50,
    wobble: 2,
    stroke_width: 1,
    stroke_color: 'black',
    stroke_cap: 'round',
    dash: false,
  });
}
// Title
for (var i = 0; i < 2; i++) {
  drawText(
    new Point(window.innerWidth * 0.3, 100),
    new Point(window.innerWidth * 0.3 + randFBtwn(150, 250), 100)
  );
  custom_line({
    Point_a: new Point(window.innerWidth * 0.3, 130),
    Point_b: new Point(window.innerWidth * 0.3 + 300, 130),
    nsegments: 20,
    wobble: 1,
    stroke_width: 1.25,
    stroke_color: 'black',
    stroke_cap: 'round',
    dash: false,
  });
}

// Utilities
function randFBtwn(min, max) {
  return min + Math.random() * (max - min);
}
