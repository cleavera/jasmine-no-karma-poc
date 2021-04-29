import Jasmine = require('jasmine');

const jasmine = new Jasmine({});

jasmine.loadConfig({
    spec_dir: './',
    spec_files: [
        './**/*.[sS]pec.js'
    ],
});

jasmine.seed(1337);

jasmine.execute();