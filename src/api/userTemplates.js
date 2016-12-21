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

export const template = new Schema('workouts', {
  idAttribute: template => template.TemplateID
}); 

export const arrayOfTemplates = arrayOf(template); 

export const getAllUserTemplates = (id) => {
  const params = {
    TableName: "Users_Templates",
    KeyConditionExpression: "UserID = :user",
    ExpressionAttributeValues: {
        ":user":id
    }
  }
  const getAllUserTemplatesPromise = docClient.query(params).promise(); 
  return getAllUserTemplatesPromise; 
}