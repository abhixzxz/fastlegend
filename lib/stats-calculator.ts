export function calculateStats(input: string, phrase: string, timeMs: number, mode = "time") {
  const timeSecs = Math.max(1, timeMs / 1000)
  const timeMinutes = timeSecs / 60

  // Calculate accuracy
  let correctChars = 0
  let errors = 0

  for (let i = 0; i < Math.max(input.length, phrase.length); i++) {
    if (input[i] === phrase[i]) {
      correctChars++
    } else {
      errors++
    }
  }

  const accuracy = input.length > 0 ? (correctChars / input.length) * 100 : 0

  // Calculate WPM (5 chars = 1 word)
  const words = input.length / 5
  const wpm = words / timeMinutes
  const rawWpm = input.length / 5 / timeMinutes

  // Calculate consistency (simplified)
  const consistency = Math.max(0, 100 - errors * 5)

  return {
    wpm: Math.max(0, wpm - errors * 0.5),
    rawWpm,
    accuracy: Math.max(0, accuracy),
    errors,
    correctChars,
    charsTyped: input.length,
    timeTaken: Math.round(timeSecs),
    consistency: Math.max(0, Math.min(100, consistency)),
    mode,
  }
}
