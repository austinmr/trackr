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

export const getAllUserExercises = (id) => {
  const params = {
    TableName: "Users_Exercises",
    KeyConditionExpression: "userID = :user",
    ExpressionAttributeValues: {
        ":user":id
    }
  }
  const getAllUserExercisesPromise = docClient.query(params).promise(); 
  return getAllUserExercisesPromise; 
}

export const putNewUserExercise = (userID, exerciseID, exerciseName, oneRepMax, targetOneRepMax) => {
  console.log(userID, exerciseID, exerciseName, oneRepMax, targetOneRepMax); 
  const params = {
    TableName: "Users_Exercises", 
    Key: {
      "userID": userID,
      "exerciseID": exerciseID
    }, 
    UpdateExpression: "set oneRepMax = :orm, MRW = :mrw, exerciseName = :exer, targetOneRepMax = :tar",
    ConditionExpression: "attribute_not_exists(exerciseID)",
    ExpressionAttributeValues: {
      ":orm": oneRepMax, 
      ":mrw": {},
      ":exer": exerciseName, 
      ":tar": targetOneRepMax
    },
    ReturnValues: "ALL_NEW"
  }
  const putNewUserExercisePromise = docClient.update(params).promise(); 
  return putNewUserExercisePromise; 
}

export const updateUserExercisesFromWorkout = (userExercises) => {
  const userExerciseKeys = Object.keys(userExercises); 

  userExerciseKeys
    .filter(key => key !== 'newRecords')
    .forEach((key) => {
      const userExerciseObject = userExercises[key]; 
      const { userID, exerciseID, oneRepMax, MRW } = userExerciseObject;    
      const params = {
        TableName: "Users_Exercises", 
        Key: {
          "userID": userID,
          "exerciseID": exerciseID
        }, 
        UpdateExpression: "set oneRepMax = :orm, MRW = :mrw",
        ConditionExpression: "attribute_exists(exerciseID)",
        ExpressionAttributeValues: {
          ":orm": oneRepMax, 
          ":mrw": MRW
        }
      }
      docClient.update(params, function(err, response) {
        if (err) {
          console.log(err)
        } else {
          console.log('SUCCESSFUL UPDATE', response); 
        }
      });
    })
}