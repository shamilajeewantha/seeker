import React from 'react';
import { StyleSheet, View } from 'react-native';
import DragDetection from '@/components/DragDetection';

export default function Profile() {
  return (
    <View style={styles.container}>
      <DragDetection />
      <DragDetection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',
  },
});
