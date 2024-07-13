import React, { useRef } from 'react';
import { StyleSheet, View, Text, PanResponder, PanResponderInstance } from 'react-native';

const DraggableRect = () => {
  const panResponder = useRef<PanResponderInstance>(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        console.log('Dragged to:', gestureState.moveX, gestureState.moveY);
      },
    })
  ).current;

  return (
    <View
      style={styles.rectangle}
      {...panResponder.panHandlers}
    />
  );
};

const MultiTouchDragExample = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rectContainer}>
        <DraggableRect />
        <DraggableRect />
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
  rectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 200,
  },
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

export default MultiTouchDragExample;
