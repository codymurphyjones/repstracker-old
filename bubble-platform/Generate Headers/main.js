/*
window.do_not_minify_plugin=true
Issues with duplicates on properties
Issues with Duplicates Icon Change(not sure why even remotely tbh)
How to make Duplicates appear on top?
Estimation Performance Significantly worse than original, not sure why but feel its related to bubble performance
"STR team members should fail on LTR entries" this specification wasn't in my original Validation implementation so I need to review where it fits best

username
password

Validation Requirements:
STR entries must have a property
LTR entries marked as MATERIAL must have a property
STR/LTR is required (or inferred)
If LTR, material/general is required
Date/time is required
If LTR, team member can only be blank (yourself) or your spouse

Other Factors:
LTR/STR import toggle if not specified in file
Import format: Modify existing import formats (attached) to work well
Import multiple properties (Property 1, Property 2)
Support importing property by EITHER nickname OR address
Make sure special characters work (edited)

*/

function findDuplicateRows(arrayOfObjects) {
  const duplicates = {};
  const result = [];

  arrayOfObjects.forEach((obj, index) => {
    const objWithRowId = { ...obj, rowId: index };
    const key = JSON.stringify(obj, Object.keys(obj).sort());
    if (!duplicates[key]) {
      duplicates[key] = [];
    }
    duplicates[key].push(objWithRowId);
  });

  for (const key in duplicates) {
    if (duplicates[key].length > 1) {
      result.push(duplicates[key]);
    }
  }

  return result;
}

// Example usage
const arrayOfObjects = [
  { a: 1, b: 2 },
  { a: 1, b: 2 },
  { a: 2, b: 3 },
  { a: 1, b: 2, c: 3 },
  { b: 2, a: 1 },
];
const dArray = findDuplicateRows(arrayOfObjects);
console.log(dArray);
function createDuplicatesObject(duplicatesArray) {
  let outObject = [];
  for (let i = 0; i < duplicatesArray.length; i++) {
    let copiesArray = duplicatesArray[i];
    console.log(copiesArray);
    const idArray = copiesArray.map((item) => item.rowId);
    for (let x = 0; x < copiesArray.length; x++) {
      let item = copiesArray[x];
      let array = idArray.filter((index) => index !== item.rowId);

      item.duplicates = array;
      outObject.push(item);
    }
  }

  console.log(outObject);
  return outObject;
}

createDuplicatesObject(dArray);


Questions:
Where to put subcategory 
Can you convert string into dates


Current todo list in order of priority

Add LTR Requirement to Time Entry Category and Validation (STR does not support Time Entry Category)
Update Time Entry UI to actually show result details (currently its information i used for debugging)
Create Generic error information UI
Create Duplicate Entry UI

Add Material/General for LTR Errors
Add Constraints to Convert CSV To Time Entry Object: Created by Current User
Add STR/Mode as a Value, not inherit from user
Improve Validation on LTR Activity Group and LTR Sub Group
Make Column Names case-insensitive
Make teamlookup and address case-insensitive (remove punctuation)
Fix 1 Item Imports
///window.do_not_minify_plugin = true


Documented Bugs
change Subcategory to Activity Subcategory
Change Group to Activity Group
Ignore Columns that cannot be validated during validation. Alert User of potentially invalid columns
Make mode visible before file upload, ensure mode is reflective of the current userMode

866-302-3791
16370192
34882L9JWQ



Monday
Adding Dynamic Field Data for STR Lookups: 3 hours
Tuesday
Adding Dynamic Field Data for LTR Lookups: 2 hours
Going Through Files and Error list: 2 hours
Wednesday
Meeting with Austin: 40 minutes
Thursday
Fixing Issues Related to imports and case insensitivity: 3 hours
Friday
Experimenting with imports to ensure proper validation and data loading: 1 hour

//use material in lookup
/*
Activity Group
Date
Description
Minutes
Hours

/*

Monday
Migrating Validation Implementation to Repstracker - 4 Hours
Tuesday
Creating Property Lookup System - 2 Hours
Creating Team Member Lookup System - 1 Hour
Exploring How to transfer typed data into bubble - 4.5 Hours
Wednesday
Call with Austin - 30mins
Implementing Lookup Items for Activity Groups: 1 Hour
Thursday
Creating Serverside Validation Lookups: 3.5 Hours

Friday
Call with Austin - 30mins
Exploring General and Material Type Differences- 2.5 Hour
Reworking String Verification for Serverside Lookup - 2 Hours

Saturday
Implementing Lookup Items for Activity Groups: 1 Hour

Sunday
Completing testable version and removing issues from Repstracker: 1 hour








Activity Group(LTR)
Attempted property acquisitions
Real Estate Career Development
Networking
Property Acquisition (successful)
Business Oversight
Property Management
Property Improvements
Rental Property Business
Dealing with vendors
Property Selling
Other
Other

Activity Group(STR)
Property acquisition activities
Property inspections
Advertising/Marketing
Guest communications
Improvements or Repairs
Team Member communications
Turnover/Cleaning
Purchasing Items
Dealing with HOAs
Travel to/from property
Bookkeeping
Other

Activity Subcategories
Negotiations
Obtaining financing
Property inspections
Advertising
Meeting with prospective tenants
Approving tenants and leases
Evictions and other litigation
Negotiating property services
Managing & overseeing projects
Service provider supervision
Managing of property managers
Dealing with HOAs
Development activities
Generating financial statements
Collecting rent
Bookkeeping
Investigating market rents and services
Emails and other correspondence
Reviewing zoning
Researching market
Travel to property
Reviewing sale agreements
Staging and decorating
Performing repairs
Obtaining property permits
Money-raising
Meeting with lenders
Meeting with investors
Meeting with RE tax advisor 
Meeting with real estate coach
Attending networking events
Attending local real estate clubs
Travel to view potential deals/markets
Making offer contracts
Physically searching for properties
Property viewing
Speaking to prospective sellers
Obtaining real estate license
Meeting with agents/brokers
Reviewing financial statements provided by 3rd parties
Reviewing or reading property manager reports
Making offer contracts
Property inspections
Property showings
Leasing activities (other)
Maintaining legal compliance
Reviewing proposals and contracts
3rd party contractor, vendor supervision
Paying bills or making deposits
Researching terms of financing
Reviewing sale agreements
Staging and decorating
Performing improvement work
Money-raising
Meeting with agents/brokers
Real estate course
Communications with agents/brokers
Real estate educational activity
Analyzing potential deals
Property viewing
Attending real estate club meeting
Communications with agent or broker
Obtaining financing
Generating financial projections
Supervision of work
Advertising
Communications with buyer
Meeting with RE financial advisor
Property inspections
Negotiations
Other

*/
