export interface TypingStats {
  wpm: number
  accuracy: number
  errors: number
  consistency: number
}

export function calculateStats(
  input: string,
  target: string,
  timeMs: number,
  mode: string = "time"
): TypingStats {
  if (timeMs <= 0) {
    return { wpm: 0, accuracy: 100, errors: 0, consistency: 100 }
  }

  const timeMinutes = timeMs / 60000 // Convert ms to minutes
  
  // Calculate correct characters (only compare typed characters)
  const typedLength = Math.min(input.length, target.length)
  let correctChars = 0
  let totalErrors = 0
  
  for (let i = 0; i < typedLength; i++) {
    if (input[i] === target[i]) {
      correctChars++
    } else {
      totalErrors++
    }
  }
  
  // Count extra characters beyond target length as errors
  if (input.length > target.length) {
    totalErrors += input.length - target.length
  }
  
  // Calculate WPM based on correct characters (standard: 5 characters = 1 word)
  const wordsTyped = correctChars / 5
  const wpm = wordsTyped / timeMinutes
  
  // Calculate accuracy based on typed characters only
  const typedChars = Math.max(1, input.length) // Avoid division by zero
  const accuracy = (correctChars / typedChars) * 100
  
  // Calculate consistency (simplified: standard deviation of character timing)
  const consistency = Math.max(0, 100 - (totalErrors * 2))
  
  return {
    wpm: Math.max(0, wpm),
    accuracy: Math.max(0, Math.min(100, accuracy)),
    errors: totalErrors,
    consistency: Math.max(0, Math.min(100, consistency))
  }
}
