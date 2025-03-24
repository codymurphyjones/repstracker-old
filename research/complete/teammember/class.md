```mermaid
classDiagram
class Teammember {
	boolean archived
	Image image
	string lastName
	string firstName
	User owner
	Property[] properties
	TeamRole role
	date createdDate
	date modifiedDate
	User createdBy
	string uniqueID
	string slug
}```