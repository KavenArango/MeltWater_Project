# Meltwater Project
## Description: 
* This program will use the Key_words.txt file to read the words that need to be redacted from documents in the Non-redacted_documents. once the documents have be redacted they will be outputted to the Redacted_document
## instructions: 
* Place the documents you want to redact in the Non-redacted_documents folder
* Run the RedactionProgram.js. This will remove the keywords from the document.
* Open Redacted Documents.
# Issues and Trade-offs
* Trade-off: program checks for collisions in the redacted file and will change the name of a document without notifying the user
* Trade-off: the program will create an output folder for the redacted files however it 
will not notify the user
* trade-off: to make the upfront use of the program easier the manual configuration
* Issue: speed may have been sacrificed due to my lack of indepth knowledge of the language 
with functions is more difficult
* issue: no paramater validation is occuring at any point in the program
* Issue: Throws could be improved
* Issue: Difficult to read and over commented