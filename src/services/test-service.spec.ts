import { TestService } from './test-service';

describe('My test', () => {
    let testService: TestService;

    beforeEach(() => {
        testService = new TestService();
    });

    it('should fail', () => {
        expect(testService.add(4, 2)).toBe(6);
    });

    it('should pass', () => {
        expect(testService.add(1, 2)).toBe(3);
    });
});
