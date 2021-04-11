function OpenFile(file) {
    const fs = require('fs');
    try {
        return (fs.readFileSync(file, 'utf-8'))
    } catch {
        throw "Error Opening File"
    }
}
function BuildRegex(words_to_redact, RedactedWordRegex) {

}
function RedactDocument(document, myRegex) {
    try {

    } catch
    {

    }
}

// let myRegex = /[a-zA-z ]+/g;
// ([a-zA-z]+)|([a-zA-z ]+[^"', ]*)
// [^\s"',]+|"([^"]*)"|'([^']*)';
let RedactedWordRegex = /([a-zA-z]+)/gm;
let replacementString = "XXXX"
try {
    var words_to_redact = OpenFile('Key_words.txt')
}
catch
{
    console.log("Unable to Open Redacted Words File")
    return
}

console.log(RedactedWordRegex)
console.log(words_to_redact)
let string_to_redact = "Hello This is the Boston Red sox going to get a Pizza hopefully a Cheese Pizza and a side of beer"
//let match = myRegex.matchAll(words_to_redact)
//let test = words_to_redact.replace(myRegex, replacementString);

//console.log(words_to_redact)
//console.log(test)
