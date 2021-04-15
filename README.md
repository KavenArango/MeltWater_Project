# Meltwater Project
## Description: 
* This program will read from the Key_words.txt file and convert the text into keyword that will be redacted from documents. These documents are placed in the Non-Redacted_documents when the program is ran. After a Document has the keywords redacted it will create a Redacted_documents folder. This folder is where it will output all the redacted documents. This ensures that all documents placed in the folder having a unique name.
* This program can also take single document input and return the redacted contents of the document.
# Instructions
## instructions without Returns: 
* Place the documents you want to redact in the Non-redacted_documents folder.
* Run the RedactionProgram.js. This will remove the keywords from the document.
* Open Redacted Documents and extract documents for use.
## Instructions with Returns:
* 
# Diagram
* The diagram can be seen in the ms Doc provided however if you want to see the diagram use draw.io
# Issues and Trade-offs

* Trade-off: Program checks for collisions in the redacted file and will change the name of the document without notifying the user.

* Trade-off: The program will create an output folder for the redacted files. However it will not notify the user.

* Trade-off: To make the upfront use of the program easier the manual configuration is difficult.

* Trade-off: the program will not delete the raw doucments from inside the Non-redacted documents since it is unknown if the files are back-up somewhere and its unknown if the program had any issues during the redaction process

* Issue: Program is over engineered and did not need all the code it has

* Issue: Variable name and functions are long and complicated

* Issue: Speed may have been sacrificed, due to my lack of in-depth knowledge of the language with functions is more difficult.

* Issue: No paramater validation is occuring at any point in the program.

* Issue: The Throws could be improved.

* Issue: The program is difficult to read and over commented.
