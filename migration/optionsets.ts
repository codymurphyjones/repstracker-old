type TimeEntryCategory = 'material' | 'non-material';

type ActivityGroupLTR =
	| 'Attempted property acquisitions'
	| 'Attempted property disposals'
	| 'Real Estate Career Development'
	| 'Networking'
	| 'Property Acquisition (successful)'
	| 'Business Oversight'
	| 'Property Management'
	| 'Property Improvements'
	| 'Rental Property Business'
	| 'Dealing with vendors'
	| 'Property Selling'
	| 'Other';

type ActivityGroupsSTR =
	| 'Property acquisition activities'
	| 'Property inspections'
	| 'Advertising/Marketing'
	| 'Guest communications'
	| 'Improvements or Repairs'
	| 'Team Member communications'
	| 'Turnover/Cleaning'
	| 'Purchasing Items'
	| 'Dealing with HOAs'
	| 'Travel to/from property'
	| 'Bookkeeping'
	| 'Other';

type ActivitySubcategory = {
	activityGroup: ActivityGroupLTR;
	archived: boolean;
	category: TimeEntryCategory;
	display: string;
};

const subcategories: ActivitySubcategory[] = [
	{
		activityGroup: 'Property Acquisition (successful)',
		display: 'Negotiations',
		archived: false,
		category: 'material',
	},
	{
		activityGroup: 'Property Acquisition (successful)',
		display: 'Property inspections',
		archived: false,
		category: 'material',
	},
	{
		activityGroup: 'Property Management',
		display: 'Advertising',
		archived: false,
		category: 'material',
	},
	{
		activityGroup: 'Property Management',
		display: 'Meeting with prospective tenants',
		archived: false,
		category: 'material',
	},
	{
		activityGroup: 'Property Management',
		display: 'Approving tenants and leases',
		archived: false,
		category: 'material',
	},
	{
		activityGroup: 'Property Management',
		display: 'Evictions and other litigation',
		archived: false,
		category: 'material',
	},
	{
		activityGroup: 'Property Management',
		display: 'Evictions and other litigation',
		archived: false,
		category: 'material',
	},
	{
		activityGroup: 'Dealing with vendors',
		display: 'Negotiating property services',
		archived: false,
		category: 'material',
	},
	{
		activityGroup: 'Property Improvements',
		display: 'Managing & overseeing projects',
		archived: false,
		category: 'material',
	},
	{
		display: 'Service provider supervision',
		activityGroup: 'Property Management',
		archived: false,
		category: 'material',
	},
	{
		display: 'Managing of property managers',
		activityGroup: 'Rental Property Business',
		archived: false,
		category: 'material',
	},
	{
		display: 'Dealing with HOAs',
		activityGroup: 'Property Management',
		archived: false,
		category: 'material',
	},
	{
		display: 'Development activities',
		activityGroup: 'Property Improvements',
		archived: false,
		category: 'material',
	},
	{
		display: 'Generating financial statements',
		activityGroup: 'Rental Property Business',
		archived: false,
		category: 'material',
	},
	{
		display: 'Collecting rent',
		activityGroup: 'Property Management',
		archived: false,
		category: 'material',
	},
	{
		display: 'Bookkeeping',
		activityGroup: 'Property Management',
		archived: false,
		category: 'material',
	},
	{
		display: 'Investigating market rents and services',
		activityGroup: 'Rental Property Business',
		archived: false,
		category: 'material',
	},
	{
		display: 'Emails and other correspondence',
		activityGroup: 'Rental Property Business',
		archived: false,
		category: 'material',
	},
	{
		display: 'Reviewing zoning',
		activityGroup: 'Rental Property Business',
		archived: false,
		category: 'material',
	},
	{
		display: 'Researching market',
		activityGroup: 'Attempted property acquisitions',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Travel to property',
		activityGroup: 'Property Management',
		archived: false,
		category: 'material',
	},
	{
		display: 'Reviewing sale agreements',
		activityGroup: 'Property Acquisition (successful)',
		archived: false,
		category: 'material',
	},
	{
		display: 'Staging and decorating',
		activityGroup: 'Property Improvements',
		archived: false,
		category: 'material',
	},
	{
		display: 'Performing repairs',
		activityGroup: 'Property Improvements',
		archived: false,
		category: 'material',
	},
	{
		display: 'Obtaining property permits',
		activityGroup: 'Rental Property Business',
		archived: false,
		category: 'material',
	},
	{
		display: 'Money-raising',
		activityGroup: 'Business Oversight',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Meeting with lenders',
		activityGroup: 'Networking',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Meeting with investors',
		activityGroup: 'Networking',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Attending networking events',
		activityGroup: 'Networking',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Travel to view potential deals/markets',
		activityGroup: 'Attempted property acquisitions',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Making offer contracts',
		activityGroup: 'Attempted property acquisitions',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Making offer contracts',
		activityGroup: 'Property Acquisition (successful)',
		archived: false,
		category: 'material',
	},
	{
		display: 'Speaking to prospective sellers',
		activityGroup: 'Attempted property acquisitions',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Obtaining real estate license',
		activityGroup: 'Real Estate Career Development',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Meeting with agents/brokers',
		activityGroup: 'Networking',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Meeting with agents/brokers',
		activityGroup: 'Networking',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Property inspections',
		activityGroup: 'Attempted property acquisitions',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Property showings',
		activityGroup: 'Property Management',
		archived: false,
		category: 'material',
	},
	{
		display: 'Leasing activities (other)',
		activityGroup: 'Property Management',
		archived: false,
		category: 'material',
	},
	{
		display: 'Maintaining legal compliance',
		activityGroup: 'Rental Property Business',
		archived: false,
		category: 'material',
	},
	{
		display: 'Reviewing proposals and contracts',
		activityGroup: 'Dealing with vendors',
		archived: false,
		category: 'material',
	},
	{
		display: '3rd party contractor, vendor supervision',
		activityGroup: 'Property Improvements',
		archived: false,
		category: 'material',
	},
	{
		display: 'Paying bills or making deposits',
		activityGroup: 'Property Management',
		archived: false,
		category: 'material',
	},
	{
		display: 'Paying bills or making deposits',
		activityGroup: 'Rental Property Business',
		archived: false,
		category: 'material',
	},
	{
		display: 'Researching terms of financing',
		activityGroup: 'Property Acquisition (successful)',
		archived: false,
		category: 'material',
	},
	{
		display: 'Reviewing sale agreements',
		activityGroup: 'Attempted property acquisitions',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Reviewing sale agreements',
		activityGroup: 'Property Selling',
		archived: false,
		category: 'material',
	},
	{
		display: 'Staging and decorating',
		activityGroup: 'Property Selling',
		archived: false,
		category: 'material',
	},
	{
		display: 'Performing improvement work',
		activityGroup: 'Property Improvements',
		archived: false,
		category: 'material',
	},
	{
		display: 'Money-raising',
		activityGroup: 'Networking',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Meeting with agents/brokers',
		activityGroup: 'Attempted property acquisitions',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Real estate course',
		activityGroup: 'Real Estate Career Development',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Communications with agents/brokers',
		activityGroup: 'Attempted property acquisitions',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Real estate educational activity',
		activityGroup: 'Real Estate Career Development',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Analyzing potential deals',
		activityGroup: 'Attempted property acquisitions',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Property viewing',
		activityGroup: 'Attempted property acquisitions',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Attending real estate club meeting',
		activityGroup: 'Networking',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Communications with agent or broker',
		activityGroup: 'Property Acquisition (successful)',
		archived: false,
		category: 'material',
	},
	{
		display: 'Obtaining financing',
		activityGroup: 'Property Acquisition (successful)',
		archived: false,
		category: 'material',
	},
	{
		display: 'Generating financial projections',
		activityGroup: 'Property Acquisition (successful)',
		archived: false,
		category: 'material',
	},
	{
		display: 'Supervision of work',
		activityGroup: 'Dealing with vendors',
		archived: false,
		category: 'material',
	},
	{
		display: 'Advertising',
		activityGroup: 'Property Selling',
		archived: false,
		category: 'material',
	},
	{
		display: 'Communications with buyer',
		activityGroup: 'Property Selling',
		archived: false,
		category: 'material',
	},
	{
		display: 'Communications with agent/broker',
		activityGroup: 'Property Selling',
		archived: false,
		category: 'material',
	},
	{
		display: 'Communications with seller',
		activityGroup: 'Attempted property acquisitions',
		archived: false,
		category: 'non-material',
	},
	{
		display: 'Communications with seller',
		activityGroup: 'Property Acquisition (successful)',
		archived: false,
		category: 'material',
	},
];

type ActivityGroup = {
	type: string;
	archived: boolean;
	category: TimeEntryCategory;
	display: ActivityGroupsSTR;
};
