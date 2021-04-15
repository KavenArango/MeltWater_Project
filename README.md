# Meltwater Project
## Description: 
* This program will use the Key_words.txt file to read the words that need to be redacted from and will gather all the files in the Non-redacted_documents folder it will then remove any keywords found in the file and create an output folder for the newly redacted documents it will be up to the user to remove any documents inside the Non-redacted_documents folder.
## instructions: 
* Place the documents you want to redact in the Non-redacted_documents folder.
* Run the RedactionProgram.js. This will remove the keywords from the document.
* Open Redacted Documents and extract documents for use.
# Diagram
* The diagram can be seen in the ms Doc provided however if you want to see the diagram use draw.io
# Issues and Trade-offs

* Trade-off: Program checks for collisions in the redacted file and will change the name of the document without notifying the user.

* Trade-off: The program will create an output folder for the redacted files. However it will not notify the user.

* Trade-off: To make the upfront use of the program easier the manual configuration is difficult.

* Trade-off: the program will not delete the raw doucments from inside the Non-redacted documents since it is unknown if the files are back-up somewhere and its unknown if the program had any issues during the redaction process

* Issue: Speed may have been sacrificed, due to my lack of in-depth knowledge of the language with functions is more difficult.

* issue: No paramater validation is occuring at any point in the program.

* Issue: The Throws could be improved.

* Issue: The program is difficult to read and over commented.