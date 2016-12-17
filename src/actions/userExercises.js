import { REQUEST_USER_EXERCISES, RECEIVE_USER_EXERCISES, INVALIDATE_USER_EXERCISES, ADD_USER_EXERCISE } from '../constants/ActionTypes'
import thunk from 'redux-thunk'

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

export function invalidateUserExercises(id) {
  return {
    type: INVALIDATE_USER_EXERCISES,
    id
  }
}

export function requestUserExercises(id) {
  return {
    type: REQUEST_USER_EXERCISES,
    id
  }
}

export function receiveUserExercises(id, exercises) {
  return {
    type: RECEIVE_USER_EXERCISES,
    id,
    exercises
  }
}

export function fetchUserExercises(id) {
  return dispatch => {
    dispatch(requestUserExercises(id))

    const table = "Users_Exercises";
    const UserID = "a9f697fe-893e-468e-9fba-fd500ef198a8"

    const params = {
      TableName: table,
      KeyConditionExpression: "UserID = :user",
      ExpressionAttributeValues: {
          ":user":UserID
      }
    }

    const getObjectPromise = docClient.query(params).promise(); 
    return getObjectPromise.then((data) => {
      // console.log(data); 
      const exercises = {}; 
      data.Items.forEach((item) => {
        exercises[`${item.ExerciseID}`] = item
      }); 
      dispatch(receiveUserExercises(id, exercises))
    }).catch((err) => {
      console.log(err); 
    }); 
  }
}


function shouldFetchUserExercises(state) {
  const userExercises = state.userExercises
  if (!userExercises) {
    return true
  } else if (userExercises.isFetching) {
    return false
  } else {
    return userExercises.didInvalidate
  }
}

export function fetchUserExercisesIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchUserExercises(getState(), id)) {
      return dispatch(fetchUserExercises(id))
    }
  }
}


export function updateUserExercises(updatedUserExercisesObject) {
  const userExerciseKeys = Object.keys(updatedUserExercisesObject); 
  userExerciseKeys.forEach((key) => {
    const table = "Users_Exercises";
    const UserExerciseObject = updatedUserExercisesObject[key]; 
    const params = {
      TableName: table, 
      Key: {
        "UserID": UserExerciseObject.UserID,
        "ExerciseID": UserExerciseObject.ExerciseID
      }, 
      UpdateExpression: "set OneRepMax = :orm, MRW = :mrw",
      ExpressionAttributeValues: {
        ":orm": UserExerciseObject.OneRepMax, 
        ":mrw": UserExerciseObject.MRW
      }
    }

    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });    
  }); 
}

export function addUserExerciseToState(UserID, ExerciseID, ExerciseName, MRW, OneRepMax) {
  return {
    type: ADD_USER_EXERCISE,
    UserID,
    ExerciseID,
    ExerciseName, 
    MRW,
    OneRepMax
  }
}

export function addUserExerciseToDB(userID, exerciseID, exerciseName, oneRepMax) {
  return dispatch => {
    console.log(userID, exerciseID, exerciseName, oneRepMax); 
    const params = {
      TableName: "Users_Exercises", 
      Key: {
        "UserID": userID,
        "ExerciseID": exerciseID
      }, 
      UpdateExpression: "set OneRepMax = :orm, MRW = :mrw, ExerciseName = :exer",
      ConditionExpression: "attribute_not_exists(OneRepMax) OR attribute_not_exists(MRW) OR attribute_not_exists(ExerciseName)",
      ExpressionAttributeValues: {
        ":orm": oneRepMax, 
        ":mrw": {},
        ":exer": exerciseName
      },
      ReturnValues: "ALL_NEW"
    }
    const putPromiseObject = docClient.update(params).promise(); 
    return putPromiseObject.then((data) => {
        console.log("Added item:", JSON.stringify(data, null, 2));
        const { UserID, ExerciseID, ExerciseName, MRW, OneRepMax } = data.Attributes; 
        dispatch(addUserExerciseToState(UserID, ExerciseID, ExerciseName, MRW, OneRepMax))
      }).catch((err) => {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      });
    }
  }

