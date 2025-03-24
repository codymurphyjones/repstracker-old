type Severity = {
	display: string;
	color: string;
	level: number;
};
const severities: Severity[] = [
	{
		display: 'Critical',
		color: '#EB1D3C',
		level: 4,
	},
	{
		display: 'Error',
		color: '#EB1D3C',
		level: 3,
	},
	{
		display: 'Warning',
		color: '#dbd81a',
		level: 2,
	},
	{
		display: 'Info',
		color: '#585DFB',
		level: 1,
	},
	{
		display: 'Debug',
		color: '#5EC23C',
		level: 0,
	},
];
