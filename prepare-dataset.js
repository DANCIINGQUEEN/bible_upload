const fs = require('fs').promises;
const path = require('path');
const iconv = require('iconv-lite');

async function prepareDataset() {
    const bibleDir = path.join(__dirname, 'bible');
    const files = await fs.readdir(bibleDir);
    const bibleData = [];

    // Sort files to handle them in order (1-01, 1-02, ..., 2-27)
    files.sort();

    for (const file of files) {
        if (!file.endsWith('.txt')) continue;

        console.log(`Parsing ${file}...`);
        const filePath = path.join(bibleDir, file);
        const buffer = await fs.readFile(filePath);
        const content = iconv.decode(buffer, 'euc-kr');

        // Extract book info from filename (e.g., "1-01창세기.txt")
        const fileNameMatch = file.match(/^(\d+)-(\d+)(.+)\.txt$/);
        if (!fileNameMatch) continue;

        const testamentNum = parseInt(fileNameMatch[1]); // 1: Old, 2: New
        const bookNum = parseInt(fileNameMatch[2]);
        const bookName = fileNameMatch[3];
        const testament = testamentNum === 1 ? "Old" : "New";
        const bookIndex = testamentNum === 1 ? bookNum : 39 + bookNum;

        const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');

        for (const line of lines) {
            // Updated regex to handle headline if present: 창1:1 <천지 창조> ...
            // Format: [Abbrev][Chapter]:[Verse] [optional headline] [content]
            // Example: 창1:1 <천지 창조> 태초에 하나님이...
            // Some lines might not have the space after verse number if it's tight, 
            // but usually it's [Abbrev][Chapter]:[Verse] [rest]
            const lineMatch = line.match(/^([^\d]+)(\d+):(\d+)\s+(.*)$/);

            if (lineMatch) {
                const chapter = parseInt(lineMatch[2]);
                const verse = parseInt(lineMatch[3]);
                let rest = lineMatch[4].trim();

                let headline = "";
                // Check if there's a headline in < >
                const headlineMatch = rest.match(/^<([^>]+)>\s*(.*)$/);
                if (headlineMatch) {
                    headline = headlineMatch[1];
                    rest = headlineMatch[2];
                }

                bibleData.push({
                    testament,
                    bookIndex,
                    bookName,
                    chapter,
                    verse,
                    headline,
                    content: rest
                });
            }
        }
    }

    await fs.writeFile('bible_data.json', JSON.stringify(bibleData, null, 2), 'utf8');
    console.log(`Successfully created bible_data.json with ${bibleData.length} verses.`);
}

prepareDataset().catch(console.error);
