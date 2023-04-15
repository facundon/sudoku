export function cx(...args: (string | null | undefined | boolean)[]): string {
  let i = 0;
  let result = '';
  while (i < args.length) {
    if (args[i]) {
      result += `${args[i]} `;
    }
    i++;
  }
  return result.trim();
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const paddedSeconds = remainingSeconds.toString().padStart(2, '0');
  return `${minutes}:${paddedSeconds}`;
}
