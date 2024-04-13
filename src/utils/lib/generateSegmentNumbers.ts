export const genetateSegmentNumber = (
  startNumber: number,
  finishNumber: number
): number[] => {
  return Array.from(
    { length: finishNumber - startNumber + 1 },
    (_, index) => startNumber + index
  )
}
