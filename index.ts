import {getWikiPageWordCount} from "./webScraper";
import {writeWordCountToSheet} from "./google";

const main = async () => {
    const wordCount = await getWikiPageWordCount();

    // Change data type from object to array
    const entries = Object.entries(wordCount) as [string, number][];
    entries.sort((a, b) => b[1] - a[1]);


    await writeWordCountToSheet(entries)
}

main();
