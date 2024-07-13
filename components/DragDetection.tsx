import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, PanResponderInstance, PanResponderGestureState, LayoutChangeEvent, Text } from 'react-native';
import { ThemedText } from './ThemedText';

const DragDetection: React.FC = () => {
  const rectangleRef = useRef<View>(null); // Ref to hold reference to the rectangle component
  const speedIndicatorRef = useRef<View>(null); // Ref for the speed indicator
  const [speedHeight, setSpeedHeight] = useState(0); // State to manage speed indicator height
  let initialY = 0;
  let initialX = 0;

  const panResponder = useRef<PanResponderInstance>(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const { moveX, moveY, y0 } = gestureState;

        // Calculate the distance dragged vertically
        const dragDistanceY = y0 - moveY;
        const containerHeight = 500; // Assuming container height is 500
        const heightPercentage = (dragDistanceY / containerHeight) * 100;



        // Log drag direction and percentages
        if (moveY < initialY) {
          console.log('Dragged up');
        } else if (moveY > initialY + containerHeight) {
          console.log('Dragged down');
        } else if (moveX < initialX) {
          console.log('Dragged left');
        } else if (moveX > initialX + 150) {
          console.log('Dragged right');
        } else {
          // Calculate the speed indicator height based on height percentage
          const maxSpeedHeight = 100; // Maximum height of the speed indicator
          if (heightPercentage < 30 && heightPercentage > -30) {
            const currentSpeedHeight = (heightPercentage / 30) * maxSpeedHeight;
            setSpeedHeight(currentSpeedHeight);
            console.log(`Height percentage: ${heightPercentage}%, Speed: ${currentSpeedHeight}%`);
          }
         
        }
      },
      onPanResponderRelease: () => {
        console.log('Drag release');
        // Reset speed indicator on release
        setSpeedHeight(0);
        // Additional actions upon drag release can be added here
      },
    })
  ).current;

  const onRectangleLayout = () => {
    if (rectangleRef.current) {
      rectangleRef.current.measure((x, y, width, height, pageX, pageY) => {
        console.log(`Rectangle absolute coordinates: x=${pageX}, y=${pageY}`);
        initialY = pageY;
        initialX = pageX;
      });
    }
  };

  return (
    <View style={styles.container}>
      <View
        ref={rectangleRef}
        {...panResponder.panHandlers}
        onLayout={onRectangleLayout}
        style={styles.rectangle}
      />
      {/* Speed indicator */}
      <View style={[styles.speedIndicator, { height: Math.abs(speedHeight) + 30, backgroundColor: speedHeight >= 0 ? 'green' : 'red' }]} ref={speedIndicatorRef}>
        <ThemedText style={styles.speedText}>{Math.round(speedHeight)}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    width: 150,
    height: 500,
    backgroundColor: 'lightblue',
    borderRadius: 10,
  },
  speedIndicator: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 30,
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  speedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 2,
  },
});

export default DragDetection;
