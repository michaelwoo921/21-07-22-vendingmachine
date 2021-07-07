import * as AWS from 'aws-sdk'


const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'us-west-2',
  endpoint: 'http://dynamodb.us-west-2.amazonaws.com'
});

export default docClient;
