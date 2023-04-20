import { MongoClient } from "mongodb";

let _connection = undefined;
let _db = undefined;

export const dbConnection = async () => {
  if (!_connection) {
    try {
      _connection = await MongoClient.connect(process.env.MONGODB_URI);
      _db = _connection.db();
    } catch (error) {
      console.log(error);
    }
  }
  return _db;
};
export const closeConnection = async () => {
  await _connection.close();
};
