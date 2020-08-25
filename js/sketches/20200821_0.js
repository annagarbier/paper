var col_height = view.size.height * 0.05;
var col_width = view.size.width * 0.025;
var n_cols = view.size.width / col_width;
var n_rows = view.size.height / col_height;

for (var x = 0; x < view.size.width + col_width; x += col_width) {
  var path = new Path({
    segments: [
      [x, 0],
      [x, view.size.height],
    ],
    // selected: true,
  });
}

for (var y = 0; y < view.size.height + col_height; y += col_height) {
  var path = new Path({
    segments: [
      [0, y],
      [view.size.width, y],
    ],
    // selected: true,
  });
}

for (var j = 0; j < n_rows; j += 1) {
  for (var i = 0; i < n_cols; i += 1) {
    var min_x = i * col_width;
    var max_x = min_x + col_width;

    var min_y = j * col_height;
    var max_y = min_y + col_height;

    var myPath = new Path();
    myPath.add(new Point(min_x, min_y));
    myPath.add(
      new Point(randFloatBtwn(min_x, max_x), randFloatBtwn(min_y, max_y))
    );
    myPath.add(new Point(max_x, min_y));
    myPath.closed = true;
    myPath.fillColor = 'black';
    myPath.strokeColor = 'black';
  }
}

function randFloatBtwn(min, max) {
  return min + Math.random() * (max - min);
}
