import AWS from 'aws-sdk';

// Configure AWS
AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'us-east-1' // Set your region
});

export const s3 = new AWS.S3();
