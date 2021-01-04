import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class Amazons3ServiceService {

  constructor() { }

  public async getObjects(): Promise<any> {
    AWS.config.update({
      accessKeyId: 'AKIAZXIRVV35JQJ2BNXN',
      secretAccessKey: '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',
      region: 'eu-west-1'
    });

    const params = {
      Bucket: 'undertowfx',
      Prefix: 'tracks/'
    };
    const s3 = new AWS.S3();
    const objects = await s3
      .listObjects(params)
      .promise();
    return objects.Contents;
  }

  public async getTrackDetails(): Promise<any> {
    AWS.config.update({
      accessKeyId: 'AKIAZXIRVV35JQJ2BNXN',
      secretAccessKey: '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',
      region: 'eu-west-1'
    });
    var dynamoDb = new AWS.DynamoDB.DocumentClient();

    var params = {
      TableName: "Tracks",
      ProjectionExpression:  "Title, Artist, Genre, Likes, Track_Duration"
    };

    const trackDets = await dynamoDb
      .scan(params).promise();
    return trackDets.Items;

  }

  public async updateTrackLikes(title: string): Promise<any> {
    console.log(title);
    AWS.config.update({
      accessKeyId: 'AKIAZXIRVV35JQJ2BNXN',
      secretAccessKey: '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',
      region: 'eu-west-1'
    });
    var dynamoDb = new AWS.DynamoDB.DocumentClient();

    var params = {
      TableName: "Tracks",
      Key: {
        "Name": title
      },
      UpdateExpression: "set Likes = Likes + :val",
      ExpressionAttributeValues:{
        ":val": 1
      },
      ReturnValues:"UPDATED_NEW"
    };

    const trackDets = await dynamoDb
      .update(params).promise();
    return trackDets;

  }
}

//https://www.codota.com/code/javascript/functions/aws-sdk/S3/listObjects
