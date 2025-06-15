import { chartColors } from "@/constants/style.const";

/**
 * Gets the color for a specific stage/index in chart visualizations
 * @param index - The index number representing the stage (0-4)
 * @returns The corresponding color from chartColors for the given index
 * @example
 * const color = getStageColor(0); // Returns chartColors.primary
 * const color = getStageColor(2); // Returns chartColors.tertiary
 * ```
 */
export const getStageColor = (index: number) => {
  switch (index) {
    case 0:
      return chartColors.primary;
    case 1:
      return chartColors.secondary;
    case 2:
      return chartColors.tertiary;
    case 3:
      return chartColors.quaternary;
    case 4:
      return chartColors.quinary;
    default:
      return chartColors.primary;
  }
};
