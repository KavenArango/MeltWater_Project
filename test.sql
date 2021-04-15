SELECT Redacted_Document.ID,
    Redacted_Document.Document_Name,
    Redacted_Words.ID,
    Redacted_Words.Word_or_Phrase
FROM Redacted_Document
    JOIN Redacted_Document_Words on Redacted_Document.ID = Redacted_Words.ID
WHERE < UserInput > == Redacted_Words.Word_or_Phrase