# Survey Migration Details 

## Table Of Contents
- [Notable Questions](#notable-questions)
- [Notes](#notes)
- [Diagram Details](#diagram-details)
- [Bubble Diff](#bubble-diff)
- [Additional Details](#additional-details)


## Notable Questions

- What is survey state and where can I reference it? It came up in one of my searches last week, but this week when looking for it, I couldn't find any specifics on it. 

### Notes
The Original Survey Answers supports 2 answer fields.  To support this in a scalable manner we need to create Survey Questions and Survey IDs. 

The Survey Answers object will contain a list of responses to surveys, for each question, for each user, attached to an ORG ID.

The Survey Questions object will contain a list of question for each survey, attached to an org ID.

The UserSurveys object will handle survey information for users, and store data related to when to show surveys based on previous survey display history.



### Diagram Details

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

### Bubble Diff

```mermaid
classDiagram
    class User {
        +int id
        +string name
        +string email
        +date created_at
        +date updated_at
        +string phone 
    }
    class Order {
        +int id
        +int user_id
        +float total_amount
        +date created_at
    }

    %% Old schema (only User table):
    class OldUser {
        +int id
        +string name
        +string email
        +date created_at
        +date updated_at
    }

    %% Highlight changes
    User : <<New>> phone
    OldUser : <<Removed>> phone
```

### Additional Details

test
