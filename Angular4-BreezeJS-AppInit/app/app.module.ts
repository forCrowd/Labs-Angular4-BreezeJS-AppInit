// angular
import { APP_INITIALIZER, Component, NgModule } from "@angular/core";
import { RouterModule, Routes, ɵg } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";

// breeze
import { BreezeBridgeAngularModule } from "breeze-bridge-angular";
import { EntityManager, DataService } from "breeze-client";
import "breeze.dataService.odata";
import "breeze.modelLibrary.backingStore";
import "breeze.uriBuilder.odata";
import "datajs";

// AppComponent
@Component({
    moduleId: module.id,
    selector: "app",
    template: "<router-outlet></router-outlet>"
})
export class AppComponent { }

// HomeComponent
@Component({ moduleId: module.id, selector: "home", template: "It works :)<p>{{ metadata | json }}</p>" })
export class HomeComponent {
    metadata: {} = null;
    constructor(breezeBridgeAngularModule: BreezeBridgeAngularModule) {
        this.metadata = breezeBridgeAngularModule["metadata"];
    }
}

// APP_INITIALIZER
export function appInit(breezeBridgeAngularModule: BreezeBridgeAngularModule, routerInitializer: ɵg) {
    var dataService = new DataService({ serviceName: "/odata" });
    var entityManager = new EntityManager(dataService);

    return () => routerInitializer.appInitializer().then(() => {
        return entityManager.fetchMetadata().then((metadata: Object) => {
            console.log("metadata", metadata);
            breezeBridgeAngularModule["metadata"] = metadata; // Bit of a hack to pass the data but nah!
            return metadata;
        });
    });
}

// AppModule
@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, HomeComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: "app-systemjs.html", component: HomeComponent, },
            { path: "app-aot.html", component: HomeComponent, },
            { path: "", redirectTo: "app.html", pathMatch: "full" },
        ]),
        BreezeBridgeAngularModule
    ],
    providers: [
        {
            "provide": APP_INITIALIZER,
            "useFactory": appInit,
            "deps": [BreezeBridgeAngularModule, ɵg],
            "multi": true
        }
    ]
})
export class AppModule { }
