```mermaid
erDiagram

Activity ||--o{ TimeEntryCategory : references
Activity {
    string activityId
	boolean archived
	string name
	TimeEntryCategory category
	date createdDate
	date modifiedDate
	User createdBy
}
```