export type TimeEntryCategory = 'material' | 'non-material';

export type ActivityGroupLTR =
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

export type ActivityGroupsSTR =
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

export type ActivityGroup = {
	type: string;
	archived: boolean;
	category: TimeEntryCategory;
	display: ActivityGroupsSTR;
};
