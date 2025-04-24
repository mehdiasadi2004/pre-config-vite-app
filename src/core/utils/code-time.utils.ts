export const renderCodeTime = (codeTime: number): string => {
  if (codeTime <= 0) return "0:00";

  const minutes = Math.floor(codeTime / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(codeTime % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};
