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
  idAttribute: workout => workout.WorkoutID
}); 

export const arrayOfWorkouts = arrayOf(workout); 

export const getAllUserWorkouts = (id) => {
  const params = {
    TableName: "Users_Workouts",
    KeyConditionExpression: "UserID = :user",
    ExpressionAttributeValues: {
        ":user":id
    }
  }
  const getAllUserWorkoutsPromise = docClient.query(params).promise(); 
  return getAllUserWorkoutsPromise; 
}