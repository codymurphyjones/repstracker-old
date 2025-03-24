export type ActivitySystemType = {
	display: string;
	onboardingText: string;
	settingsText: string;
};

const activitySystemTypes: ActivitySystemType[] = [
	{
		display: 'Activities',
		onboardingText: 'Enable the new activities system (recommended)',
		settingsText: 'Enable the new activities system',
	},
	{
		display: 'Group/Subcategory',
		onboardingText: 'Continue to use Group/Subcategory (old system)',
		settingsText: 'Continue to use Group/Subgroup',
	},
];
