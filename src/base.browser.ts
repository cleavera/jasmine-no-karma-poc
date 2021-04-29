import 'jasmine-core/lib/jasmine-core/jasmine';
import 'jasmine-core/lib/jasmine-core/jasmine-html';
import 'jasmine-core/lib/jasmine-core/boot';

import { myReporter } from './custom-reporter';

const env: jasmine.Env = jasmine.getEnv();
env.clearReporters();
env.addReporter(myReporter);

import './services/test-service.spec';
