export const tryOr = <T>(calculate: () => T, or: T): T => {
  try {
    return calculate()
  } catch (e) {
    return or
  }
}
