import puppeteer from "puppeteer";

const url = 'https://simple.wikipedia.org/wiki/Special:Random'
// const url = 'https://simple.wikipedia.org/wiki/YAML'


export const getWikiPageWordCount = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const santizedArrayOfStrings = await page.evaluate(() => {
        const pElements = Array.from(document.querySelectorAll('#bodyContent p'))

        const pText = pElements?.map(el =>{
            const plainHTML = el.innerHTML;
            return plainHTML.replace( /(<([^>]+)>)/ig, '') // Remove HTML tags
                .replace(/(\r\n|\n|\r)/gm, '') // Remove new lines
                .replace(/[\.,?!:`()]/g, '') // Remove punctuation
                .replace(/[0-9]/g,'') // remove numbers
                .toLowerCase();
        })
        return pText
    })

    await browser.close()

    let result = '';
    santizedArrayOfStrings.forEach(
        (string) => {
            result += string + ' ';
        })

    const arrayOfWords = result.replace(/\s\s+/g, ' ').split(' ')

    const wordCount = {}

    arrayOfWords.forEach((word) => {
        if (wordCount[word]) {
            wordCount[word] += 1
        } else {
            wordCount[word] = 1
        }
    })

    return wordCount;
}