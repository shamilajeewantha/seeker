import React, { useRef, useState } from 'react';
import { StyleSheet, View, Animated, Text } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';

const MAX_TRANSLATION = 255; // Define maximum translation limit

const DraggableRect = ({ id }: { id: number }) => {
  const initialPosition = useRef({ x: 0, y: 0 });

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { absoluteX, absoluteY } = event.nativeEvent;

    // Log the current position
    const currentPosition = { x: absoluteX, y: absoluteY };
    console.log(`Rectangle ${id} dragged to:`, currentPosition);
  };

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    const { absoluteX, absoluteY, translationX, translationY, state } = event.nativeEvent;

    if (state === State.BEGAN) {
      initialPosition.current = { x: absoluteX - translationX, y: absoluteY - translationY };
      console.log(`Rectangle ${id} gesture started at:`, initialPosition.current);
    }
  };

  return (
    <View style={styles.rectangle}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <View style={StyleSheet.absoluteFill} />
      </PanGestureHandler>
      <Joystick id={id} />
    </View>
  );
};

const Joystick = ({ id }: { id: number }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const [displacement, setDisplacement] = useState(0);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    {
      useNativeDriver: true,
      listener: (event: PanGestureHandlerGestureEvent) => {
        const { translationY } = event.nativeEvent;
          setDisplacement(Math.abs(translationY));
          if (translationY > MAX_TRANSLATION) {            
            translateY.setValue(MAX_TRANSLATION);          
          }
          else if (translationY < -MAX_TRANSLATION){
            translateY.setValue(-MAX_TRANSLATION);
          }
      },
    }
  );

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.END) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 10, // Adjust damping for smoother movement
        stiffness: 100, // Adjust stiffness for quicker return to center
      }).start();
      setDisplacement(0); // Reset displacement when gesture ends
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View style={[styles.joystick, { transform: [{ translateY }] }]}>
        <Text style={styles.displacementText}>{displacement.toFixed(0)}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const MultiTouchDragExample = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.rectContainer}>
        <DraggableRect id={1} />
        <DraggableRect id={2} />
      </View>
    </GestureHandlerRootView>
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
    width: 200,
    height: 500,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joystick: {
    width: 170,
    height: 150,
    borderRadius: 25,
    backgroundColor: 'red',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displacementText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MultiTouchDragExample;
