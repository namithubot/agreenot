import { Animated, PanResponder, StyleSheet, View } from "react-native";
import { Philosophy } from "./models/Philosophy";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { Action, SwipeGesture } from "./models/enums";

const THRESHOLD = 20;

export function Philo(philo: Philosophy) {
	let [ gesture, setGesture ] = useState<SwipeGesture>(SwipeGesture.None);
	let [ overlayOpeacity, setOverlayOpacity ] = useState(0);
  let startX: number, startY: number;
  const swipeGesture = Gesture.Pan()
    .onStart((e) => {
      startX = e.translationX;
      startY = e.translationY;
    })
	.onChange((e) => {
		const horizontalConfidence = (e.translationX - startX)/THRESHOLD;
		const verticalConfidence = (e.translationY - startY)/THRESHOLD;
		setOverlayOpacity(Math.max(Math.floor(horizontalConfidence), Math.floor(verticalConfidence)));
	})
    .onEnd((e) => {
      /**
       * TODO: Separate threshold for X and Y
       */
	  let currentGesture = SwipeGesture.None;
      if (e.translationX - startX > THRESHOLD) {
        currentGesture = SwipeGesture.Right;
      } else if (startX - e.translationX > THRESHOLD) {
        currentGesture = SwipeGesture.Left;
      } else if (e.translationY - startY > THRESHOLD) {
        currentGesture = SwipeGesture.Down;
      } else if (startY - e.translationY > THRESHOLD) {
        currentGesture = SwipeGesture.Up;
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
		<view style={philoStyle.container}>
			<GestureDetector gesture={swipeGesture}>
			<view style={philoStyle.philoContent}>{philo.content}</view>
			<view style={philoStyle.philoNonContent}>
			<view style={{ flexDirection: "row" }}>
				<view style={{ flex: 1, padding: "10%" }}>{philo.agreeCount}</view>
				<view style={{ flex: 1, padding: "10%" }}>
				{philo.neutralCount}
				</view>
				<view style={{ flex: 1, padding: "10%" }}>
				{philo.disagreeCount}
				</view>
			</view>
			</view>
		</GestureDetector>
		</view>
		<view style={ {...philoStyle.overlay, opacity: overlayOpeacity} }>
			<view style = {philoStyle.container}>
				{gesture}
			</view>
		</view>
    </View>
  );
}

const philoStyle = StyleSheet.create({
  overlay: {
	backgroundColor: "#fff",
	zIndex: 2,
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
  },
  philoNonContent: {
    flex: 1,
  },
});
