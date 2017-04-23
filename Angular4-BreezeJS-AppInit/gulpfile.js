///<binding ProjectOpened="default" />

// Variables
var del = require("del"),
    exec = require("child_process").exec,
    gulp = require("gulp"),
    path = require("path");

// Tasks
gulp.task("default", ["build", "watch"]);

gulp.task("build", function () {
    return build();
});

gulp.task("compile-typescript", function () {
    return compileTypescript("./tsconfig.json");
});

gulp.task("watch", function () {
    gulp.watch("app/**/*.ts", ["compile-typescript"]);
});

// Functions
function build() {
    return compileAheadOfTime().then(function () {
        return bundle().then(function () {
            return compileTypescript("./tsconfig.json");
        });
    });
}

function bundle() {

    var rollup = require("rollup"),
        alias = require("rollup-plugin-alias"),
        commonjs = require("rollup-plugin-commonjs"),
        nodeResolve = require("rollup-plugin-node-resolve");

    var aliases = {                 
        "breeze-client": path.resolve(__dirname, "node_modules", "breeze-client/breeze.base.debug.js"),
        "breeze.dataService.odata": path.resolve(__dirname, "node_modules", "breeze-client/breeze.dataService.odata.js"),
        "breeze.modelLibrary.backingStore": path.resolve(__dirname, "node_modules", "breeze-client/breeze.modelLibrary.backingStore.js"),
        "breeze.uriBuilder.odata": path.resolve(__dirname, "node_modules", "breeze-client/breeze.uriBuilder.odata.js")
    };

    return rollup.rollup({
        entry: "./app/boot-aot.js",
        plugins: [
            alias(aliases),
            commonjs({
                namedExports: {
                    "node_modules/breeze-client/breeze.base.debug.js": [
                        "DataService",
                        "EntityManager"
                    ]
                }
            }),
            nodeResolve({ jsnext: true, module: true })
        ]
    })
        .then(function (bundle) {
            return bundle.write({
                format: "iife",
                moduleName: "app",
                dest: "./app/app.js"
            });
        });
}

function compileAheadOfTime() {

    return new Promise(function (resolve, reject) {

        var buildFile = "tsconfig-build-aot.json";

        return del(["aot"]).then(() => {
            return exec("node_modules\\.bin\\ngc -p " + buildFile, function (err, stdout, stderr) {

                console.log(stdout);
                console.log(stderr);

                var compileFile = "tsconfig-compile-aot.json";

                return compileTypescript("./" + compileFile)
                    .then(function () {
                        resolve();
                    });
            });
        });
    });
}

function compileTypescript(projectFile) {
    return new Promise(function (resolve, reject) {
        return exec("node_modules\\.bin\\tsc -p " + projectFile, function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            resolve();
        });
    });
}
