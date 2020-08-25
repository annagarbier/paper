var ww = window.innerWidth;
var wh = window.innerHeight;
var gw = 10; // grid width
var gh = 10; // grid height

var GridElements = new Group();
for (var x = 0; x < ww + gw; x += gw) {
  for (var y = 0; y < wh + gh; y += gh) {
    for (var i = 0; i < 1; i++) {
      var r = randFBtwn(0, 1);
      var a = new Point(x + gw * 0.5, y);
      var b = new Point(x + gw, y + gh * 0.5);
      var c = new Point(x + gw * 0.5, y + gh);
      var d = new Point(x, y + gh * 0.5);
      var r = randFBtwn(0, 1);
      var seg1_start, seg1_end, seg1_wt;
      var seg2_start, seg2_end, seg2_wt;
      if (r < 0.1) {
        seg1_start = a;
        seg1_end = b;
        seg2_start = c;
        seg2_end = d;
        seg1_wt = 0.5;
        seg2_wt = 0.5;
      } else if (r < 0.2) {
        seg1_start = b;
        seg1_end = c;
        seg2_start = d;
        seg2_end = a;
        seg1_wt = 0.5;
        seg2_wt = 0.5;
      } else {
        seg1_start = a;
        seg1_end = c;
        seg2_start = d;
        seg2_end = b;
        seg1_wt = 0.5;
        seg2_wt = 0.5;
      }
      custom_line({
        Point_a: seg1_start,
        Point_b: seg1_end,
        nsegments: 10,
        wobble: randFBtwn(0, seg2_start.getDistance(view.center), true) * 0.02,
        stroke_width: seg1_wt,
        stroke_color: 'black',
        stroke_cap: 'round',
        dash: false,
      });
      custom_line({
        Point_a: seg2_start,
        Point_b: seg2_end,
        nsegments: 10,
        wobble: randFBtwn(0, seg2_start.getDistance(view.center), true) * 0.02,
        stroke_width: seg2_wt,
        stroke_color: 'black',
        stroke_cap: 'round',
        dash: false,
      });
    }
  }
}

// Background
var bg = new Path.Rectangle({
  point: [0, 0],
  size: [ww, wh],
  selected: false,
});
bg.sendToBack();
bg.fillColor = 'white';
bg.opacity = 1;

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
  points.push(specs.Point_a);
  for (var i = 1; i < specs.nsegments; i++) {
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

  //   myPath.parent = specs.parent;
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

  myPath.fillColor = specs.fill_color;
  myPath.opacity = specs.opacity;

  myPath.parent = specs.parent;
  //   elements.push(myPath);
}

// Utilities using Math.random
function randFBtwn(min, max) {
  return min + Math.random() * (max - min);
}
function sampleArray(arr) {
  //   shuffle(arr);
  //   var choice = arr[arr.length - 1];
  //     arr.pop();
  //   return choice;
  return arr[Math.floor(Math.random(arr.length))];
}
// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(arr) {
  var j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
}
