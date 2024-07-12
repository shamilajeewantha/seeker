import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';

export default function TankControl() {
  const [leftTrackActive, setLeftTrackActive] = useState(false);
  const [rightTrackActive, setRightTrackActive] = useState(false);

  const handleLeftTrackPressIn = () => {
    setLeftTrackActive(true);
    console.log('Left Track pressed');
    // You can add additional actions or log messages here if needed
  };

  const handleLeftTrackPressOut = () => {
    setLeftTrackActive(false);
    console.log('Left Track released');
    // Additional actions or log messages on release can be added here
  };

  const handleRightTrackPressIn = () => {
    setRightTrackActive(true);
    console.log('Right Track pressed');
  };

  const handleRightTrackPressOut = () => {
    setRightTrackActive(false);
    console.log('Right Track released');
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.header}>Tank Control</ThemedText>
      
      <View style={styles.controls}>
        <TouchableWithoutFeedback
          onPressIn={handleLeftTrackPressIn}
          onPressOut={handleLeftTrackPressOut}
        >
          <View style={[styles.button, leftTrackActive && styles.activeButton]}>
            <Text style={styles.buttonText}>Left Track</Text>
          </View>
        </TouchableWithoutFeedback>
        
        <TouchableWithoutFeedback
          onPressIn={handleRightTrackPressIn}
          onPressOut={handleRightTrackPressOut}
        >
          <View style={[styles.button, rightTrackActive && styles.activeButton]}>
            <Text style={styles.buttonText}>Right Track</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 25,
    paddingVertical: 130,
    borderRadius: 5,
    marginBottom: 10,
  },
  activeButton: {
    backgroundColor: '#0056b3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
