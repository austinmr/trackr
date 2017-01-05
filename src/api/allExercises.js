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
  idAttribute: exercise => exercise.exerciseID
}); 

export const arrayOfExercises = arrayOf(exercise); 

export const searchAllExercises = (exercise) => {
  const searchParams = {
    TableName: "Exercises",
    FilterExpression: "contains(exerciseName, :exercise)",
    ExpressionAttributeValues: {
        ":exercise": exercise
    }
  };
  const searchAllExercisesPromise = docClient.scan(searchParams).promise();
  return searchAllExercisesPromise; 
}

export const putNewExercise = (id, exerciseName) => {
  const params = {
    TableName: "Exercises", 
    Key: {
      "exerciseID": id,
      "exerciseName": exerciseName
    }, 
    ReturnValues: "ALL_NEW"
  }
  const putNewExercisePromise = docClient.update(params).promise(); 
  return putNewExercisePromise; 
}


