The Original Survey Answers supports 2 answer fields.  To support this in a scalable manner we need to create Survey Questions and Survey IDs. 

The Survey Answers object will contain a list of responses to surveys, for each question, for each user, attached to an ORG ID.

The Survey Questions object will contain a list of question for each survey, attached to an org ID.

The UserSurveys object will handle survey information for users, and store data related to when to show surveys based on previous survey display history.

The diff variation was left out for this file because it was such a drastic change in comparison to the previous version that creating a diff that was useful seemed to be an obstacle.