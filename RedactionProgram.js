// let myRegex = /[a-zA-z ]+/g;
// ([a-zA-z]+)|([a-zA-z ]+[^"', ]*)
// [^\s"',]+|"([^"]*)"|'([^']*)';
// ([\w]+)|([\w]+[^'",])
// ((?<=')[^,']+(?='))|((?<=")[^,"]+(?="))|([\w]+)
// ((?<='|")[^,'"]+(?='|"))|([\w]+)
const RedactedWordRegex = /((?<='|")[^,'"]+(?='|"))|([\w]+)/gmi;
let replacementString = "XXXX"


function OpenFile(file) {
    const fs = require('fs');
    try {
        return (fs.readFileSync(file, 'utf-8'))
    } catch {
        throw "Error Opening File"
    }
}
function GetDocNamesForRedaction() {
    const fs = require('fs');
    try {
        return (fs.readdirSync('.\\Non-redacted_documents'))
    } catch {
        throw "Error Opening Folder"
    }
}
function BuildRegex(words_to_redact, RedactedWordRegex) {
    const match = words_to_redact.match(RedactedWordRegex)
    var RedactedWordsForDoc = ""
    for (i in match) {
        RedactedWordsForDoc += (match[i] + "|")
    }
    RedactedWordsForDoc = RedactedWordsForDoc.slice(0, -1)
    return RedactedWordsForDoc
}
function RedactDocument(document, myRegex) {
    try {

    } catch
    {

    }
}



try {
    var words_to_redact = OpenFile('Key_words.txt')
    var DocNameForRedaction = OpenFile();
}
catch (err) {
    console.log(err)
    return
}
console.log(DocNameForRedaction)
RedactionForDocRegex = new RegExp(BuildRegex(words_to_redact, RedactedWordRegex), "gmi")


// let test = string_to_redact.replace(RedactionForDocRegex, replacementString);

