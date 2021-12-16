import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from "react-native";

export default function Calculator() {
  const [screen, setScreen] = useState(0)
  const [review, setReview] = useState(null)
  const [decimalS, setDecimalS] = useState(false)
  const [lastPressed, setLastPressed] = useState(null)
  const [operation, setOperation] = useState(null)

  function inputNumber(number) {
    if(lastPressed === null || lastPressed === '/' || lastPressed === 'x' ||lastPressed === '+' ||lastPressed === '-' || screen === 0) {
      setScreen(number);
      setLastPressed(number);
    } else if (lastPressed === '=') {
      setScreen(number);
      setLastPressed(number);
      setReview(null);
    } else {
      setScreen(screen+number);
      setLastPressed(number);
    }
  }
  function operator(op) {
    if(screen === 0 && op === '/') {
      return
    } else if (lastPressed === '/' || lastPressed === 'x' ||lastPressed === '+' ||lastPressed === '-') {
      if (review.slice(0,-1) === '0' && op === '/') {
        return
      }
      setReview(review.slice(0,-1)+op)
    } else if (operation !== null) {
      if (operation === '+') {
        setScreen(parseFloat(screen)+parseFloat(review.slice(0,-1)))
        setReview(parseFloat(screen)+parseFloat(review.slice(0,-1))+op)
        setOperation(op)
        setLastPressed(op)
      } else if (operation === '-') {
        setScreen(parseFloat(review.slice(0,-1))-parseFloat(screen))
        setReview(parseFloat(review.slice(0,-1))-parseFloat(screen)+op)
        setOperation(op)
        setLastPressed(op)
      } else if (operation === 'x') {
        setScreen(parseFloat(screen)*parseFloat(review.slice(0,-1)))
        setReview(parseFloat(screen)*parseFloat(review.slice(0,-1))+op)
        setOperation(op)
        setLastPressed(op)
      } else if (operation === '/') {
        setScreen(parseFloat(review.slice(0,-1))/parseFloat(screen))
        setReview(parseFloat(review.slice(0,-1))/parseFloat(screen)+op)
        setOperation(op)
        setLastPressed(op)
      }
    } else {
      setReview(screen+op)
      setOperation(op)
      setLastPressed(op)
    }
  }
  function percent() {
    if (lastPressed === null || screen === 0) {
      return
    } else {
      setScreen(screen/100)
    }
  }
  function negatif() {
    if (lastPressed === null || screen === 0) {
      return
    } else {
      setScreen(screen*-1)
    }
  }
  function decimal(){
    if (lastPressed === '=') {
      setScreen(screen+'.')
      setLastPressed('.')
    }else if (!screen.includes('.')){
      setScreen(screen+'.')
    } else {
      return
    }
  }
  function result(){
    if (!review || lastPressed === '='){
      return
    } else {
      setLastPressed('=')
      setOperation(null)
      if (review.slice(-1) === '+') {
        setReview(review+screen+'=')
        setScreen(parseFloat(review.slice(0,-1))+parseFloat(screen))
      } else if (review.slice(-1) === '-') {
        setReview(review+screen+'=')
        setScreen(parseFloat(review.slice(0,-1))-parseFloat(screen))
      } else if (review.slice(-1) === 'x') {
        setReview(review+screen+'=')
        setScreen(parseFloat(review.slice(0,-1))*parseFloat(screen))
      } else if (review.slice(-1) === '/') {
        setReview(review+screen+'=')
        setScreen(parseFloat(review.slice(0,-1))/parseFloat(screen))
      }
    }
  }
  function reset() {
    setScreen(0);
    setReview(null);
    setOperation(null);
    setLastPressed(null);
  }
  function backspace() {
    if (lastPressed === '=' || lastPressed === '+' || lastPressed === '-' || lastPressed === 'x' || lastPressed === '/') {
      return
    } else if (screen.length === 1 || screen === 0) {
      setScreen(0)
    } else {
      setScreen(screen.slice(0,-1))
    }
  }
  return (
    <>
      <View style={styles.screen}>
        <ScrollView horizontal={true} style={styles.screenReview}>
          <Text style={styles.review}>{review}</Text>
        </ScrollView>
        <ScrollView horizontal={true} style={styles.screenNumber}>
          <Text style={styles.numbers}>{screen}</Text>
        </ScrollView>
      </View>

      <View style={styles.buttons}>
        {/* Buttons Line #1 */}
        <Pressable style={styles.buttonC} onPress={reset}>
          <Text style={styles.buttonText}>C</Text>
        </Pressable>
        <Pressable style={styles.buttonB} onPress={backspace}>
          <Image source={require('../image/backspace.png')} style={{width: '100%', height: '100%'}} />
        </Pressable>
        <Pressable style={styles.buttonO} onPress={percent}>
          <Image source={require('../image/percent.png')} style={{width: '100%', height: '100%'}} />
        </Pressable>
        <Pressable style={styles.buttonO} onPress={() => {operator('/')}}>
          <Image source={require('../image/devide.png')} style={{width: '100%', height: '100%'}} />
        </Pressable>

        {/* Buttons Line #2 */}
        <Pressable style={styles.buttonN} onPress={() => {inputNumber('1')}}>
          <Text style={styles.buttonNumber}>1</Text>
        </Pressable>
        <Pressable style={styles.buttonN} onPress={() => {inputNumber('2')}}>
          <Text style={styles.buttonNumber}>2</Text>
        </Pressable>
        <Pressable style={styles.buttonN} onPress={() => {inputNumber('3')}}>
          <Text style={styles.buttonNumber}>3</Text>
        </Pressable>
        <Pressable style={styles.buttonO} onPress={() => {operator('x')}}>
          <Image source={require('../image/multiply.png')} style={{width: '100%', height: '100%'}} />
        </Pressable>

        {/* Buttons Line #3 */}
        <Pressable style={styles.buttonN} onPress={() => {inputNumber('4')}}>
          <Text style={styles.buttonNumber}>4</Text>
        </Pressable>
        <Pressable style={styles.buttonN} onPress={() => {inputNumber('5')}}>
          <Text style={styles.buttonNumber}>5</Text>
        </Pressable>
        <Pressable style={styles.buttonN} onPress={() => {inputNumber('6')}}>
          <Text style={styles.buttonNumber}>6</Text>
        </Pressable>
        <Pressable style={styles.buttonO} onPress={() => {operator('-')}}>
          <Image source={require('../image/minus.png')} style={{width: '100%', height: '100%'}} />
        </Pressable>
        
        {/* Buttons Line #4 */}
        <Pressable style={styles.buttonN} onPress={() => {inputNumber('7')}}>
          <Text style={styles.buttonNumber}>7</Text>
        </Pressable>
        <Pressable style={styles.buttonN} onPress={() => {inputNumber('8')}}>
          <Text style={styles.buttonNumber}>8</Text>
        </Pressable>
        <Pressable style={styles.buttonN} onPress={() => {inputNumber('9')}}>
          <Text style={styles.buttonNumber}>9</Text>
        </Pressable>
        <Pressable style={styles.buttonO} onPress={() => {operator('+')}}>
          <Image source={require('../image/plus.png')} style={{width: '100%', height: '100%'}} />
        </Pressable>
        
        {/* Buttons Line #5 */}
        <Pressable style={styles.buttonN} onPress={negatif}>
          <Image source={require('../image/negative.png')} style={{width: '100%', height: '100%'}} />
        </Pressable>
        <Pressable style={styles.buttonN} onPress={() => {inputNumber('0')}}>
          <Text style={styles.buttonNumber}>0</Text>
        </Pressable>
        <Pressable style={styles.buttonN} onPress={decimal}>
          <Image source={require('../image/comma.png')} style={{width: '100%', height: '100%'}} />
        </Pressable>
        <Pressable style={styles.buttonE} onPress={result}>
          <Image source={require('../image/equal.png')} style={{width: '100%', height: '100%'}} />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#2f3640',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: '30%',
    width: '100%'
  },
  numbers: {
    color: 'white',
    fontSize: 60,
    alignSelf: 'flex-end'
  },
  screenNumber: {
    height: '40%'
  },
  review: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-end'
  },
  screenReview: {
    height: '50%'
  },
  buttons: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
    backgroundColor: '#1e272e',
    paddingLeft: '4%',
    paddingTop: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 50,
    marginBottom: 5
  },
  buttonNumber: {
    color: '#1e272e',
    fontSize: 50,
    marginBottom: 5,
    textAlign: 'center',
    bottom: 7,
    position: 'relative'
  },
  buttonC: {
    width: '20%',
    height: '16%',
    display: 'flex',
    backgroundColor: '#f53b57',
    marginTop: '4%',
    marginRight: '4%',
    borderColor: '#ef5777',
    borderWidth: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonB: {
    width: '20%',
    height: '16%',
    display: 'flex',
    backgroundColor: '#f53b57',
    marginTop: '4%',
    marginRight: '4%',
    borderColor: '#ef5777',
    borderWidth: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonT: {
    width: '20%',
    height: '16%',
    display: 'flex',
    backgroundColor: '#0fbcf9',
    marginTop: '4%',
    marginRight: '4%',
    borderColor: '#4bcffa',
    borderWidth: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonO: {
    width: '20%',
    height: '16%',
    display: 'flex',
    backgroundColor: '#05c46b',
    marginTop: '4%',
    marginRight: '4%',
    borderColor: '#0be881',
    borderWidth: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonN: {
    width: '20%',
    height: '16%',
    backgroundColor: '#34e7e4',
    marginTop: '4%',
    marginRight: '4%',
    borderColor: '#00d8d6',
    borderWidth: 5,
    borderRadius: 10,
    alignSelf: 'center'
  },
  buttonE: {
    width: '20%',
    height: '16%',
    display: 'flex',
    backgroundColor: '#ffd32a',
    marginTop: '4%',
    marginRight: '4%',
    borderColor: '#ffdd59',
    borderWidth: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});