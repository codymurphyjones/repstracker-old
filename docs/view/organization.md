# Organization Migration Details 

## Table Of Contents
- [Notes](#notes)
- [Diagram Details](#diagram-details)


### Notes
Organization is the root level object for a "business" account within the RepsTracker system.  We're unable to compare it to an existing data type in a linear manner because it is essentially pieces of a few data types, and specifically a derivative of of the previous User object type that splits away `Account` or now, `Organization` level settings and configurations off of the User object and bring them to a higher root level.

### Diagram Details

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

