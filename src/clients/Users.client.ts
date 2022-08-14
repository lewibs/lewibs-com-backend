import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
import {Log} from "../types/Log";
import {Input} from "../types/Input";


const uri = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PW}@${process.env.MONGO_URL}/test?retryWrites=true&w=majority`;

export class Users {
    static async saveLog(log: Log) {
        const client = new MongoClient(uri);
        
        try {
            const database = client.db("logs");

            const logs = database.collection<Log>(log.userID);
        
            const result = await logs.insertOne(log);
          } finally {
            await client.close();
          }
    }

    static async saveInput(input: Input) {
        const client = new MongoClient(uri);
        
        try {
            const database = client.db("inputs");

            const inputs = database.collection<Input>(input.userID);
        
            const result = await inputs.insertOne(input);
          } finally {
            await client.close();
          }
    }
  }