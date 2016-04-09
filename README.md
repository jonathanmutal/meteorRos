meteorRos
=======================

## Install

+ ROS: [Tutorial install](http://wiki.ros.org/ROS/Tutorials/InstallingandConfiguringROSEnvironment)
+ Meteoro: [Install](https://www.meteor.com/install)

## Run

##### 1. ROS:
+ To begin, we will launch ROS. To do so, run the following in a terminal:
```
$ roscore
```
+ In a new terminal run:
```
$ rosrun turtlesim turtlesim_node
```
+ Once everything is running, we can launch the rosbridge v2.0 server with the following:
```
$ roslaunch rosbridge_server rosbridge_websocket.launch
```

##### 2. METEORO:
+ In the aplication folder open a new terminal and run the server in localhost with port 3000:
```
$ meteor
```
+ Open your web browser and go to http://localhost:3000 to see the app running

+ Click in the draw bottom

###### Bibliografy :
+ [move turtle](http://wiki.ros.org/ROS/Tutorials/UnderstandingTopics)
+ [roslibsjs tutorial](http://wiki.ros.org/roslibjs/Tutorials/BasicRosFunctionality)
+ [run meteoro](https://www.meteor.com/tutorials/blaze/creating-an-app)
