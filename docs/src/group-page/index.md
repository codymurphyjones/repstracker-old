
```mermaid
erDiagram
GroupPage {
    string groupPageId
	string name
	GroupSection[] sections
	string shortText
	date createdDate
	date modifiedDate
	User createdBy
	string slug
}
```