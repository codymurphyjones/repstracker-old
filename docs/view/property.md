# Property Migration Details 

## Table Of Contents
- [Notable Questions](#notable-questions)
- [Diagram Details](#diagram-details)
- [Bubble Diff](#bubble-diff)


## Notable Questions


- Geographic Address can either be a seperate table entity or a series of values on top of the property object.  The frequency of access to this pattern is probably the most useful information for making that decision, so I wanted to review it over. I presume its a grab once, never grab again value, so it may be fine on the object directly.

### Diagram Details

```mermaid
erDiagram
User ||--o{ Property : createdBy
Property ||--o{ InvestorType : references-option
Property ||--o{ InvestorTypeMode : references-option
Property ||--o{ GeographicAddress : references-option

Property {
	string propertyId PK
	User createdBy FK
	InvestorType defaultType FK
	InvestorTypeMode types FK
	GeographicAddress propertyAddress 

	string address
	string city
	string propertyImage
	string nickname
	string state
	string streetName
	string buildingNumber
	string yearTypes

	boolean archived

	number zipCode
	number streetNumber

	date createdDate
	date modifiedDate
}
```

### Bubble Diff

```mermaid
classDiagram

class Property {
    string propertyId
	string address
	boolean archived
	string city
	string propertyImage
	InvestorType defaultType
	string nickname
	GeographicAddress propertyAddress
	string state
	string streetName
	number streetNumber
	string suiteNumber
	InvestorTypeMode types
	string yearTypes
	number zipCode
	date createdDate
	date modifiedDate
	User createdBy
}


class _Property {
    string uniqueID
	string address
	boolean archived
	string city
	Image image
	InvestorType defaultType
	string nickname
	GeographicAddress propertyAddress
	string state
	string streetName
	number streetNumber
	string suite/ApartmentNumber
	InvestorTypeMode types
	string yearTypes
	number zipCode
	date createdDate
	date modifiedDate
	User createdBy
	string slug
}
    Property: <> propertyImage
    _Property : <> image
    _Property : <> suite/ApartmentNumber
    Property : <> suiteNumber

    _Property : + slug
    Property : - slug
```

