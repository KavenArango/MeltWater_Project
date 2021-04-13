// let myRegex = /[a-zA-z ]+/g;
// ([a-zA-z]+)|([a-zA-z ]+[^"', ]*)
// [^\s"',]+|"([^"]*)"|'([^']*)';
// ([\w]+)|([\w]+[^'",])
// ((?<=')[^,']+(?='))|((?<=")[^,"]+(?="))|([\w]+)
// ((?<='|")[^,'"]+(?='|"))|([\w]+)


class RedactDocuments {
    constructor(Non_redacted_documents_path = '.\\Non-redacted_documents\\', Redacted_documents_path = '.\\Redacted_documents\\', Key_words = "Key_words.txt", replacementString = "XXXX") {
        this.RedactedWordRegex = /((?<='|")[^,'"]+(?='|"))|([\w]+)/gmi;
        this.Non_redacted_documents_path = Non_redacted_documents_path
        this.Redacted_documents_path = Redacted_documents_path
        this.Key_words = Key_words
        this.replacementString = replacementString
        this.redactionRegex = new RegExp(this.BuildRegexForRedaction(), "gmi")
    }

    OpenFile(file, path = "") {
        const fs = require('fs');
        return (fs.readFileSync((path + file), 'utf-8', function (err) { if (err) throw err; }))
    }

    RedactDocuments(documents) {
        var fs = require('fs');
        let foundFailedDocuments = false
        let FailedDocuments = []
        const FileNameRegex = /[\w.]+$/;
        for (var i in documents) {
            try {
                let document = this.OpenFile(documents[i])
                let RedactedDocument = document.replace(this.redactionRegex, this.replacementString);
                fs.writeFile((this.Redacted_documents_path + documents[i].match(FileNameRegex)), RedactedDocument, function (err) { if (err) throw err; });
            } catch
            {
                FailedDocuments.push(documents[i].match(FileNameRegex))
                foundFailedDocuments = true
            }
        }
        if (foundFailedDocuments) {
            throw FailedDocuments
        }
    }

    GetDocumentsForRedaction() {
        const fs = require('fs');
        return [this.Non_redacted_documents_path + fs.readdirSync(this.Non_redacted_documents_path, function (err) { if (err) throw err; })]

    }

    BuildRegexForRedaction() {
        const match = this.OpenFile(this.Key_words).match(this.RedactedWordRegex)
        var RedactedWordsForDoc = ""
        for (var i in match) {
            RedactedWordsForDoc += (match[i] + "|")
        }
        RedactedWordsForDoc = RedactedWordsForDoc.slice(0, -1)
        return RedactedWordsForDoc
    }

    DoAllDocumentRedaction() {
        this.RedactDocuments(this.GetDocumentsForRedaction())
    }
}


try {
    let Redactor = new RedactDocuments(undefined, undefined, "Other_Key_words.txt")
    Redactor.DoAllDocumentRedaction()
}
catch (err) {
    console.log(err)
    return
}