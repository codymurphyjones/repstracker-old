type SubscriptionPlan = {
	display: string;
	androidPlanId: string;
	androidPricePerPeriod: number;
	isAnnual: boolean;
	stripePriceId: string;
	stripePriceIdDev: string;
	stripePricePerPeriod: number;
};

const subscriptionPlans: SubscriptionPlan[] = [
	{
		display: 'Monthly',
		androidPlanId: 'monthly-32',
		androidPricePerPeriod: 32,
		isAnnual: false,
		stripePriceId: 'price_1MN2FKC2Ur2GpAhboYJJXCWW',
		stripePriceIdDev: 'price_1MN24RC2Ur2GpAhbhLys9cg1',
		stripePricePerPeriod: 29,
	},
	{
		display: 'Annual',
		androidPlanId: 'annual-306',
		androidPricePerPeriod: 306,
		isAnnual: true,
		stripePriceId: 'price_1MN2FcC2Ur2GpAhbQ0jQrb4Z',
		stripePriceIdDev: 'price_1MN259C2Ur2GpAhb1PMtmHST',
		stripePricePerPeriod: 278,
	},
	{
		display: 'Monthly (Legacy 2)',
		androidPlanId: '',
		androidPricePerPeriod: 0,
		isAnnual: false,
		stripePriceId: 'price_1Jz4ZLC2Ur2GpAhbCgk6gg7F',
		stripePriceIdDev: 'price_1Jz4WDC2Ur2GpAhbprTGzbAH',
		stripePricePerPeriod: 15,
	},
	{
		display: 'Annual (Legacy 2)',
		androidPlanId: '',
		androidPricePerPeriod: 0,
		isAnnual: true,
		stripePriceId: 'price_1Jz4ZfC2Ur2GpAhbur2HotPt',
		stripePriceIdDev: 'price_1Jz4XGC2Ur2GpAhbSOJ7FlM5',
		stripePricePerPeriod: 144,
	},
	{
		display: 'Monthly (Legacy)',
		androidPlanId: '',
		androidPricePerPeriod: 0,
		isAnnual: true,
		stripePriceId: 'price_1IT768C2Ur2GpAhbjP2cxNId',
		stripePriceIdDev: 'price_1ICvcpC2Ur2GpAhbQPrrJft9',
		stripePricePerPeriod: 12,
	},
	{
		display: 'Annual (Legacy)',
		androidPlanId: '',
		androidPricePerPeriod: 0,
		isAnnual: true,
		stripePriceId: 'price_1IT768C2Ur2GpAhbHQ93jk6C',
		stripePriceIdDev: 'price_1ICvcpC2Ur2GpAhbUEpwXMbm',
		stripePricePerPeriod: 115,
	},
];
