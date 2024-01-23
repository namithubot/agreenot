/**
 * Types of Swipe Gestures on the philo screen.
 */
export enum SwipeGesture {
	/**
	 * Unspecified or no gesture.
	 */
	None,
	
	/**
	 * Finger swiped in upwared direction.
	 */
	Up,

	/**
	 * Finger swiped in downward direction.
	 */
	Down,

	/**
	 * Finger swiped across the screen towards right.
	 */
	Right,

	/**
	 * Finger swiped across the screen towards left.
	 */
	Left
}

export enum Action {
	AGREE,
	DISAGREE,
	NEUTRAL
}