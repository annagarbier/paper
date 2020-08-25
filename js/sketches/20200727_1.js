// Global styling
var sw = 2;
var sc = 'black';

// Set bounds
var bounds = new Rectangle(100, 100, 400, 400);

// Style bounds
var bounds_path = new Path.Rectangle(bounds);
bounds_path.strokeWidth = sw;
bounds_path.strokeColor = sc;

// Set bounds 2
var bounds_2 = new Rectangle(150, 80, 300, 80);
var bounds_path_2 = new Path.Rectangle(bounds_2);
bounds_path_2.strokeWidth = sw;
bounds_path_2.strokeColor = sc;

// Intersection
var intersection = bounds.intersect(bounds_2);
var intersection_path = new Path.Rectangle(intersection);
intersection_path.fillColor = sc;

// Utilities
function randFBtwn(min, max) {
  return min + Math.random() * (max - min);
}

function sampleArray(arr) {
  return arr[Math.floor(randFBtwn(0, arr.length))];
}
