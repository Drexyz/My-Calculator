import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Calculator from "./src/components/Calculator";

export default function App() {
  return (
    <View style={{backgroundColor: '#353b48', height: '100%'}}>
      <Calculator />
    </View>
  );
}