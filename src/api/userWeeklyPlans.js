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

export const plan = new Schema('plans', {
  idAttribute: plan => plan.weeklyPlanID
}); 

export const arrayOfPlans = arrayOf(plan); 

export const getAllUserPlans = (id) => {
  const params = {
    TableName: "Users_WeeklyPlans",
    KeyConditionExpression: "userID = :user",
    ExpressionAttributeValues: {
        ":user": id
    }
  }
  const getAllUserTemplatesPromise = docClient.query(params).promise(); 
  return getAllUserTemplatesPromise; 
}

export const putNewUserPlan = (userID, weeklyPlanID, weeklyPlanName, planTemplates) => {
  console.log('weeklyPlanAPI check: \n', userID, weeklyPlanID, weeklyPlanName, planTemplates); 
  const params = {
    TableName: "Users_WeeklyPlans", 
    Key: {
      "userID": userID,
      "weeklyPlanID": weeklyPlanID
    }, 
    ConditionExpression: "attribute_not_exists(TemplateID)",
    UpdateExpression: "set weeklyPlanName = :pname, planTemplates = :ptemps",
    ExpressionAttributeValues: {
      ":pname": weeklyPlanName, 
      ":ptemps": planTemplates, 
    },
    ReturnValues: "ALL_NEW"
  }
  console.log(params); 
  const putNewUserWeeklyPlanPromise = docClient.update(params).promise(); 
  return putNewUserWeeklyPlanPromise; 
}