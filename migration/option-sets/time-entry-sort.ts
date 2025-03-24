type TimeEntrySort = {
	field: string;
	short: string;
	display: string;
};

const timeEntrySorts: TimeEntrySort[] = [
	{
		field: 'Date',
		short: 'Date',
		display: 'Date',
	},
	{
		field: 'Converted Time to Minutes',
		short: 'Time',
		display: 'Time Spent on Activity',
	},
];
