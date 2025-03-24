```mermaid
erDiagram
Organization ||--o{ ExportHistory : createdBy
User }o--o{ ExportHistory : createdBy
ExportHistory ||--|| Property : references
ExportHistory ||--|| TeamMember : references
ExportHistory {
	string exportHistoryId PK
	Organization organizationId FK, PK
	Property property FK
	TeamMember teamMember FK
	number exportRows
	string status
	string url
	string year
	date createdDate
	date modifiedDate
	User createdBy FK
}
```