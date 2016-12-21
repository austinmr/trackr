import { CREATE_TEMPLATE, SAVE_TEMPLATE, ADD_EXERCISE, ADD_SET } from '../constants/ActionTypes'
import { v4 } from 'uuid'

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

const createDate = () => {
  let now = new Date(); 
  return now; 
}

export const createTemplate = (username) => {
  return {
    type: CREATE_TEMPLATE,
    id: v4(),
    date: createDate(),
    username,
  }
}

export const saveTemplate = (id, template) => {
  return {
    type: SAVE_TEMPLATE,
    userID: id,
    template,
  }
}

export const addExercise = (id, exercise) => {
  return {
    type: ADD_EXERCISE,
    id, 
    exercise,
  }
}

export const addSet = (exerciseId, reps) => {
  return {
    type: ADD_SET,
    id: v4(),
    exerciseId,
    reps
  }
}


export function saveTemplateToDB(id, template) {
  const params = {
    TableName: "Users_Templates", 
    Item: {
      "UserID": id, 
      "TemplateID": template.id,
      "Username": template.username,
      "Date": template.date, 
      "Exercises": template.exercises
    }
  }

  docClient.put(params, function(err, data) {
      if (err) {
          console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("Put workout succeeded:", JSON.stringify(data, null, 2));
      }
  });    
}

export function saveTemplateAll(id) {
  return dispatch => {
    dispatch(requestUserExercises(id))
    const params = {
      TableName: "Users_Exercises",
      KeyConditionExpression: "UserID = :user",
      ExpressionAttributeValues: {
          ":user":id
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