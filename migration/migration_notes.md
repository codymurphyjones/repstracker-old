# Repstracker Migration Notes

[Survey Migration Details](#survey)

## Notable Questions
- What is survey state and where can I reference it? It came up in one of my searches last week, but this week when looking for it, I couldn't find any specifics on it. 

### Team Member Pattern

```mermaid
erDiagram

CognitoAccount {
    string cognitoId
}

Organization {
    string orgId PK
    string ownerUserId
    string slug

    boolean allowBetaOptIn
    boolean forceBetaOptIn

    boolean banned
    string banReason

    string mode
    string StrTarget

    boolean trialExtended
    date freeTrialEnd

    string OrgSubscriberPlanId

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

TeamMember {
	string teamMemberId PK
	string userId
	string organizationId
	boolean acceptedInvite
}
	

User ||--o{ UserSurveys : creates
User ||--o{ TimeEntry : createdBy
User ||--o{ UserTimers : createdBy
User {
    string userId PK
    string firstName
    string lastName
    string email

    boolean isAdmin

    boolean surveySubmitted50
    int surveyShownCount
    date surveyNextShowDate
    boolean surveyDeclined

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


### Survey

Survey Answers Original supports 2 answer fields.  To combat this, we need to create Survey Questions and Survey IDs. 

The Survey Answers object will contain a list of responses to surveys, for each question, for each user, attached to an ORG ID.

The Survey Questions object will contain a list of question for each survey, attached to an org ID.

The UserSurveys object will handle survey information for users, and store data related to when to show surveys based on previous survey display history.


```mermaid
erDiagram
UserSurveys ||--o{ Surveys : references
Surveys ||--o{ SurveyQuestions : references
SurveyQuestions ||--o{ SurveyAnswers : references

UserSurveys {
	string userSurveyId
	string surveyId PK
	number numOfSurveyShown
	date nextSurveyShowDate
	date lastSurveyShowDate
	boolean surveyDecline
	boolean submitted
}

Surveys {
	string surveyId
    date startDate
    date endDate
}

SurveyQuestions {
    string questionId
    string surveyId
    string question
    string answers
}

SurveyAnswers {
    string userId PK
    string questionId
    string surveyId PK
    string response
}
Old_Surveys_Roughly ||--o{ Old_UserSurveys : references
Old_UserSurveys ||--o{ Old_SurveyAnswers : references

Old_Surveys {
	string surveyId PK
	blob surveyData
}
Old_UserSurveys {
	string userSurveyId
	string surveyId PK
	number numOfSurveyShown
	date nextSurveyShowDate
	date lastSurveyShowDate
	boolean surveyDecline
	boolean submitted
	
	blob surveyState
}

Old_SurveyAnswers {
    string answer1
	string answer2
	date createdDate
	date modifiedDate
	string userId
	string uniqueID
	string slug
}

```