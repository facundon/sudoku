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
