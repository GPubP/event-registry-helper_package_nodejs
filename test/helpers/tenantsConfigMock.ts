import { TenantsConfig } from '@wcm/config-helper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTenantsConfigMock = ({ requestModuleFn = jest.fn(() => Promise.resolve()) as jest.Mock<any, any> } = {}): TenantsConfig  => {
	return {
		requestModule: requestModuleFn,
		getModuleContext: () => ({
			uuid: 'module-uuid',
			data: { routePrefix: 'module-route-prefix' }
		}),
		getAllApps: () => ([
			{
				modules: [
					// Cover faulty configurations in test
					{},
					{ module: {} },
					{ module: { data: {} } },

					{
						module: {
							data: { routePrefix: 'module-route-prefix' },
							uuid: 'module-uuid'
						}
					}
				]
			}
		]),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		on: (event: any, callback: any) => callback()
	} as unknown as TenantsConfig;
};

export const getEmptyTenantsConfigMock = ({
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	requestModuleFn = jest.fn(() => Promise.resolve()) as jest.Mock<any, any>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getModuleContextFn = jest.fn(() => undefined) as jest.Mock<any, any>
} = {}): TenantsConfig  => {
	return {
		requestModule: requestModuleFn,
		getModuleContext: getModuleContextFn,
		getAllApps: () => ([
			{
				modules: [
					// Cover faulty configurations in test
					{},
					{ module: {} },
					{ module: { data: {} } },

					{
						module: {
							data: { routePrefix: 'module-route-prefix' },
							uuid: 'module-uuid'
						}
					}
				]
			}
		]),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		on: (event: any, callback: any) => callback()
	} as unknown as TenantsConfig;
};
