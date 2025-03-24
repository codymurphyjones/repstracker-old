# User Timers Migration Details 

## Table Of Contents
- [Diagram Details](#diagram-details)


### Diagram Details

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

