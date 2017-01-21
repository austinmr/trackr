import { REQUEST_DB_EXERCISES, RECEIVE_DB_EXERCISES, ADDING_DB_EXERCISE, ADDED_DB_EXERCISE } from '../constants/ActionTypes'
import { v4 } from 'uuid'
import { addExercise } from './templates'

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////// 
////////////// DYNAMO 

import 'aws-sdk/dist/aws-sdk';
import dynamoConfig from '../../dynamoConfig'
const AWS = window.AWS;
AWS.config.update(dynamoConfig);
AWS.config.setPromisesDependency(require('bluebird'));
const docClient = new AWS.DynamoDB.DocumentClient();

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export function searchDBExercises(exercise) {
  return {
    type: REQUEST_DB_EXERCISES
  }
}

export function searchResultsDBExercises(exercises) {
  return {
    type: RECEIVE_DB_EXERCISES,
    exercises
  }
}

export function addingDBExercise(exercise) {
  return {
    type: ADDING_DB_EXERCISE,
  }
}

export function addedDBExercise(exercise) {
  return {
    type: ADDED_DB_EXERCISE,
  }
}

export function searchForExercise(exercise) {
  return dispatch => {
    dispatch(searchDBExercises())
    const searchParams = {
      TableName: "Exercises",
      FilterExpression: "contains(exerciseName, :exercise)",
      ExpressionAttributeValues: {
          ":exercise": exercise
      }
    };
    const scanPromise = docClient.scan(searchParams).promise();
    return scanPromise.then((data) => {
        // console.log(data.Items)
        let exerciseSearchList = {}; 
        if (data.Items.length > 0) {
          data.Items.forEach((item) => {
            exerciseSearchList[`${item.exerciseID}`] = item;
          }); 
        }
      dispatch(searchResultsDBExercises(exerciseSearchList))
    }).catch((err) => {
      console.log(err); 
    });
  }
}

// export function addDBExercise(exercise) {
//   return dispatch => {
//     dispatch(addingDBExercise())
//     const exerciseID = v4(); 
//     const params = {
//       TableName: "Exercises", 
//       Item: {
//         "exerciseID": exerciseID,
//         "exerciseName": exercise
//       }, 
//       ReturnValues: "ALL_OLD"
//     }
//     const putObjectPromise = docClient.put(params).promise(); 
//     return putObjectPromise.then((data) => {
//       console.log("Added item:", JSON.stringify(data, null, 2));
//       dispatch(addedDBExercise())
//       // dispatch(addExercise())
//     }).catch((err) => {
//       console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
//     }); 
//   }
// }

export function addDBExercise(exercise) {
  return dispatch => {
    dispatch(addingDBExercise())
    const exerciseID = v4(); 
    const params = {
      TableName: "Exercises", 
      Key: {
        "exerciseID": exerciseID,
        "exerciseName": exercise
      }, 
      ReturnValues: "ALL_NEW"
    }
    const updateObjectPromise = docClient.update(params).promise(); 
    return updateObjectPromise.then((data) => {
      console.log("Added item:", JSON.stringify(data, null, 2));
      const { exerciseID, exerciseName } = data.Attributes; 
      dispatch(addedDBExercise())
      dispatch(addExercise(exerciseID, exerciseName))
    }).catch((err) => {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    }); 
  }
}

