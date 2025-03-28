# Repstracker Migration Details 

## Table Of Contents
- [Export History Details](#export-history)
- [Import History Details](#import-history)
- [Organization Details](#organization)
- [Subscriber Plan Details](#subscriber-plan)
- [Survey Details](#survey)
- [Property Details](#property)
- [Team Member Details](#team-member)
- [Time Entry Details](#time-entry)
- [User Details](#user)
- [User Timers Details](#user-timers)

#### Full ERD Diagram

[Click here to view full ERD Diagram](./docs/view/db-diagram.md)

## Notable Questions

- In reference to export history, there is a 'createdBy' value for references the user that made the export history but there is also a Team Member object to reference as well.  I also see a Property object, so I'm assuming that TeamMember and Property are filter values that were used to create the export, but I just wanted to verify before making any assumptions

- Geographic Address can either be a seperate table entity or a series of values on top of the property object.  The frequency of access to this pattern is probably the most useful information for making that decision, so I wanted to review it over. I presume its a grab once, never grab again value, so it may be fine on the object directly.
- What is survey state and where can I reference it? It came up in one of my searches last week, but this week when looking for it, I couldn't find any specifics on it. 
- For the Team Member type, I presume we are utilizing the image value in bubble as a profile image of some variation.  Since the User object and the Team Member object are inherently different, would we want to keep the user profile as an org level value, or a system wide value.
- In Regards to the Team Member Object, currently the permissions are stored directly on the object, the new DB design needs to account for an seperate table for handling permissions for the sake of accounting for dynamic permissions.


### Export History
**1. Renamed Attributes (<>):**

- *uniqueID* (in _ExportHistory) is renamed to *exportHistoryId* in ExportHistory.

**2. Removed Attributes (-):**

- *slug* has been removed from ExportHistory.

**3. Added Attributes (+):**

- *organizationId* is added in ExportHistory.
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
[Additional Export History Details](./docs/view/export-history.md)

### Import History
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
[Additional Import History Details](./docs/view/import-history.md)

### Organization
Organization is the root level object for a "business" account within the RepsTracker system.  We're unable to compare it to an existing data type in a linear manner because it is essentially pieces of a few data types, and specifically a derivative of of the previous User object type that splits away `Account` or now, `Organization` level settings and configurations off of the User object and bring them to a higher root level.
```mermaid
erDiagram

Organization ||--|| TeamMember : owns
Organization ||--|| TimeEntry : owns
Organization ||--|| ImportHistory : owns
Organization ||--|| ExportHistory : owns
Organization ||--o{ OrgSubscriberPlan : owns

Organization {
    string orgId PK
    string ownerUserId FK
    string slug

    boolean allowBetaOptIn
    boolean forceBetaOptIn

    boolean banned
    string banReason

    string mode
    string StrTarget

    boolean trialExtended
    date freeTrialEnd

    string OrgSubscriberPlanId FK

    string stripeCustomerId
    string stripeSubscriptionId
    string appStoreSubscriptionId
    string playStoreSubscriptionId
    int planId
    boolean activeSubscription

    boolean retentionOfferRedeemed
    date retentionOfferExpires 

    date lastModified
    date createdDate

    boolean advancedLtrStrTools
    string activitySystemType

    string boxTempFolderId
    string boxToken
    string boxTokenExpiration
    string boxUserFolderId

    string affiliateSlug
    boolean needsSetup
    boolean orgDeletionRequested
    string activeCouponCode
    string pendingCouponCode
}
```
[Additional Organization Details](./docs/view/organization.md)

### Subscriber Plan

```mermaid
erDiagram

Organization ||--o{ OrgSubscriberPlan : owns
OrgSubscriberPlan ||--o{ SubscriberPlan : references

SubscriberPlan {
	string subscriberPlanId PK
    string title
	string androidPlanId
	number androidPricePerPeriod
	boolean isAnnual
	string stripePriceId
	string stripePriceIdDev
	number stripePricePerPeriod
}

OrgSubscriberPlan {
	string OrgSubscriberPlanId PK
	string subscriberPlanId
    string stripeCustomerId
    string stripeSubscriptionId
    string appStoreSubscriptionId
    string playStoreSubscriptionId
    boolean activeSubscription
}
```
[Additional Subscriber Plan Details](./docs/view/subscriber-plan.md)

### Survey
The Original Survey Answers supports 2 answer fields.  To support this in a scalable manner we need to create Survey Questions and Survey IDs. 

The Survey Answers object will contain a list of responses to surveys, for each question, for each user, attached to an ORG ID.

The Survey Questions object will contain a list of question for each survey, attached to an org ID.

The UserSurveys object will handle survey information for users, and store data related to when to show surveys based on previous survey display history.


```mermaid
erDiagram
RepsTracker ||--o{ UserSurveys : owns
UserSurveys ||--o{ Surveys : references
UserSurveys ||--o{ User : references
Surveys ||--o{ SurveyQuestions : references
Surveys ||--o{ SurveyAnswers : references
SurveyQuestions ||--o{ SurveyAnswers : references

Surveys {
	string surveyId UK
    date startDate
    date endDate
}

SurveyQuestions {
    string questionId PK
    string surveyId FK
    string question
    string answers
}

SurveyAnswers {
    string userId FK
    string questionId FK
    string surveyId FK
    string response
}

UserSurveys {
	string userSurveyId PK
	string surveyId FK
	number numOfSurveyShown
	date nextSurveyShowDate
	date lastSurveyShowDate
	boolean surveyDecline
	boolean submitted
	
	blob surveyState
}
```
[Additional Survey Details](./docs/view/survey.md)

### Property

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
[Additional Property Details](./docs/view/property.md)

### Team Member

```mermaid
erDiagram

Organization ||--o{ TeamMember : owns
TeamMember ||--o{ User : references
TeamMember ||--o{ Property : references
TeamMember ||--o{ TeamRole : references
TeamMember {
	string teamMemberId PK
	string userId
	Organization organizationId
	boolean acceptedInvite
	boolean archived

	string profileImage
	Property[] readProperties
	Property[] writeProperties
	Property[] fullAccessProperties
	TeamRole role

	date createdDate
	date modifiedDate
	User createdBy

}
	
```
[Additional Team Member Details](./docs/view/team-member.md)

### Time Entry

```mermaid
erDiagram

TimeEntry ||--|| TimeEntryProperties : owns
TimeEntry ||--|| TimeEntryEvidence : owns
User ||--|| TimeEntry : owns
ImportHistory ||--o{ TimeEntry : createdBy
TimeEntry ||--o{ TeamMember : references
TimeEntry ||--o{ InvestorType : references
TimeEntry ||--o{ TimeEntryProperties : references
TimeEntry ||--o{ InvestorType : references-option
TimeEntry ||--o{ Activity : references-option
TimeEntry ||--o{ ActivitySubcategory : references-option
TimeEntry ||--o{ ActivityGroup : references-option
TimeEntry ||--o{ ActivityGroupSTR : references-option
TimeEntry ||--o{ TimEntryCategory : references-option

TimeEntry {
	string timeEntryId
	
    date entryDate
	string entryDateString
	
	string boxFolderId
	
	string contentStatus
	string description
	
	boolean isDraft

	string timeZoneString
	
	number timeSpentOnActivityInMinutes
	derivedNumber timeSpentOnActivityInHours
	number enteredHoursSpentOnActivity
	number enteredMinutesSpentOnActivity
	
	date createdDate
	date modifiedDate
	User createdBy
	
	TeamMember teamMember
	
	TimeEntryEvidence evidenceList
	string missingFileNamesList
	
	InvestorType investorType
	ImportHistory importHistory
	
	TimeEntryProperties properties
	InvestorType convertedInvestorType
	Activity activity
	ActivitySubcategory activitySubcategory
	ActivityGroup activityGroup
	ActivityGroupSTR activityGroupSTR

    TimEntryCategory timeEntryCategory
	
	boolean newActivityFormat
}
	
TimeEntryProperties {
	string timeEntryPropertiesId
	string timeEntryId
	string propertyId
}

TimeEntryEvidence {
	string timeEntryEvidenceId
	string timeEntryId
	string evidenceUrl
}
```
[Additional Time Entry Details](./docs/view/time-entry.md)

### User

```mermaid
erDiagram
User ||--o{ TimeEntry : createdBy
User ||--o{ UserTimers : createdBy
User {
    string userId PK
    string firstName
    string lastName
    string email

    boolean isAdmin

    date lastSeen
    string lastChangeLogVersion
    date lastModified
    date createdDate

    boolean betaOptIn

    string ZoldEmail
    string loggingLevel

    boolean isOnboarded
    boolean accountDeletionRequested
}
```
[Additional User Details](./docs/view/user.md)

### User Timers

```mermaid
erDiagram
User ||--o{ UserTimers : createdBy
UserTimers {
	string userTimerId PK
	date startTime
	date endTime
	number pauseTimeAccrual
	number timeInMinutes
	number timeInHours
	string hoursText
	string minutesText
}
```
[Additional User Timers Details](./docs/view/user-timers.md)

