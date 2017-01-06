
export const convertExercisesArrayToCSV = (exercises) => {
  const lineDelimiter = '\n'; 
  let csvContent = "data:text/csv;charset=utf-8,"

  // exercises.forEach((exercise) => {
  //   let exerciseCSV = `${exercise.exercise},`; 
  //   exercise.sets.forEach((set) => {
  //     exerciseCSV += `${set.weight},`;
  //   })
  //   exercise.sets.forEach((set) => {
  //     exerciseCSV += `${set.targetReps},`;
  //   })
  //   csvContent += exerciseCSV + lineDelimiter; 
  // }); 
  exercises.forEach((exercise) => {
    let exerciseCSV = `${exercise.exercise},`; 
    let weightCSV = exerciseCSV;
    let repsCSV = exerciseCSV; 
    exercise.sets.forEach((set) => {
      weightCSV += `${set.weight},`;
    })
    exercise.sets.forEach((set) => {
      repsCSV += `${set.targetReps},`;
    })
    csvContent += weightCSV + lineDelimiter + repsCSV + lineDelimiter; 
  }); 
  console.log(csvContent); 
  return csvContent; 
}


export const exercisesArrayWeightCSV = (exercises) => {
  const lineDelimiter = '\n'; 
  let csvContent = ''; 

  exercises.forEach((exercise) => {
    let exerciseCSV = `${exercise.exercise},`; 
    let weightCSV = exerciseCSV;
    exercise.sets.forEach((set) => {
      weightCSV += `${set.weight},`;
    })
    csvContent += weightCSV + lineDelimiter; 
  }); 
  console.log(csvContent); 
  return csvContent; 
}

export const exportPlan = (plan) => {
  let csvContent = "data:text/csv;charset=utf-8,"
  const lineDelimiter = '\n'; 

  Object.keys(plan).forEach((day) => {
    csvContent += day + lineDelimiter; 
    csvContent += exercisesArrayWeightCSV(plan[day].exercises)
  })

  return csvContent; 
}