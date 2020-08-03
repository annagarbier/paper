// Group of lines creates the texture layer
var lines = new Group();
for (var i = 0; i < window.innerHeight; i += 50) {
  var line = new Path(new Point(0, i), new Point(window.innerWidth, i));
  line.strokeColor = 'black';
  line.strokeWidth = 25;
  line.parent = lines;
}

// Circle geometry will be used as a clipping mask
var circle = new Path.Circle({
  center: view.center,
  radius: 250,
  strokeColor: 'black',
});

// Create a group of the two items and clip it:
var group = new Group(circle, lines);
group.clipped = true;

var lines2 = new Group();
for (var i = 0; i < window.innerHeight; i += 10) {
  var line = new Path(new Point(0, i), new Point(window.innerWidth, i));
  line.strokeColor = 'black';
  line.strokeWidth = 2;
  line.parent = lines2;
}
var circle2 = new Path.Circle({
  center: new Point(window.innerWidth * 0.33, window.innerHeight * 0.5),
  radius: 300,
  strokeColor: 'black',
});
var group2 = new Group(circle2, lines2);
group2.clipped = true;
