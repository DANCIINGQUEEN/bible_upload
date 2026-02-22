require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs').promises;

async function insertToMongoDB() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI is not defined in .env file");
        return;
    }

    const client = new MongoClient(uri);

    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        console.log("Connected successfully!");

        const db = client.db('bible_db');
        const collection = db.collection('verses');

        console.log("Reading bible_data.json...");
        const data = await fs.readFile('bible_data.json', 'utf8');
        const verses = JSON.parse(data);

        console.log(`Inserting ${verses.length} verses into MongoDB...`);

        // Clear existing data (optional, but good for clean start if requested or implied)
        await collection.deleteMany({});

        // Insert in chunks to avoid memory/payload limits if necessary
        const chunkSize = 1000;
        for (let i = 0; i < verses.length; i += chunkSize) {
            const chunk = verses.slice(i, i + chunkSize);
            await collection.insertMany(chunk);
            console.log(`Inserted ${i + chunk.length} / ${verses.length} verses...`);
        }

        console.log("Successfully inserted all verses into MongoDB.");
    } catch (error) {
        console.error("Error during insertion:", error);
    } finally {
        await client.close();
    }
}

insertToMongoDB().catch(console.error);
