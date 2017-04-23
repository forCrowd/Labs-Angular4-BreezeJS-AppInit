# Angular4 BreezeJS AppInit

Using APP_INITIALIZER together with BreezeJS & AOT combination in Angular 4

### Details

In Angular 4, when running the application with `AOT` build, that contains a code block that retrieves the metadata for BreezeJS in `APP_INITIALIZER`, it stops working with the following error message:

	TypeError: Cannot read property 'initialNavigation' of undefined
		at RouterInitializer.isLegacyDisabled

Apparently, in Angular 4, such operation needs to be done after initializing the router module. 
In order to achieve this, `appInitializer` method of `RouterInitializer` module was used, which is exported as `ɵg` (?) from `router` module.

`appInit` method was updated like the following:

	// APP_INITIALIZER
	export function appInit(breezeBridgeAngularModule: BreezeBridgeAngularModule, routerInitializer: ɵg) {
		var dataService = new DataService({ serviceName: "/odata" });
		var entityManager = new EntityManager(dataService);

		return () => routerInitializer.appInitializer().then(() => { // This is the new line
			return entityManager.fetchMetadata();
		});
	}

To make it clear, this problem doesn't happen:
* in Angular 2.4.10,
* or `systemjs` is used as a module loader,
* or `router` modules is not used in the application,
* or `fetchMetadata` method is not called within `APP_INITIALIZER`.

### Changelog

**1.0.0**

* Initial version
