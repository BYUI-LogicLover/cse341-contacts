import {MongoClient} from 'mongodb';

let client;
let db;

export async function initDb() {
    if (db) return db;
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db(process.env.DATABASE_NAME || 'cse341-contacts');
    return db;
}

export function getDb() {
    if (!db) throw new Error('Database not initialized. Call initDb() first.');
    return db;
}
