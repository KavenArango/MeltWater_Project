const fs = require('fs');


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
        this.outputDocNames = []
    }

    /**
     * @param {String} file The name of the file you want to read from 
     * @param {string} path A path if file does not already provide a path
     * @description Will open and read the file given to it
    */
    OpenFile(file, path = "") {
        return (fs.readFileSync((path + file), 'utf-8', function (err) { if (err) throw err; })) // reads the file contents
    }

    /**
     * @param {string} path Path of the folder you want to collect from 
     * @returns {array}(path + file name)
     * @default param uses document input path as default
     * @description opens a folder and collects the names of the files in the folder 
     */
    OpenFolderForCollection(path = this.documentInputPath) {
        let fileNames = fs.readdirSync(path, function (err) { if (err) throw err; }) // returns the names of the files in a folder
        let filePathsWithNames = []
        fileNames.forEach(file => {
            filePathsWithNames.push((path + file)) // gives each file a path to where its located
        });
        return filePathsWithNames
    }

    /**
     * 
     * @param {string} documentPathAndName 
     * @description this will parse out the name of a file from a string
     * @returns {string} file name
     */
    ParseDocumentNameFromPath(documentPathAndName) {
        const FileNameRegex = /[\w.]+$/; // Regex to get the name of the file from the path with the files extention
        return documentPathAndName.match(FileNameRegex) // will parse out the file name from the full path
    }

    /**
     * 
     * @param {array} outputDocNames An array of documents in the output folder
     * @param {string} documentNameWithPath A path to a Doc that needs to be redacted
     * @param {string} outputPath Where the output of the redacted files will be
     * @returns A new file name for the redacted document
     * @description this will take a outputpath a path to a document and a array of documents in the output path and uses them to find repeating names and changes them to avoid overwrites
     */
    RenameRepeatingDocNames(outputDocNames, documentNameWithPath, outputPath = this.documentOutputPath) {
        var docName = this.ParseDocumentNameFromPath(documentNameWithPath) // gets the name of the doc from the path
        const originalName = docName // will be used in the foreach for a unique name
        var i = 1; // used to give the doc a unique name this will inciment until a name is found
        while (outputDocNames.find(Element => Element == (outputPath + docName))) {
            docName = i + originalName; // changed the name of a doc <int><document_name>
            ++i
        }
        outputDocNames.push(outputPath + docName)// adds the new doc on to the array so that we can now check it against collisions
        return docName // returns the new doc name
    }

    /**
     * @param {Array} documents Array of strings holding path to a file
     * @param {string} outputPath the path you want to output the redacted document to
     * @param {string} replacementString change the string you want to use for redaction
     * @param {Regex} redactionRegex the regex used to find the words that need to be redacted from the doc
     * @description This function takes an array of files with their path redacting the words and outputting the file to the ouput path
     */
    RedactDocuments(documents, redactionRegex, outputPath = this.documentOutputPath, replacementString = this.replacementString) {
        let failedDocuments = [] // array of failed to redact documents
        this.CreatePath(outputPath) // mkaes sure the output path exists and if it doesnt it makes the path
        var outputDocNames = this.OpenFolderForCollection(outputPath) // gets all the files in the output folder used to stop collisions
        documents.forEach(documentPathAndName => {
            try {
                let replacementDocumentName = this.RenameRepeatingDocNames(outputDocNames, documentPathAndName, outputPath) // will change the name of any document that has a repeating name in the output folder to avoid overwriting docs
                let documentContent = this.OpenFile(documentPathAndName) //opens the file to be redacted
                let RedactedDocument = documentContent.replace(redactionRegex, replacementString); // finds all the matches and replaces them with the Replacment string
                fs.writeFile((outputPath + replacementDocumentName), RedactedDocument, function (err) { if (err) throw err; }); // will write the redacted document to the output path will not check if file exists 
            }
            catch {
                failedDocuments.push(documentPathAndName) // gives a log of any failed to redact documents
            }
        })
        this.CheckForFailedDocuments(failedDocuments)
    }

    /**
     * 
     * @param {string} path the path to where a file is being outputted
     * @description if a path to the output does not exists the path will be made with this function
     */
    CreatePath(path = this.documentOutputPath) {
        fs.mkdirSync(path, { recursive: true })
    }

    /**
     * @param {array} failedDocuments an array of the failed to redact documents 
     * @description if a document cannot be parsed then it will add a description and throw
     * @throws This function will throw all the documents that failed to parse
     */
    CheckForFailedDocuments(failedDocuments) {
        if (failedDocuments.length > 0) {
            failedDocuments.unshift("Failed Documents")
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
        let match = this.OpenFile(wordsToRedact).match(Regex) // Pareses out the word used for redaction
        let redacterWordsForDoc = ""
        for (var i in match) {
            redacterWordsForDoc += (match[i] + "|") //Expected: <Word/Phrase>|<Word/Phrase>|<Word/Phrase>|...etc
        }
        redacterWordsForDoc = redacterWordsForDoc.slice(0, -1) // removes the trailing "|" from the last position
        return new RegExp(redacterWordsForDoc, "gmi")
    }

    /**
     * @description This will handle all of the redactions once the object has been made with the approprite paramters
     */
    DoAllDocumentRedaction() {
        let filesForRedaction = this.OpenFolderForCollection()
        let regexToRedactFromFiles = this.BuildRegexForRedaction()
        this.RedactDocuments(filesForRedaction, regexToRedactFromFiles)
    }
}

try {
    let Redactor = new RedactDocuments()
    Redactor.DoAllDocumentRedaction()
}
catch (err) {
    console.log(err)
    return
}