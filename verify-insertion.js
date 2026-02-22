require('dotenv').config();
const { MongoClient } = require('mongodb');

async function verifyInsertion() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('bible_db');
        const collection = db.collection('verses');

        const count = await collection.countDocuments();
        console.log(`Total verses in MongoDB: ${count}`);

        const sample = await collection.findOne();
        console.log("Sample document:", JSON.stringify(sample, null, 2));

    } catch (error) {
        console.error("Verification error:", error);
    } finally {
        await client.close();
    }
}

verifyInsertion().catch(console.error);
