```mermaid
classDiagram
class Timeentry {
	ActivityCategoriesOS activitySubcategory
	Activity activity
	GroupOS activityGroup
	ActivityGroupOS activityGroupSTR
	ActivityCategoryType timeEntryCategory
	string boxFolderId
	string contentStatus
	InvestorType0 convertedInvestorType
	date date
	string dateString
	string description
	number enteredMinutesSpentonActivity
	ImportHistory importHistory
	InvestorType0 investorType
	string[] missingFileNames
	boolean newActivityFormat
	File[] photo/Fileevidencelist
	Property[] properties
	Teammember teamMember
	number convertedTimetoMinutes
	number enteredHoursSpentonActivity
	string timezoneString
	date createdDate
	date modifiedDate
	User createdBy
	string uniqueID
	string slug
}```