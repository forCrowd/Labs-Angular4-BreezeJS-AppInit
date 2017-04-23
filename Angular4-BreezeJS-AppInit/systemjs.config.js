(function (global) {
    "use strict";

    var config = {
        map: {

            // @angular
            "@angular/core": "npm:@angular/core/bundles/core.umd.js",
            "@angular/common": "npm:@angular/common/bundles/common.umd.js",
            "@angular/compiler": "npm:@angular/compiler/bundles/compiler.umd.js",
            "@angular/http": "npm:@angular/http/bundles/http.umd.js",
            "@angular/platform-browser": "npm:@angular/platform-browser/bundles/platform-browser.umd.js",
            "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
            "@angular/router": "npm:@angular/router/bundles/router.umd.js",

            // breeze
            "breeze-client": "npm:breeze-client/breeze.base.debug.js",
            "breeze-bridge-angular": "npm:breeze-bridge-angular/index.js",
            "breeze.dataService.odata": "npm:breeze-client/breeze.dataService.odata.js",
            "breeze.modelLibrary.backingStore": "npm:breeze-client/breeze.modelLibrary.backingStore.js",
            "breeze.uriBuilder.odata": "npm:breeze-client/breeze.uriBuilder.odata.js",
            "datajs": "npm:datajs/index.js",

            // rxjs
            "rxjs": "npm:rxjs",

            // app
            "app": "app"
        },
        packages: {

            // rxjs
            "rxjs": { defaultExtension: "js" },

            // app
            "app": { main: "boot.js", defaultExtension: "js" },
        },
        paths: {
            "npm:": "node_modules/"
        }
    };

    System.config(config);

})(this);
