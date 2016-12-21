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

export const exercise = new Schema('exercises', {
  idAttribute: exercise => exercise.ExerciseID
}); 

export const arrayOfExercises = arrayOf(exercise); 

export const getAllUserExercises = (id) => {
  const params = {
    TableName: "Users_Exercises",
    KeyConditionExpression: "UserID = :user",
    ExpressionAttributeValues: {
        ":user":id
    }
  }
  const getAllUserExercisesPromise = docClient.query(params).promise(); 
  return getAllUserExercisesPromise; 
}