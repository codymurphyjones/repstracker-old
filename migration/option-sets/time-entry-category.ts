type TimeEntryCategory = {
	shortDisplay: string;
	display: string;
	shorterDisplay: string;
	shortestDisplay: string;
	systemIdentifier: number;
	systemValues: string[];
};

const timeEntryCategories: TimeEntryCategory[] = [
	{
		shortDisplay: 'Material Participation',
		display: 'Material Participation',
		shorterDisplay: 'Material',
		shortestDisplay: 'M',
		systemIdentifier: 1,
		systemValues: ['M', 'Material', 'Material Participation'],
	},
	{
		shortDisplay: 'Non-Material Hours',
		display: 'Qualifying Non-Material Hours',
		shorterDisplay: 'Non-Material',
		shortestDisplay: 'NM',
		systemIdentifier: 0,
		systemValues: [
			'NM',
			'Non-Material',
			'G',
			'General',
			'General Real Estate Activity',
		],
	},
];
