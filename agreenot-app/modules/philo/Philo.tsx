import { Animated, Text, StyleSheet, View, Dimensions } from "react-native";
import { Philosophy } from "./models/Philosophy";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { Action, SwipeGesture } from "./models/enums";

const THRESHOLD = 120;

export function Philo(philo: Philosophy) {
  let [gesture, setGesture] = useState<SwipeGesture>(SwipeGesture.None);
  let [overlayOpeacity, setOverlayOpacity] = useState(0);
  let startX: number, startY: number;
  const swipeGesture = Gesture.Pan()
    .onStart((e) => {
      startX = e.absoluteX;
      startY = e.absoluteY;
    })
    .onChange((e) => {
      const horizontalConfidence = e.translationX / THRESHOLD;
      const verticalConfidence = e.translationY/ THRESHOLD;
	  console.log(`translation: ${e.translationX} and ${e.translationY}`);
      setOverlayOpacity(
        Math.max(
          Math.floor(horizontalConfidence),
          Math.floor(verticalConfidence)
        )
      );
    })
    .onEnd((e) => {
      /**
       * TODO: Separate threshold for X and Y
       */
      let currentGesture = SwipeGesture.None;
	  if (Math.floor(e.translationX) > Math.floor(e.translationY)) {
		if (e.translationX > THRESHOLD) {
			currentGesture = SwipeGesture.Right;
		  } else if (e.translationX < THRESHOLD) {
			currentGesture = SwipeGesture.Left;
		  }
	  } else if (Math.floor(e.translationX) > Math.floor(e.translationY)) {
		if (e.translationY > THRESHOLD) {
        currentGesture = SwipeGesture.Down;
      } else if (e.translationY < THRESHOLD) {
        currentGesture = SwipeGesture.Up;
      }
	}
      setGesture(currentGesture);
    });

  useEffect(() => {
    let action = Action.NEUTRAL;
    if (gesture === SwipeGesture.Left) {
      action = Action.DISAGREE;
    } else if (gesture === SwipeGesture.Right) {
      action = Action.AGREE;
    } else if (gesture === SwipeGesture.Down) {
      action = Action.NEUTRAL;
    }
    console.log(`Gesture received ${gesture} with action ${action}`);
    setOverlayOpacity(0);
  }, [gesture]);

  return (
    <View>
      <GestureHandlerRootView style={philoStyle.container}>
        <GestureDetector gesture={swipeGesture}>
          <View>
            <View style={{ ...philoStyle.overlay, opacity: overlayOpeacity, display: overlayOpeacity === 0 ? 'none': 'flex' }}>
              <View style={philoStyle.container}>
                <Text>{gesture}</Text>
              </View>
            </View>
            <View style={philoStyle.philoContent}>
              <Text>{philo.content}</Text>
            </View>
            <View style={philoStyle.philoNonContent}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, padding: "10%" }}>
                  <Text>{philo.agreeCount}</Text>
                </View>
                <View style={{ flex: 1, padding: "10%" }}>
                  <Text>{philo.neutralCount}</Text>
                </View>
                <View style={{ flex: 1, padding: "10%" }}>
                  <Text>{philo.disagreeCount}</Text>
                </View>
              </View>
            </View>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}

var { width, height } = Dimensions.get("window");
const philoStyle = StyleSheet.create({
  overlay: {
    flex: 1,
    position: "absolute",
    left: -100,
    top: 0,
    backgroundColor: "black",
    width: "200%",
    margin: 0,
    height,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "10%",
  },
  philoContent: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  philoNonContent: {
    flex: 1,
  },
});
