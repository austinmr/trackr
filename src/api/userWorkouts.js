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

import { Schema, arrayOf } from 'normalizr'

export const workout = new Schema('workouts', {
  idAttribute: workout => workout.workoutID
}); 

export const arrayOfWorkouts = arrayOf(workout); 

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


export function putNewUserWorkout(workout) {
  console.log(workout); 
  const { id, userID, username, templateID, exercises } = workout; 
  const date = JSON.stringify(workout.date); 
  const params = {
    TableName: "Users_Workouts", 
    Item: {
      "userID": userID, 
      "workoutID": id,
      "username": username,
      "templateID": templateID, 
      "workoutDate": date, 
      "exercises": exercises
    }
  }
  const putNewUserWorkoutPromise = docClient.put(params).promise(); 
  return putNewUserWorkoutPromise; 
}