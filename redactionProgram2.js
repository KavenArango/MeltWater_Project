const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function BuildRegexForRedaction(wordsToRedact, Regex) {
    let match = wordsToRedact.match(Regex) // Pareses out the word used for redaction
    let redacterWordsForDoc = ""
    for (var i in match) {
        redacterWordsForDoc += (match[i] + "|") //Expected: <Word/Phrase>|<Word/Phrase>|<Word/Phrase>|...etc
    }
    redacterWordsForDoc = redacterWordsForDoc.slice(0, -1) // removes the trailing "|" from the last position
    return new RegExp(redacterWordsForDoc, "gmi")
}

function RedactDocument(keywords, text) {
    const redactedWordRegex = /((?<='|")[^,'"]+(?='|"))|([\w]+)/gmi;
    let redactorRegex = BuildRegexForRedaction(keywords, redactedWordRegex)
    let replacementString = "XXXX"
    return text.replace(redactorRegex, replacementString);
}


readline.question("Please input Keywords to be used for redaction: ", keywords => {
    readline.question("Please input text for redaction: ", text => {
        console.log(RedactDocument(keywords, text))
        readline.close()
    })
});