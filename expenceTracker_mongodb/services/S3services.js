const AWS = require('aws-sdk');
require('dotenv').config();

exports.uploadToS3=(data, filename)=>{
 let s3bucket = new AWS.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_KEY
 })
 var params = {
    Bucket:'expencetracker21',
    Key:filename,
    Body:data,
    ACL:'public-read'
 }
 return new Promise((res,rej)=>{
    s3bucket.upload(params,(err,success)=>{
    if(err){rej(err)}
    else(res(success.Location))
 })
 })
 

}