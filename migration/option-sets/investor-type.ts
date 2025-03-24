type InvestorType = {
	LongTitle: string;
	ShortTitle: string;
	label: string;
	isDefault: boolean;
};

type InvestorTypeMode = 'LTR' | 'STR' | 'BOTH';

const investorTypes: InvestorType[] = [
	{
		LongTitle: 'Accredited Investor',
		ShortTitle: 'Long-Term',
		label: 'LTR',
		isDefault: false,
	},
	{
		LongTitle: 'Short-Term Rental',
		ShortTitle: 'Short-Term',
		label: 'STR',
		isDefault: true,
	},
];
