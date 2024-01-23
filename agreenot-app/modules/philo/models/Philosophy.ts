/**
 * A philosophy element in the system.
 */
export interface Philosophy {
	/**
	 * ID of the philosophy in the system.
	 */
	id: string;

	/**
	 * Text content of this element.
	 */
	content: string;

	/**
	 * Total number of users agreeing to the content.
	 */
	agreeCount: number;

	/**
	 * Total number of users disagreeing to the content.
	 */
	disagreeCount: number;

	/**
	 * Total number of users neutral about the content.
	 */
	neutralCount: number;
}