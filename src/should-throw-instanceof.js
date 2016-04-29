var should = require('should'),
    _ = require('underscore');

var shouldThrowInstanceof = function (block, type) {
    var matchers = _(arguments).values().slice(2);
    var caughtErr;

    try {
        block();
    } catch (e) {
        caughtErr = e;
    }

    should.exist(caughtErr);
    caughtErr.should.be.an.instanceof(type);

    _(matchers).each(function (matcher) {
        if (_(matcher).isString() || _(matcher).isRegExp()) {
            caughtErr.message.should.match(matcher);
        } else {
            caughtErr.should.match(matcher);
        }
    });
};

module.exports = shouldThrowInstanceof;
