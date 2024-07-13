import React, { useState } from 'react';
import { View, PanResponder, StyleSheet, ViewStyle } from 'react-native';

interface JoystickProps {
  onMove: (percentage: number) => void;
  containerStyle?: ViewStyle;
}

const Joystick: React.FC<JoystickProps> = ({ onMove, containerStyle }) => {
  const [ballPosition, setBallPosition] = useState({ y: 0 });

  const handleMove = (event: any, gestureState: any) => {
    // Calculate position relative to container
    const y = gestureState.moveY - containerHeight / 2;

    // Clamp ball within container bounds
    const maxY = containerHeight / 2;
    const clampedY = Math.min(Math.max(y, -maxY), maxY);

    // Update ball position
    setBallPosition({ y: clampedY });

    // Calculate percentage of movement relative to container height
    const percentage = (clampedY / maxY) * 100;

    // Send percentage to parent component
    onMove(percentage);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: handleMove,
    onPanResponderRelease: () => {
      // Reset ball position on release
      setBallPosition({ y: 0 });
      onMove(0); // Send center percentage on release
    },
  });

  const containerWidth = 100; // Adjust as needed
  const containerHeight = 300; // Adjust as needed

  return (
    <View
      style={[
        styles.container,
        { width: containerWidth, height: containerHeight },
        containerStyle,
      ]}
      {...panResponder.panHandlers}
    >
      <View style={[styles.ball, { top: containerHeight / 2 + ballPosition.y }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 25,
  },
});

export default Joystick;
