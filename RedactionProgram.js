class RedactDocuments {
    constructor(
        document_Input_Path = '.\\Non-redacted_documents\\',
        document_Output_Path = '.\\Redacted_documents\\',
        key_Words_To_Redact = "Key_words.txt",
        replacementString = "XXXX"
    ) {
        this.RedactedWordRegex = /((?<='|")[^,'"]+(?='|"))|([\w]+)/gmi;
        this.document_Input_Path = document_Input_Path
        this.document_Output_Path = document_Output_Path
        this.key_words_to_redact = key_Words_To_Redact
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
     * @param {string} param Path of the folder you want to collect from 
     * @returns (path + file name)
     * @default param uses document input path as default
     * @description opens a folder and collects the names of the files in the folder 
     */
    OpenFolderForCollection(path = this.document_Input_Path) {
        const fs = require('fs');
        return [path + fs.readdirSync(path, function (err) { if (err) throw err; })]
    }

    /**
     * @param {Array} documents Array of strings holding path to a file
     * @description This function takes an array of files with their path redacting the words and outputting the file to the ouput path
     */
    RedactDocuments(documents) {
        var fs = require('fs');
        let redactionRegex = this.BuildRegexForRedaction() //Creates the regex used for redaction based on the file with the keywords
        const FileNameRegex = /[\w.]+$/; // Regex to get the name of the file from the path with the files extention
        let failedDocuments = ["Failed Documents"] // array of failed to redact documents

        for (var i in documents) {
            try {
                let documentPathAndName = documents[i]
                let documentName = documentPathAndName.match(FileNameRegex) // will parse out the file name from the full path
                let document = this.OpenFile(documentPathAndName)
                let RedactedDocument = document.replace(redactionRegex, this.replacementString); // finds all the matches and replaces them with the Replacment string
                fs.writeFile((this.document_Output_Path + documentName), RedactedDocument, function (err) { if (err) throw err; }); // will write the redacted document to the output path will not check if file exists 
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
     * @description This will use the textfile given with the words to redact from documents and will build a regex that will be used to find the words in the documents
     * @returns regex that will be used to redact words from documents
     */
    BuildRegexForRedaction() {
        const match = this.OpenFile(this.key_words_to_redact).match(this.RedactedWordRegex)
        var RedactedWordsForDoc = ""
        for (var i in match) {
            RedactedWordsForDoc += (match[i] + "|")
        }
        RedactedWordsForDoc = RedactedWordsForDoc.slice(0, -1)
        return new RegExp(RedactedWordsForDoc, "gmi")
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