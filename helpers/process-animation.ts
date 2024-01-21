const processAnimation = (
  animations: Animations,
  index: number,
  signal: AbortSignal,
  onIterationComplete?: () => void
) => {
  if (index < animations.length && !signal.aborted) {
    const [barIdx, newHeight, isComparison] = animations[index];
    setTimeout(() => {
      setBarArray((prevArray) => {
        const newArray = [...prevArray];
        newArray[barIdx] = { number: newHeight, colour: isComparison };
        return newArray;
      });
      processAnimation(animations, (index += 1), signal, onIterationComplete);
    }, 10);
  } else {
    if (onIterationComplete) onIterationComplete();
  }
};
