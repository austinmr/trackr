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

export const template = new Schema('templates', {
  idAttribute: template => template.templateID
}); 

export const arrayOfTemplates = arrayOf(template); 

export const getAllUserTemplates = (id) => {
  const params = {
    TableName: "Users_Templates",
    KeyConditionExpression: "userID = :user",
    ExpressionAttributeValues: {
        ":user":id
    }
  }
  const getAllUserTemplatesPromise = docClient.query(params).promise(); 
  return getAllUserTemplatesPromise; 
}

export const putNewUserTemplate = (userID, templateID, templateName, template, templateType, templatePlanName, templatePlanID) => {
  console.log('templateAPI check: \n', userID, templateID, templateName, template); 
  let { date, username, exercises } = template; 
  date = JSON.stringify(date); 
  // console.log(date, username, exercises); 
  // console.log(typeof date); 
  // console.log('DATE:\n'); 
  // console.log(date); 
  const params = {
    TableName: "Users_Templates", 
    Key: {
      "userID": userID,
      "templateID": templateID
    }, 
    ConditionExpression: "attribute_not_exists(TemplateID)",
    UpdateExpression: "set templateDate = :tdate, templateName = :tname, username = :uname, exercises = :exer, templateType = :tt, templatePlanName = :tpn, templatePlanID = :tpid",
    ExpressionAttributeValues: {
      ":tname": templateName, 
      ":tdate": date, 
      ":uname": username,
      ":exer": exercises,
      ":tt": templateType, 
      ":tpn": templatePlanName,
      ":tpid": templatePlanID
    },
    ReturnValues: "ALL_NEW"
  }
  console.log(params); 
  const putNewUserTemplatePromise = docClient.update(params).promise(); 
  return putNewUserTemplatePromise; 
}