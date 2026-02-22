const fs = require('fs').promises;

async function checkJson() {
    try {
        const data = await fs.readFile('bible_data.json', 'utf8');
        const json = JSON.parse(data);
        console.log("Total entries:", json.length);
        console.log("First entry:", JSON.stringify(json[0], null, 2));
        console.log("Last entry:", JSON.stringify(json[json.length - 1], null, 2));
    } catch (e) {
        console.error("JSON Check Error:", e);
    }
}

checkJson();
