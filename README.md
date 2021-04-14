# Meltwater Project
## Description: 
* This program will use the Key_words.txt file to read the words that need to be redacted from documents in the Non-redacted_documents. once the documents have be redacted they will be outputted to the Redacted_document
## instructions: 
* Place the documents you want to redact in the Non-redacted_documents folder
* Run the RedactionProgram.js. This will remove the keywords from the document.
* Open Redacted Documents.
# Issues and trade-offs
* Issue: the program will assume the Non-Redacted folder is empty and will not check for any type of name collisions
* Issue: speed may have been sacrificed due to my lack of indepth knowledge of the language 
* trade-off: to make the upfront use of the program easier the manual configuration with functions is more difficult
* issue: no paramater validation is occuring at any point in the program
* Issue: Throws could be improved