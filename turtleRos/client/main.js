
  // Connecting to ROS
  // -----------------

  // Create a ros node object to communicate with a rosbridgeserver 2.0
  var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
  });

  // established the connection with the server
  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });

  // if an error in the connection
  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  // if the connection close
  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });

  // Topics and messages

  // topic for move the turtle
  var cmdVelTurtle = new ROSLIB.Topic({
    ros : ros,
    name : '/turtle1/cmd_vel',
    messageType : 'geometry_msgs/Twist'
  });

  // topic to know the position
  var position = new ROSLIB.Topic({
    ros : ros,
    name: '/turtle1/pose',
    messageType: 'turtlesim/Pose'
  });

  // wait for instruction
  var seg = 1000;

  // Initial position to send a message
  var twist = new ROSLIB.Message({
    linear : {
      x : 0.0,
      y : 0.0,
      z : 0.0
    },
    angular : {
      x : 0.0,
      y : 0.0,
      z : 0.0
    }
  });

  // turtle position, we want to know only the x,y cordenates
  var actualPosition = {
    x : 0.0,
    y : 0.0
  }

  // to know the actual position
  position.subscribe(function(pst) {
    if (actualPosition.x != pst.x || actualPosition.y != pst.y) {
      actualPosition.x = pst.x;
      actualPosition.y = pst.y;
    } else {
      drawLineGraphic(actualPosition.x, actualPosition.y);
    }
  });

  // draw a line
  line = function(linearx, angularz) {
    twist.linear.x = linearx;
    twist.angular.z = angularz;
    cmdVelTurtle.publish(twist);
  }

  // draw a star, hardcoded
  drawStar = function() {
    setTimeout(function(){
      line(0.0, 1.0);
    }, 1 * seg);
    setTimeout(function() {
      line(4.0, 0.0);
    }, 2 * seg);
    setTimeout(function(){
      line(0.0, -2.0)
    }, 3 * seg);
    setTimeout(function(){
      line(4.0, 0.0);
    }, 4 * seg);
    setTimeout(function(){
      line(0.0, -2.5);
    }, 5 * seg);
    setTimeout(function(){
      line(5.0, 0.0);
    }, 6 * seg);
    setTimeout(function(){
      line(0.0, -2.7);
    }, 7 * seg);
    setTimeout(function(){
      line(5.0, 0.0);
    }, 8 * seg);
    setTimeout(function(){
      line(0.0, -2.73);
    }, 9 * seg);
    setTimeout(function(){
        line(5.2, 0.0)
    }, 10 * seg);
  }

  // variable to know the point of graphic
  var points ={
    x : 0.0,
    y : 0.0
  }

  // draw graphic canvas
  drawLineGraphic = function(posx, posy) {
    // Convertion = posactual/max(x) * pixels
    var converx = (posx/11.0888) * 600
    var convery = (1 - (posy/11.0888)) * 600

    // Initial points
    if(points.x == 0 && points.y == 0) {
      points.x = converx;
      points.y = convery;
    }

    // for draw last points with news
    if (converx != points.x && convery != points.y) {
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");

      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "black";
      ctx.moveTo(points.x, points.y);
      ctx.lineTo(converx, convery);
      ctx.stroke();

      points.x = converx;
      points.y = convery;
    }

  }

