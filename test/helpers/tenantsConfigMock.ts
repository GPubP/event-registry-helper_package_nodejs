import { TenantsConfig } from '@wcm/config-helper';

export const getTenantsConfigMock = ({
	requestModuleFn = jest.fn(() => Promise.resolve()) as jest.Mock<any, any>, // tslint:disable-line no-any
} = {}): TenantsConfig  => {
	return {
		requestModule: requestModuleFn,
		getModuleContext: () => ({
			uuid: 'module-uuid',
			data: {
				routePrefix: 'module-route-prefix',
			},
		}),
		getAllApps: () => ([
			{
				modules: [
					// Cover faulty configurations in test
					{},
					{ module: {} },
					{ module: {
						data: {},
					}},

					{
						module: {
							data: {
								routePrefix: 'module-route-prefix',
							},
							uuid: 'module-uuid',
						},
					},
				],
			},
		]),
		on: (event, callback) => callback(),
	} as unknown as TenantsConfig;
};

export const getEmptyTenantsConfigMock = ({
	requestModuleFn = jest.fn(() => Promise.resolve()) as jest.Mock<any, any>, // tslint:disable-line no-any
	getModuleContextFn = jest.fn(() => undefined) as jest.Mock<any, any>, // tslint:disable-line no-any
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
					{ module: {
						data: {},
					}},

					{
						module: {
							data: {
								routePrefix: 'module-route-prefix',
							},
							uuid: 'module-uuid',
						},
					},
				],
			},
		]),
		on: (event, callback) => callback(),
	} as unknown as TenantsConfig;
};
