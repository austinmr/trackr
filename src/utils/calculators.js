import _ from 'underscore'

export const percentage = (reps) => {
  return (1.0278 - (.0278 * reps)); 
}

export const roundPercentage = (percentage) => {
  return Math.round(percentage * 100)
}

export const displayPercentage = (reps) => {
  return roundPercentage(percentage(reps))
}

const roundByFives = (number) => {
  let remainder = number % 5; 
  if (remainder === 0) {
    return number; 
  } else if (remainder >= 2.5) {
    return number - remainder + 5; 
  } else {
    return number - remainder; 
  }
}

export const calculateWeight = (max, reps) => {
  return roundByFives(max * percentage(reps)); 
}

export const calculate1RM = (weight, reps) => {
  return weight / (1.0278 - (0.0278 * reps)); 
}

export const calculateAverage1RM = (sets) => {
  let total = sets
    .map((set) => (set["completedOneRepMax"]))
    .reduce((a, b) => { 
      return a + b; 
    });
  return total / sets.length; 
}

export const everySetComplete = (sets) => {
  return _.every(sets, (set) => set.completed === true)
}