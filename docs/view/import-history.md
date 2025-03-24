# Import History Migration Details 

## Table Of Contents
- [Notes](#notes)
- [Diagram Details](#diagram-details)
- [Bubble Diff](#bubble-diff)


### Notes
**1. Renamed Attributes (<>):**

- *uniqueID* (in _ImportHistory) is renamed to *importHistoryId* in ImportHistory.
- *filename* (in _ImportHistory) is renamed to *fileName* in ImportHistory.
- *size* (in _ImportHistory) is renamed to *fileSize* in ImportHistory.
- *errMessage* (in _ImportHistory) is renamed to *errorMessage* in ImportHistory.
- *duplicates* (in _ImportHistory) is renamed to *duplicateCount* in ImportHistory.
- *lastViewed* (in _ImportHistory) is renamed to *lastViewedDate* in ImportHistory.

**2. Removed Attributes (-):**

- *slug* has been removed from ImportHistory.
- *mapping* has been removed from ImportHistory .

**3. Added Attributes (+):**

- *organizationId* is added in ImportHistory.

### Diagram Details

```mermaid
erDiagram

ImportHistory ||--o{ TimeEntry : createdBy
User ||--o{ ImportHistory : createdBy
Organization ||--o{ ImportHistory : owns

ImportHistory {
	string importHistoryId PK
	Organization organizationId FK
	User createdBy FK
	
	string type
	string status
	string fileSize
	string fileName
	string errorMessage
	string longStatus
	
	number rowCount
	number duplicateCount
	
	date createdDate
	date modifiedDate
	date lastViewedDate
	date endTime
	
	boolean usingLowercase
	
}
```

### Bubble Diff

```mermaid
classDiagram
class ImportHistory {
	string importHistoryId PK
	Organization organizationId FK
	string type
	string status
	string fileSize
	string fileName
	string errorMessage
	date endTime
	
	string longStatus
	
	number rowCount
	number duplicateCount
	
	date createdDate
	date modifiedDate
	date lastViewedDate
	User createdBy FK
	boolean usingLowercase
}


class _ImportHistory {
    string uniqueID

    string type
	string status
    string size
    string filename
    string errMessage
    string longStatus
	date endTime

    number duplicates
	number rowCount

	date createdDate
	date modifiedDate
    date lastViewed
    User createdBy

	boolean usingLowercase
    string mapping
    string slug
}
    _ImportHistory : <> uniqueID
    ImportHistory : <> fileName 
    _ImportHistory : <> filename
    ImportHistory : <> fileSize 
    _ImportHistory : <> size
    ImportHistory : <> errorMessage 
    _ImportHistory : <> errMessage
    ImportHistory : <> duplicateCount 
    _ImportHistory : <> duplicates
    ImportHistory : <> lastViewedDate 
    _ImportHistory : <> lastViewed
    ImportHistory : - slug
    ImportHistory : - mapping
    _ImportHistory : + slug
    _ImportHistory : + mapping
	ImportHistory : + organizationId
```

