```mermaid
erDiagram
Analyticslog {
    string analyticsLogID
	AnalyticsAction action
	string detail1
	string page
	User relatedUser
	date timestamp
	date createdDate
	date modifiedDate
	User createdBy
}
```