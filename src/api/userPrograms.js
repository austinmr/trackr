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
////////////// USER PROGRAMS SCHEMA
import { Schema, arrayOf } from 'normalizr'

export const program = new Schema('programs', {
  idAttribute: program => program.programID
}); 

export const arrayOfPrograms = arrayOf(program); 


////////////////////////////////////////////////////////////////////////////////
////////////// GET ALL USER PROGRAMS
export const getAllUserPrograms = (id) => {
  const params = {
    TableName: "Users_Programs",
    KeyConditionExpression: "userID = :user",
    ExpressionAttributeValues: {
        ":user": id
    }
  }
  const getAllUserProgramsPromise = docClient.query(params).promise(); 
  return getAllUserProgramsPromise; 
}

////////////////////////////////////////////////////////////////////////////////
////////////// PUT NEW USER PROGRAM -> Two options 
export const putNewUserProgram = (userID, programID, programName, programTemplates) => {
  console.log('weeklyPlanAPI check: \n', userID, programID, programName, programTemplates); 
  const params = {
    TableName: "Users_Programs", 
    Key: {
      "userID": userID,
      "programID": programID
    }, 
    ConditionExpression: "attribute_not_exists(programID)",
    UpdateExpression: "set programName = :pname, programTemplates = :ptemps, complete = :cp",
    ExpressionAttributeValues: {
      ":pname": programName, 
      ":ptemps": programTemplates, 
      ":cp": true
    },
    ReturnValues: "ALL_NEW"
  }
  console.log(params); 
  const putNewUserProgramPromise = docClient.update(params).promise(); 
  return putNewUserProgramPromise; 
}

export const putBlankUserProgram = (userID, programID, programName) => {
  console.log('weeklyPlanAPI check: \n', userID, programID, programName); 
  const params = {
    TableName: "Users_Programs", 
    Key: {
      "userID": userID,
      "programID": programID
    }, 
    ConditionExpression: "attribute_not_exists(programID)",
    UpdateExpression: "set programName = :pname, complete = :cp",
    ExpressionAttributeValues: {
      ":pname": programName,
      ":cp": false
    },
    ReturnValues: "ALL_NEW"
  }
  console.log(params); 
  const putNewUserProgramPromise = docClient.update(params).promise(); 
  return putNewUserProgramPromise; 
}

////////////////////////////////////////////////////////////////////////////////
////////////// UPDATE USER PROGRAM
export const updateUserProgram = (userID, programID, programName, programTemplates) => {
  console.log('weeklyPlanAPI check: \n', userID, programID, programName, programTemplates); 
  const params = {
    TableName: "Users_Programs", 
    Key: {
      "userID": userID,
      "programID": programID
    }, 
    ConditionExpression: "attribute_not_exists(programTemplates) and attribute_exists(programID)",
    UpdateExpression: "set programName = :pname, programTemplates = :ptemps, complete = :cp",
    ExpressionAttributeValues: {
      ":pname": programName, 
      ":ptemps": programTemplates, 
      ":cp": true
    },
    ReturnValues: "ALL_NEW"
  }
  console.log(params); 
  const updateUserProgram = docClient.update(params).promise(); 
  return updateUserProgram; 
}

