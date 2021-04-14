# Meltwater Project
## Description: 
* This program will use the Key_words.txt file to read the words that need to be redacted from documents in the Non-redacted_documents. once the documents have been redacted they will be outputted to the Redacted_document.
## instructions: 
* Place the documents you want to redact in the Non-redacted_documents folder.
* Run the RedactionProgram.js. This will remove the keywords from the document.
* Open Redacted Documents and extract documents for use.
# Issues and Trade-offs

* Trade-off: Program checks for collisions in the redacted file and will change the name of the document without notifying the user.

* Trade-off: The program will create an output folder for the redacted files. However it will not notify the user.

* trade-off: To make the upfront use of the program easier the manual configuration is difficult.

* Issue: Speed may have been sacrificed, due to my lack of in-depth knowledge of the language with functions is more difficult.

* issue: No paramater validation is occuring at any point in the program.

* Issue: The Throws could be improved.

* Issue: The program is difficult to read and over commented.