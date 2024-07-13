import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const TankController: React.FC = () => {
  const [forwardSpeed, setForwardSpeed] = useState<'fast' | 'slow' | null>(null);
  const [backwardSpeed, setBackwardSpeed] = useState<'fast' | 'slow' | null>(null);

  const handlePress = (direction: 'forward' | 'backward', speed: 'fast' | 'slow') => {
    if (direction === 'forward') {
      setForwardSpeed(speed);
    } else if (direction === 'backward') {
      setBackwardSpeed(speed);
    }
    console.log(`Tank moving ${direction} ${speed}`);
  };






  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.region, styles.forwardRegion, forwardSpeed === 'fast' ? styles.fastSpeed : styles.slowSpeed]}
        onPress={() => handlePress('forward', 'fast')}
      >
        <Text style={styles.regionText}>Forward</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.region, styles.forwardRegion, forwardSpeed === 'slow' ? styles.slowSpeed : styles.fastSpeed]}
        onPress={() => handlePress('forward', 'slow')}
      >
        <Text style={styles.regionText}>Forward</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.region, styles.backwardRegion, backwardSpeed === 'fast' ? styles.fastSpeed : styles.slowSpeed]}
        onPress={() => handlePress('backward', 'fast')}
      >
        <Text style={styles.regionText}>Backward</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.region, styles.backwardRegion, backwardSpeed === 'slow' ? styles.slowSpeed : styles.fastSpeed]}
        onPress={() => handlePress('backward', 'slow')}
      >
        <Text style={styles.regionText}>Backward</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  region: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  forwardRegion: {
    backgroundColor: 'lightblue',
  },
  backwardRegion: {
    backgroundColor: 'lightcoral',
  },
  fastSpeed: {
    backgroundColor: 'darkgreen',
  },
  slowSpeed: {
    backgroundColor: 'lightgreen',
  },
  regionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default TankController;
