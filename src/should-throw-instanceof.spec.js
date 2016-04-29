var shouldThrowInstanceof = require('./should-throw-instanceof');

// Since shouldThrowInstanceof is itself the piece of code under tests, we do
// not test the failure cases with shouldThrowInstanceof.

describe('should-throw-instanceof', function () {

    // should does not export AssertionError, so capture it here for tests.
    var getAssertionErrorType = function () {
        var assertionError;
        try {
            '1'.should.match('2');
        } catch (e) {
            assertionError = e;
        }
        return assertionError.constructor;
    };

    var AssertionError = getAssertionErrorType();

    describe('types', function () {

        it('expected type thrown -> success', function () {
            shouldThrowInstanceof(
                function () { undefined.foo(); },
                TypeError
            );
        });

        it('supertype of expected type thrown -> success', function () {
            shouldThrowInstanceof(
                function () { undefined.foo(); },
                Error
            );
        });

        it('unexpected type thrown -> failure', function () {
            var caughtErr;

            try {
                shouldThrowInstanceof(
                    function () { throw new RangeError('out of bounds'); },
                    TypeError
                );
            } catch (e) {
                caughtErr = e;
            }

            caughtErr.should.be.instanceof(AssertionError);
        });

        it('nothing thrown -> failure', function () {
            var caughtErr;

            try {
                shouldThrowInstanceof(
                    function () { return 5; },
                    TypeError
                );
            } catch (e) {
                caughtErr = e;
            }

            caughtErr.should.be.instanceof(AssertionError);
        });
    });

    describe('matchers', function () {

        it('string, regex, function all match -> success', function () {
            // valid, but redundant to mix string and regex
            shouldThrowInstanceof(
                function () { throw new Error('there was an error'); },
                Error,
                'there was an error',
                /^there was/,
                function (err) { return err.name === 'Error'; }
            );
        });

        it('string not equal -> failure', function () {
            var caughtErr;

            try {
                shouldThrowInstanceof(
                    function () { throw new Error('there was an error'); },
                    Error,
                    'there was an er'
                );
            } catch (e) {
                caughtErr = e;
            }

            caughtErr.should.be.instanceof(AssertionError);
        });

        it('regex does not match -> failure', function () {
            var caughtErr;

            try {
                shouldThrowInstanceof(
                    function () { throw new Error('there was an error'); },
                    Error,
                    /\d/
                );
            } catch (e) {
                caughtErr = e;
            }

            caughtErr.should.be.instanceof(AssertionError);
        });

        it('function returns false -> failure', function () {
            var caughtErr;

            try {
                shouldThrowInstanceof(
                    function () { throw new Error('there was an error'); },
                    Error,
                    function (err) { return err.name.length > 10; }
                );
            } catch (e) {
                caughtErr = e;
            }

            caughtErr.should.be.instanceof(AssertionError);
        });

        it('function throws TypeError -> failure', function () {
            var caughtErr;

            try {
                shouldThrowInstanceof(
                    function () { throw new Error('there was an error'); },
                    Error,
                    function (err) { return err.foo(); }
                );
            } catch (e) {
                caughtErr = e;
            }

            // actually gets both types
            caughtErr.should.be.instanceof(AssertionError);
            caughtErr.should.be.instanceof(TypeError);
        });

        it('function throws AssertionError -> failure', function () {
            var caughtErr;

            try {
                shouldThrowInstanceof(
                    function () { throw new Error('there was an error'); },
                    Error,
                    function (err) { return err.should.match(4); }
                );
            } catch (e) {
                caughtErr = e;
            }

            // in contrast with previous test
            caughtErr.should.be.instanceof(AssertionError);
            caughtErr.should.not.be.instanceof(TypeError);
        });
    });

    describe('example test case for README', function () {

        it('calling undefined() throws TypeError with stack', function () {
            shouldThrowInstanceof(
                function () { undefined(); },
                TypeError,
                'undefined is not a function',
                function (err) { return 'stack' in err; }
            );
        });
    });

});
