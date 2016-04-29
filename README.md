# should-throw-instanceof

Testing helper function allows deeper inspection of errors than `should.throw`.


Usage
-----

Give it callable code block, the type of error you expect, and any number of
additional string, regex, and function 'matchers'. Example with both a string
and a function matcher:

```js
var shouldThrowInstanceof = require('should-throw-instanceof');

it('calling undefined() throws TypeError with stack', function () {
    shouldThrowInstanceof(
        function () { undefined(); },
        TypeError,
        'undefined is not a function',
        function (err) { return 'stack' in err; }
    );
});
```

String and regex matchers will be applied to the error `message` field (strings
are checked for equality). Functions will be applied to the whole error object
(checked for truthy return value and no exception thrown).

Any other type of matcher argument is not explicitly supported, but will be
passed directly to `should.match` and checked over the whole error object.


Installation
------------

```console
npm install should-throw-instanceof
```


Contribute
----------

- Issue Tracker: github.com/bodylabs/should-throw-instanceof/issues
- Source Code: github.com/bodylabs/should-throw-instanceof

Pull requests welcome!


Support
-------

If you are having issues, please let us know.


License
-------

The project is licensed under the two-clause BSD license.
