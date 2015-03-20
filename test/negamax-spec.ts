import expect = require('expect.js');

describe("Test Suite 1",() => {

    it("Test A", () => {
        expect(true).to.be.ok();
    });

    describe("Test Subsuite",() => {
        it("Test B",() => {
            var actual = 1
            var expected = 2
            expect(actual).to.be(expected);
        });
    });
});
