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
////////////// USER TEMPLATES SCHEMA
import { Schema, arrayOf } from 'normalizr'

export const template = new Schema('templates', {
  idAttribute: template => template.templateID
}); 

export const arrayOfTemplates = arrayOf(template); 


////////////////////////////////////////////////////////////////////////////////
////////////// GET ALL USER TEMPLATES
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

////////////////////////////////////////////////////////////////////////////////
////////////// PUT NEW USER TEMPLATE
export const putNewUserTemplate = (userID, templateID, templateName, template, templateType, programName, programID) => {
  console.log('templateAPI check: \n', userID, templateID, templateName, template); 
  let { date, username, exercises } = template; 
  date = JSON.stringify(date); 
  const params = {
    TableName: "Users_Templates", 
    Key: {
      "userID": userID,
      "templateID": templateID
    }, 
    ConditionExpression: "attribute_not_exists(TemplateID)",
    UpdateExpression: "set templateDate = :tdate, templateName = :tname, username = :uname, exercises = :exer, templateType = :tt, programName = :tpn, programID = :tpid",
    ExpressionAttributeValues: {
      ":tname": templateName, 
      ":tdate": date, 
      ":uname": username,
      ":exer": exercises,
      ":tt": templateType, 
      ":tpn": programName,
      ":tpid": programID
    },
    ReturnValues: "ALL_NEW"
  }
  console.log(params); 
  const putNewUserTemplatePromise = docClient.update(params).promise(); 
  return putNewUserTemplatePromise; 
}