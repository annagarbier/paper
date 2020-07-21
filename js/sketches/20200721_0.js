// Tree cluster
for (var j = 0; j < 20; j++) {
  var r = randFBtwn(0, 1);
  if (r < 0.2) {
    var center = new Point(
      randFBtwn(window.innerWidth * 0.15, window.innerWidth * 0.85),
      randFBtwn(window.innerHeight * 0.25, window.innerHeight * 0.4)
    );
  } else {
    var center = new Point(
      randFBtwn(window.innerWidth * 0.15, window.innerWidth * 0.85),
      randFBtwn(window.innerHeight * 0.6, window.innerHeight * 0.75)
    );
  }

  for (var i = 0; i < 3; i++) {
    var diam = randFBtwn(10, 30);
    var this_center = new Point(
      center.x + randFBtwn(-50, 50),
      center.y + randFBtwn(-50, 50)
    );
    custom_ellipse({
      Point_center: this_center,
      width: diam,
      height: diam,
      nsegments: 10,
      wobble: 2,
      stroke_width: 0.8,
      stroke_color: 'black',
      stroke_cap: 'round',
      dash: false,
    });
  }
}

// Building cluster
for (var k = 0; k < 2; k++) {
  var building_anchor = new Point(
    randFBtwn(window.innerWidth * 0.15, window.innerWidth * 0.5),
    window.innerHeight * 0.25
  );
  for (var j = 0; j < 2; j++) {
    for (var i = 0; i < Math.floor(randFBtwn(3, 10)); i++) {
      this_width = sampleArray([20, 30, 40]);
      this_height = sampleArray([20, 30, 40]);
      x = building_anchor.x + 50 * i;
      y = building_anchor.y + 50 * j;

      custom_rect({
        Point_anchor: new Point(x, y),
        width: this_width,
        height: this_height,
        nsegments: 3,
        wobble: 1,
        stroke_width: 1,
        stroke_color: 'red',
        stroke_cap: 'round',
        dash: false,
      });
    }
  }
}

// Path
for (var i = 0; i < 2; i++) {
  custom_line({
    Point_a: new Point(
      window.innerWidth * 0.1,
      window.innerHeight * 0.4 + i * window.innerHeight * 0.2
    ),
    Point_b: new Point(
      window.innerWidth * 0.9,
      window.innerHeight * 0.4 + i * window.innerHeight * 0.2
    ),
    nsegments: 4,
    wobble: 50,
    stroke_width: 1,
    stroke_color: 'black',
    stroke_cap: 'round',
    dash: false,
  });
}

// Border
for (var i = 0; i < 1; i++) {
  custom_rect({
    Point_anchor: new Point(window.innerWidth * 0.1, window.innerHeight * 0.2),
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.6,
    nsegments: 10,
    wobble: 1,
    stroke_width: 1,
    stroke_color: 'black',
    stroke_cap: 'round',
    dash: false,
  });
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
