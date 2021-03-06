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

export const roundByFives = (number) => {
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

export const calculateRounded1RM = (weight, reps) => {
  let max = weight / (1.0278 - (0.0278 * reps)); 
  return max - ( max % 5); 
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

export const setCompletion = sets => {
  const results = {}
  const completed = sets.filter((set) => set.completed); 
  results.completed = false; 
  if (completed.length === sets.length) {
    results.completed = true; 
  }
  results.percentageCompleted = completed.length / sets.length; 
  return results; 
}

export const calculatePerformancePercentage = (exercises) => {
  let percentage = exercises
    .map(exercise => exercise.percentageCompleted)
    .reduce((a,b) => a + b)
  // console.log(percentage); 
  percentage = Math.round((percentage/exercises.length) * 100); 
  return percentage; 
}

export const totalExerciseWeight = (sets) => {
  return sets
    .map(set => set.totalWeight)
    .reduce((a,b) => a + b); 
}

export const totalWorkoutSets = (exercises) => {
  return exercises
    .map((e) => e.setCount)
    .reduce((a,b) => a + b); 
}

export const totalWorkoutWeight = (exercises) => {
  return exercises
    .map((e) => e.totalWeight)
    .reduce((a,b) => a + b); 
}

export const topExercise = (exercises) => {
  return exercises.reduce((a,b) => {
    if (a.totalWeight > b.totalWeight) {
      return a; 
    } else {
      return b; 
    }
  }); 
}

export const gridLineIncrement = (currentOneRepMax) => {
  if (currentOneRepMax > 375) {
    return 100; 
  } else if (currentOneRepMax > 250) {
    return 75; 
  } else if (currentOneRepMax > 100) {
    return 50; 
  } else if (currentOneRepMax > 50) {
    return 20; 
  } else {
    return 10; 
  }
}

export const gridLineArray = (currentOneRepMax) => {
  const increment = gridLineIncrement(currentOneRepMax); 

  return [5,4,3,2,1,0].map((num, i) => {
    let weight = num * increment; 
    return {
      weight: weight,
      yValue: i
    }
  }); 
}

export const graphMaxValue = (currentOneRepMax) => {
  if (currentOneRepMax > 375) {
    return 500; 
  } else if (currentOneRepMax > 250) {
    return 375; 
  } else if (currentOneRepMax > 100) {
    return 250; 
  } else if (currentOneRepMax > 50) {
    return 100; 
  } else {
    return 50; 
  }
}


export const barGraphMaxValue = (currentOneRepMax) => {
  if (currentOneRepMax > 400) {
    return 500; 
  } else if (currentOneRepMax > 300) {
    return 400; 
  } else if (currentOneRepMax > 250) {
    return 300; 
  } else if (currentOneRepMax > 200) {
    return 250; 
  } else if (currentOneRepMax > 150) {
    return 200; 
  } else if (currentOneRepMax > 100) {
    return 150; 
  } else if (currentOneRepMax > 50) {
    return 100; 
  } else {
    return 50; 
  }
}

export const formatDomain = (min, max) => {
  max = max - ( max % 5 ) + 5; 
  min = min - ( min % 5 ) - 5; 
  if (max - min >= 25) {
    max = max + 10; 
    min = max - 50; 
    return [min, max]
  } else {
    max = max + 5; 
    min = max - 25; 
    return [min, max]
  }
} 

export const formatDynamoDate = (date) => {
  console.log(date); 
  if (typeof date !== 'string') {
    return; 
  } else {
    let dateArr = date.split(''); 
    if (dateArr[0] === '"') {
      dateArr = dateArr.slice(1, dateArr.length - 1).join(''); 
      console.log(dateArr); 
      date = Date.parse(dateArr); 
      return date; 
    } else {
      return date; 
    }
  }
}