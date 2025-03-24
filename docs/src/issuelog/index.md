```mermaid
erDiagram

IssueLog {
    string issueLogId
	User relatedUser
	Severity severity
    string brief
	string text
	string uniqueCode
	date createdDate
	date modifiedDate
	User createdBy
}
```