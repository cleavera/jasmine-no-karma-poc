import SuiteInfo = jasmine.SuiteInfo;
import CustomReporterResult = jasmine.CustomReporterResult;
import RunDetails = jasmine.RunDetails;

function resultReporter(result: CustomReporterResult): void {
    if (!result.failedExpectations || !result.failedExpectations.length) {
        return;
    }

    console.log(`${result.description} ${result.status}`);

    for(let i = 0; i < result.failedExpectations.length; i++) {
        console.error(result.failedExpectations[i].message);
        console.error(result.failedExpectations[i].stack);
    }
}

const myReporter: jasmine.CustomReporter = {
    jasmineStarted: function(suiteInfo: SuiteInfo) {
        console.log(`Running ${suiteInfo.totalSpecsDefined} tests`);
    },

    specDone: resultReporter,

    suiteDone: resultReporter,

    jasmineDone: function(result: RunDetails) {
        for(let i = 0; i < result.failedExpectations.length; i++) {
            console.error(result.failedExpectations[i].message);
            console.error(result.failedExpectations[i].stack);
        }

        ((window ?? global) as any).__jasmineFinished = true;
    }
};

export { myReporter };
