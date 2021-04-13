class RedactDocuments {
    constructor(
        documentInputPath = '.\\Non-redacted_documents\\',
        documentOutputPath = '.\\Redacted_documents\\',
        keyWordsToRedact = "Key_words.txt",
        replacementString = "XXXX"
    ) {
        this.redactedWordRegex = /((?<='|")[^,'"]+(?='|"))|([\w]+)/gmi;
        this.documentInputPath = documentInputPath
        this.documentOutputPath = documentOutputPath
        this.keyWordsToRedact = keyWordsToRedact
        this.replacementString = replacementString
    }

    /**
     * @param {String} file The name of the file you want to read from 
     * @param {string} path A path if file does not already provide a path
     * @description Will open and read the file given to it
    */
    OpenFile(file, path = "") {
        const fs = require('fs');
        return (fs.readFileSync((path + file), 'utf-8', function (err) { if (err) throw err; })) // reads the file contents
    }

    /**
     * @param {string} path Path of the folder you want to collect from 
     * @returns (path + file name)
     * @default param uses document input path as default
     * @description opens a folder and collects the names of the files in the folder 
     */
    OpenFolderForCollection(path = this.documentInputPath) {
        const fs = require('fs');
        return [path + fs.readdirSync(path, function (err) { if (err) throw err; })]
    }

    /**
     * @param {Array} documents Array of strings holding path to a file
     * @param {string} outputPath the path you want to output the redacted document to
     * @param {string} replacementString change the string you want to use for redaction
     * @description This function takes an array of files with their path redacting the words and outputting the file to the ouput path
     */
    RedactDocuments(documents, outputPath = this.documentOutputPath, replacementString = this.replacementString) {
        const fs = require('fs');
        let redactionRegex = this.BuildRegexForRedaction() //Creates the regex used for redaction based on the file with the keywords
        const FileNameRegex = /[\w.]+$/; // Regex to get the name of the file from the path with the files extention
        let failedDocuments = ["Failed Documents"] // array of failed to redact documents

        for (var i in documents) {
            try {
                let documentPathAndName = documents[i]
                let documentName = documentPathAndName.match(FileNameRegex) // will parse out the file name from the full path
                let document = this.OpenFile(documentPathAndName)
                let RedactedDocument = document.replace(redactionRegex, replacementString); // finds all the matches and replaces them with the Replacment string
                fs.writeFile((outputPath + documentName), RedactedDocument, function (err) { if (err) throw err; }); // will write the redacted document to the output path will not check if file exists 
            }
            catch {
                failedDocuments.push(documentPathAndName) // gives a log of any failed to redact documents
                continue;
            }
        }
        if (failedDocuments.length > 1) { // checks if there are any failed documents and throws them
            throw failedDocuments
        }
    }

    /**
     * @param {string} wordsToRedact the file you want to gather the redacted words from
     * @param {Regex} Regex the Regex used to parse out the document
     * @description This will use the textfile given with the words to redact from documents and will build a regex that will be used to find the words in the documents
     * @returns regex that will be used to redact words from documents
     */
    BuildRegexForRedaction(wordsToRedact = this.keyWordsToRedact, Regex = this.redactedWordRegex) {
        const match = this.OpenFile(wordsToRedact).match(Regex) // Pareses out the word used for redaction
        var redacterWordsForDoc = ""
        for (var i in match) {
            redacterWordsForDoc += (match[i] + "|")
        }
        redacterWordsForDoc = redacterWordsForDoc.slice(0, -1) // removes the | from the last position
        return new RegExp(redacterWordsForDoc, "gmi")
    }

    /**
     * @description This will handle all of the redactions once the object has been made with the approprite paramters
     */
    DoAllDocumentRedaction() {
        this.RedactDocuments(this.OpenFolderForCollection())
    }
}

try {
    let Redactor = new RedactDocuments(undefined, undefined, "Key_words.txt")
    Redactor.DoAllDocumentRedaction()
}
catch (err) {
    console.log(err)
    return
}