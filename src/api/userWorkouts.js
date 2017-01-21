////////////////////////////////////////////////////////////////////////////////
////////////// DYNAMODB CONFIG 

import 'aws-sdk/dist/aws-sdk';
import dynamoConfig from '../../dynamoConfig'
const AWS = window.AWS;
AWS.config.update(dynamoConfig);
AWS.config.setPromisesDependency(require('bluebird'));
const docClient = new AWS.DynamoDB.DocumentClient();

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
////////////// USER WORKOUTS SCHEMA
import { Schema, arrayOf } from 'normalizr'

export const workout = new Schema('workouts', {
  idAttribute: workout => workout.workoutID
}); 

export const arrayOfWorkouts = arrayOf(workout); 


////////////////////////////////////////////////////////////////////////////////
////////////// GET ALL USER WORKOUTS
export const getAllUserWorkouts = (id) => {
  const params = {
    TableName: "Users_Workouts",
    KeyConditionExpression: "userID = :user",
    ExpressionAttributeValues: {
        ":user":id
    }
  }
  const getAllUserWorkoutsPromise = docClient.query(params).promise(); 
  return getAllUserWorkoutsPromise; 
}

////////////////////////////////////////////////////////////////////////////////
////////////// PUT NEW USER WORKOUT
export function putNewUserWorkout(workout) {
  console.log(workout); 
  const { id, userID, username, templateID, exercises } = workout; 
  const date = JSON.stringify(workout.date); 
  let deload = 'false'; 
  if (workout.deload !== undefined) {
    deload = workout.deload; 
  }

  const params = {
    TableName: "Users_Workouts", 
    Item: {
      "userID": userID, 
      "workoutID": id,
      "username": username,
      "templateID": templateID, 
      "workoutDate": date, 
      "exercises": exercises,
      "deload": deload
    }
  }
  const putNewUserWorkoutPromise = docClient.put(params).promise(); 
  return putNewUserWorkoutPromise; 
}