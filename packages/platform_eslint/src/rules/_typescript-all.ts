export default {
  /** -------- 开启的 eslint 规则 ---------**/

  // enforces return statements in callbacks of array's methods
  // https://eslint.org/docs/rules/array-callback-return
  "array-callback-return": ["error", { allowImplicit: true }],

  // treat var statements as if they were block scoped
  "block-scoped-var": "error",

  // enforce that class methods use "this"
  // https://eslint.org/docs/rules/class-methods-use-this
  "class-methods-use-this": [
    "error",
    {
      exceptMethods: [],
    },
  ],

  // require return statements to either always or never specify values
  "consistent-return": "error",

  // specify curly brace conventions for all control statements
  curly: ["error", "multi-line"], // multiline

  // require default case in switch statements
  "default-case": ["error", { commentPattern: "^no default$" }],

  // enforces consistent newlines before or after dots
  // https://eslint.org/docs/rules/dot-location
  "dot-location": ["error", "property"],

  // require the use of === and !==
  // https://eslint.org/docs/rules/eqeqeq
  eqeqeq: ["error", "always", { null: "ignore" }],

  // make sure for-in loops have an if statement
  "guard-for-in": "error",

  // enforce a maximum number of classes per file
  // https://eslint.org/docs/rules/max-classes-per-file
  "max-classes-per-file": ["error", 1],

  // disallow the use of alert, confirm, and prompt
  "no-alert": "warn",

  // disallow use of arguments.caller or arguments.callee
  "no-caller": "error",

  // disallow lexical declarations in case/default clauses
  // https://eslint.org/docs/rules/no-case-declarations.html
  "no-case-declarations": "error",

  // disallow else after a return in an if
  // https://eslint.org/docs/rules/no-else-return
  "no-else-return": ["error", { allowElseIf: false }],

  // disallow empty destructuring patterns
  // https://eslint.org/docs/rules/no-empty-pattern
  "no-empty-pattern": "error",

  // disallow use of eval()
  "no-eval": "error",

  // disallow adding to native types
  "no-extend-native": "error",

  // disallow unnecessary function binding
  "no-extra-bind": "error",

  // disallow Unnecessary Labels
  // https://eslint.org/docs/rules/no-extra-label
  "no-extra-label": "error",

  // disallow fallthrough of case statements
  "no-fallthrough": "error",

  // disallow the use of leading or trailing decimal points in numeric literals
  "no-floating-decimal": "error",

  // disallow reassignments of native objects or read-only globals
  // https://eslint.org/docs/rules/no-global-assign
  "no-global-assign": ["error", { exceptions: [] }],

  // disallow usage of __iterator__ property
  "no-iterator": "error",

  // disallow use of labels for anything other then loops and switches
  "no-labels": ["error", { allowLoop: false, allowSwitch: false }],

  // disallow unnecessary nested blocks
  "no-lone-blocks": "error",

  // disallow use of multiple spaces
  "no-multi-spaces": [
    "error",
    {
      ignoreEOLComments: false,
    },
  ],

  // disallow use of multiline strings
  "no-multi-str": "error",

  // disallow use of new operator when not part of the assignment or comparison
  "no-new": "error",

  // disallows creating new instances of String, Number, and Boolean
  "no-new-wrappers": "error",

  // disallow use of (old style) octal literals
  "no-octal": "error",

  // disallow use of octal escape sequences in string literals, such as
  // var foo = 'Copyright \251';
  "no-octal-escape": "error",

  // disallow reassignment of function parameters
  // disallow parameter object manipulation except for specific exclusions
  // rule: https://eslint.org/docs/rules/no-param-reassign.html
  "no-param-reassign": [
    "error",
    {
      props: true,
      ignorePropertyModificationsFor: [
        "acc", // for reduce accumulators
        "accumulator", // for reduce accumulators
        "e", // for e.returnvalue
        "ctx", // for Koa routing
        "context", // for Koa routing
        "req", // for Express requests
        "request", // for Express requests
        "res", // for Express responses
        "response", // for Express responses
        "$scope", // for Angular 1 scopes
        "staticContext", // for ReactRouter context
      ],
    },
  ],

  // disallow usage of __proto__ property
  "no-proto": "error",

  // disallow certain object properties
  // https://eslint.org/docs/rules/no-restricted-properties
  "no-restricted-properties": [
    "error",
    {
      object: "arguments",
      property: "callee",
      message: "arguments.callee is deprecated",
    },
    {
      object: "global",
      property: "isFinite",
      message: "Please use Number.isFinite instead",
    },
    {
      object: "self",
      property: "isFinite",
      message: "Please use Number.isFinite instead",
    },
    {
      object: "window",
      property: "isFinite",
      message: "Please use Number.isFinite instead",
    },
    {
      object: "global",
      property: "isNaN",
      message: "Please use Number.isNaN instead",
    },
    {
      object: "self",
      property: "isNaN",
      message: "Please use Number.isNaN instead",
    },
    {
      object: "window",
      property: "isNaN",
      message: "Please use Number.isNaN instead",
    },
    {
      property: "__defineGetter__",
      message: "Please use Object.defineProperty instead.",
    },
    {
      property: "__defineSetter__",
      message: "Please use Object.defineProperty instead.",
    },
    {
      object: "Math",
      property: "pow",
      message: "Use the exponentiation operator (**) instead.",
    },
  ],

  // disallow use of assignment in return statement
  "no-return-assign": ["error", "always"],

  // disallow use of `javascript:` urls.
  "no-script-url": "error",

  // disallow self assignment
  // https://eslint.org/docs/rules/no-self-assign
  "no-self-assign": [
    "error",
    {
      props: true,
    },
  ],

  // disallow comparisons where both sides are exactly the same
  "no-self-compare": "error",

  // disallow use of comma operator
  "no-sequences": "error",

  // disallow unused labels
  // https://eslint.org/docs/rules/no-unused-labels
  "no-unused-labels": "error",

  // Disallow unnecessary catch clauses
  // https://eslint.org/docs/rules/no-useless-catch
  "no-useless-catch": "error",

  // disallow useless string concatenation
  // https://eslint.org/docs/rules/no-useless-concat
  "no-useless-concat": "error",

  // disallow unnecessary string escaping
  // https://eslint.org/docs/rules/no-useless-escape
  "no-useless-escape": "error",

  // disallow redundant return; keywords
  // https://eslint.org/docs/rules/no-useless-return
  "no-useless-return": "error",

  // disallow use of void operator
  // https://eslint.org/docs/rules/no-void
  "no-void": "error",

  // disallow use of the with statement
  "no-with": "error",

  // require using Error objects as Promise rejection reasons
  // https://eslint.org/docs/rules/prefer-promise-reject-errors
  "prefer-promise-reject-errors": ["error", { allowEmptyReject: true }],

  // require use of the second argument for parseInt()
  radix: "error",

  // requires to declare all vars on top of their containing scope
  "vars-on-top": "error",

  // require immediate function invocation to be wrapped in parentheses
  // https://eslint.org/docs/rules/wrap-iife.html
  "wrap-iife": ["error", "outside", { functionPrototypeMethods: false }],

  // require or disallow Yoda conditions
  yoda: "error",

  // Enforce “for” loop update clause moving the counter in the right direction
  // https://eslint.org/docs/rules/for-direction
  "for-direction": "error",

  // Enforces that a return statement is present in property getters
  // https://eslint.org/docs/rules/getter-return
  "getter-return": ["error", { allowImplicit: true }],

  // disallow using an async function as a Promise executor
  // https://eslint.org/docs/rules/no-async-promise-executor
  "no-async-promise-executor": "error",

  // Disallow await inside of loops
  // https://eslint.org/docs/rules/no-await-in-loop
  "no-await-in-loop": "error",

  // Disallow comparisons to negative zero
  // https://eslint.org/docs/rules/no-compare-neg-zero
  "no-compare-neg-zero": "error",

  // disallow assignment in conditional expressions
  "no-cond-assign": ["error", "always"],

  // disallow use of console
  "no-console": "warn",

  // disallow use of constant expressions in conditions
  "no-constant-condition": "warn",

  // disallow control characters in regular expressions
  "no-control-regex": "error",

  // disallow use of debugger
  "no-debugger": "error",

  // disallow duplicate arguments in functions
  "no-dupe-args": "error",

  // disallow duplicate keys when creating object literals
  "no-dupe-keys": "error",

  // disallow a duplicate case label.
  "no-duplicate-case": "error",

  // disallow empty statements
  "no-empty": "error",

  // disallow the use of empty character classes in regular expressions
  "no-empty-character-class": "error",

  // disallow assigning to the exception in a catch block
  "no-ex-assign": "error",

  // disallow double-negation boolean casts in a boolean context
  // https://eslint.org/docs/rules/no-extra-boolean-cast
  "no-extra-boolean-cast": "error",

  // disallow overwriting functions written as function declarations
  "no-func-assign": "error",

  // disallow function or variable declarations in nested blocks
  "no-inner-declarations": "error",

  // disallow invalid regular expression strings in the RegExp constructor
  "no-invalid-regexp": "error",

  // disallow irregular whitespace outside of strings and comments
  "no-irregular-whitespace": "error",

  // Disallow characters which are made with multiple code points in character class syntax
  // https://eslint.org/docs/rules/no-misleading-character-class
  "no-misleading-character-class": "error",

  // disallow the use of object properties of the global object (Math and JSON) as functions
  "no-obj-calls": "error",

  // disallow use of Object.prototypes builtins directly
  // https://eslint.org/docs/rules/no-prototype-builtins
  "no-prototype-builtins": "error",

  // disallow multiple spaces in a regular expression literal
  "no-regex-spaces": "error",

  // disallow sparse arrays
  "no-sparse-arrays": "error",

  // Disallow template literal placeholder syntax in regular strings
  // https://eslint.org/docs/rules/no-template-curly-in-string
  "no-template-curly-in-string": "error",

  // Avoid code that looks like two expressions but is actually one
  // https://eslint.org/docs/rules/no-unexpected-multiline
  "no-unexpected-multiline": "error",

  // disallow unreachable statements after a return, throw, continue, or break statement
  "no-unreachable": "error",

  // disallow return/throw/break/continue inside finally blocks
  // https://eslint.org/docs/rules/no-unsafe-finally
  "no-unsafe-finally": "error",

  // disallow negating the left operand of relational operators
  // https://eslint.org/docs/rules/no-unsafe-negation
  "no-unsafe-negation": "error",

  // disallow comparisons with the value NaN
  "use-isnan": "error",

  // ensure that the results of typeof are compared against a valid string
  // https://eslint.org/docs/rules/valid-typeof
  "valid-typeof": ["error", { requireStringLiterals: true }],

  // enforces no braces where they can be omitted
  // https://eslint.org/docs/rules/arrow-body-style
  // TODO: enable requireReturnForObjectLiteral?
  "arrow-body-style": [
    "error",
    "as-needed",
    {
      requireReturnForObjectLiteral: false,
    },
  ],

  // require parens in arrow function arguments
  // https://eslint.org/docs/rules/arrow-parens
  "arrow-parens": ["error", "always"],

  // require space before/after arrow function's arrow
  // https://eslint.org/docs/rules/arrow-spacing
  "arrow-spacing": ["error", { before: true, after: true }],

  // verify super() callings in constructors
  "constructor-super": "error",

  // enforce the spacing around the * in generator functions
  // https://eslint.org/docs/rules/generator-star-spacing
  "generator-star-spacing": ["error", { before: false, after: true }],

  // disallow modifying variables of class declarations
  // https://eslint.org/docs/rules/no-class-assign
  "no-class-assign": "error",

  // disallow arrow functions where they could be confused with comparisons
  // https://eslint.org/docs/rules/no-confusing-arrow
  "no-confusing-arrow": [
    "error",
    {
      allowParens: true,
    },
  ],

  // disallow modifying variables that are declared using const
  "no-const-assign": "error",

  // disallow symbol constructor
  // https://eslint.org/docs/rules/no-new-symbol
  "no-new-symbol": "error",

  // disallow to use this/super before super() calling in constructors.
  // https://eslint.org/docs/rules/no-this-before-super
  "no-this-before-super": "error",

  // disallow useless computed property keys
  // https://eslint.org/docs/rules/no-useless-computed-key
  "no-useless-computed-key": "error",

  // disallow renaming import, export, and destructured assignments to the same name
  // https://eslint.org/docs/rules/no-useless-rename
  "no-useless-rename": [
    "error",
    {
      ignoreDestructuring: false,
      ignoreImport: false,
      ignoreExport: false,
    },
  ],

  // require let or const instead of var
  "no-var": "error",

  // require method and property shorthand syntax for object literals
  // https://eslint.org/docs/rules/object-shorthand
  "object-shorthand": [
    "error",
    "always",
    {
      ignoreConstructors: false,
      avoidQuotes: true,
    },
  ],

  // suggest using arrow functions as callbacks
  "prefer-arrow-callback": [
    "error",
    {
      allowNamedFunctions: false,
      allowUnboundThis: true,
    },
  ],

  // suggest using of const declaration for variables that are never modified after declared
  "prefer-const": [
    "error",
    {
      destructuring: "any",
      ignoreReadBeforeAssign: true,
    },
  ],

  // Prefer destructuring from arrays and objects
  // https://eslint.org/docs/rules/prefer-destructuring
  "prefer-destructuring": [
    "error",
    {
      VariableDeclarator: {
        array: false,
        object: true,
      },
      AssignmentExpression: {
        array: true,
        object: false,
      },
    },
    {
      enforceForRenamedProperties: false,
    },
  ],

  // disallow parseInt() in favor of binary, octal, and hexadecimal literals
  // https://eslint.org/docs/rules/prefer-numeric-literals
  "prefer-numeric-literals": "error",

  // use rest parameters instead of arguments
  // https://eslint.org/docs/rules/prefer-rest-params
  "prefer-rest-params": "error",

  // suggest using the spread operator instead of .apply()
  // https://eslint.org/docs/rules/prefer-spread
  "prefer-spread": "error",

  // suggest using template literals instead of string concatenation
  // https://eslint.org/docs/rules/prefer-template
  "prefer-template": "error",

  // disallow generator functions that do not have yield
  // https://eslint.org/docs/rules/require-yield
  "require-yield": "error",

  // enforce spacing between object rest-spread
  // https://eslint.org/docs/rules/rest-spread-spacing
  "rest-spread-spacing": ["error", "never"],

  // require a Symbol description
  // https://eslint.org/docs/rules/symbol-description
  "symbol-description": "error",

  // enforce usage of spacing in template strings
  // https://eslint.org/docs/rules/template-curly-spacing
  "template-curly-spacing": "error",

  // enforce spacing around the * in yield* expressions
  // https://eslint.org/docs/rules/yield-star-spacing
  "yield-star-spacing": ["error", "after"],

  // enforce spacing inside array brackets
  "array-bracket-spacing": ["error", "never"],

  // enforce spacing inside single-line blocks
  // https://eslint.org/docs/rules/block-spacing
  "block-spacing": ["error", "always"],

  // enforce one true comma style
  "comma-style": [
    "error",
    "last",
    {
      exceptions: {
        ArrayExpression: false,
        ArrayPattern: false,
        ArrowFunctionExpression: false,
        CallExpression: false,
        FunctionDeclaration: false,
        FunctionExpression: false,
        ImportDeclaration: false,
        ObjectExpression: false,
        ObjectPattern: false,
        VariableDeclaration: false,
        NewExpression: false,
      },
    },
  ],

  // disallow padding inside computed properties
  "computed-property-spacing": ["error", "never"],

  // enforce newline at the end of file, with no multiple empty lines
  "eol-last": ["error", "always"],

  // require function expressions to have a name
  // https://eslint.org/docs/rules/func-names
  "func-names": "warn",

  // enforce consistent line breaks inside function parentheses
  // https://eslint.org/docs/rules/function-paren-newline
  "function-paren-newline": ["error", "consistent"],

  // Enforce the location of arrow function bodies with implicit returns
  // https://eslint.org/docs/rules/implicit-arrow-linebreak
  "implicit-arrow-linebreak": ["error", "beside"],

  // enforces spacing between keys and values in object literal properties
  "key-spacing": ["error", { beforeColon: false, afterColon: true }],

  // disallow mixed 'LF' and 'CRLF' as linebreaks
  // https://eslint.org/docs/rules/linebreak-style
  "linebreak-style": ["error", "unix"],

  // require or disallow newlines around directives
  // https://eslint.org/docs/rules/lines-around-directive
  "lines-around-directive": [
    "error",
    {
      before: "always",
      after: "always",
    },
  ],

  // specify the maximum length of a line in your program
  // https://eslint.org/docs/rules/max-len
  "max-len": [
    "error",
    100,
    2,
    {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    },
  ],

  // require a capital letter for constructors
  "new-cap": [
    "error",
    {
      newIsCap: true,
      newIsCapExceptions: [],
      capIsNew: false,
      capIsNewExceptions: ["Immutable.Map", "Immutable.Set", "Immutable.List"],
    },
  ],

  // disallow the omission of parentheses when invoking a constructor with no arguments
  // https://eslint.org/docs/rules/new-parens
  "new-parens": "error",

  // enforces new line after each method call in the chain to make it
  // more readable and easy to maintain
  // https://eslint.org/docs/rules/newline-per-chained-call
  "newline-per-chained-call": ["error", { ignoreChainWithDepth: 4 }],

  // disallow use of bitwise operators
  // https://eslint.org/docs/rules/no-bitwise
  "no-bitwise": "error",

  // disallow use of the continue statement
  // https://eslint.org/docs/rules/no-continue
  "no-continue": "error",

  // disallow if as the only statement in an else block
  // https://eslint.org/docs/rules/no-lonely-if
  "no-lonely-if": "error",

  // disallow un-paren'd mixes of different operators
  // https://eslint.org/docs/rules/no-mixed-operators
  "no-mixed-operators": [
    "error",
    {
      // the list of arthmetic groups disallows mixing `%` and `**`
      // with other arithmetic operators.
      groups: [
        ["%", "**"],
        ["%", "+"],
        ["%", "-"],
        ["%", "*"],
        ["%", "/"],
        ["/", "*"],
        ["&", "|", "<<", ">>", ">>>"],
        ["==", "!=", "===", "!=="],
        ["&&", "||"],
      ],
      allowSamePrecedence: false,
    },
  ],

  // disallow mixed spaces and tabs for indentation
  "no-mixed-spaces-and-tabs": "error",

  // disallow use of chained assignment expressions
  // https://eslint.org/docs/rules/no-multi-assign
  "no-multi-assign": ["error"],

  // disallow multiple empty lines, only one newline at the end, and no new lines at the beginning
  // https://eslint.org/docs/rules/no-multiple-empty-lines
  "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }],

  // disallow nested ternary expressions
  "no-nested-ternary": "error",

  // disallow use of the Object constructor
  "no-new-object": "error",

  // disallow use of unary operators, ++ and --
  // https://eslint.org/docs/rules/no-plusplus
  "no-plusplus": "error",

  // disallow certain syntax forms
  // https://eslint.org/docs/rules/no-restricted-syntax
  "no-restricted-syntax": [
    "error",
    {
      selector: "ForInStatement",
      message:
        "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
    },
    {
      selector: "ForOfStatement",
      message:
        "iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.",
    },
    {
      selector: "LabeledStatement",
      message:
        "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
    },
    {
      selector: "WithStatement",
      message:
        "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
    },
  ],

  // disallow space between function identifier and application
  "no-spaced-func": "error",

  // disallow tab characters entirely
  "no-tabs": "error",

  // disallow trailing whitespace at the end of lines
  "no-trailing-spaces": [
    "error",
    {
      skipBlankLines: false,
      ignoreComments: false,
    },
  ],

  // disallow dangling underscores in identifiers
  // https://eslint.org/docs/rules/no-underscore-dangle
  "no-underscore-dangle": [
    "error",
    {
      allow: [],
      allowAfterThis: false,
      allowAfterSuper: false,
      enforceInMethodNames: true,
    },
  ],

  // disallow the use of Boolean literals in conditional expressions
  // also, prefer `a || b` over `a ? a : b`
  // https://eslint.org/docs/rules/no-unneeded-ternary
  "no-unneeded-ternary": ["error", { defaultAssignment: false }],

  // disallow whitespace before properties
  // https://eslint.org/docs/rules/no-whitespace-before-property
  "no-whitespace-before-property": "error",

  // enforce the location of single-line statements
  // https://eslint.org/docs/rules/nonblock-statement-body-position
  "nonblock-statement-body-position": ["error", "beside", { overrides: {} }],

  // enforce line breaks between braces
  // https://eslint.org/docs/rules/object-curly-newline
  "object-curly-newline": [
    "error",
    {
      ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
      ImportDeclaration: {
        minProperties: 4,
        multiline: true,
        consistent: true,
      },
      ExportDeclaration: {
        minProperties: 4,
        multiline: true,
        consistent: true,
      },
    },
  ],

  // enforce "same line" or "multiple line" on object properties.
  // https://eslint.org/docs/rules/object-property-newline
  "object-property-newline": [
    "error",
    {
      allowAllPropertiesOnSameLine: true,
    },
  ],

  // allow just one var statement per function
  "one-var": ["error", "never"],

  // require a newline around variable declaration
  // https://eslint.org/docs/rules/one-var-declaration-per-line
  "one-var-declaration-per-line": ["error", "always"],

  // require assignment operator shorthand where possible or prohibit it entirely
  // https://eslint.org/docs/rules/operator-assignment
  "operator-assignment": ["error", "always"],

  // Requires operator at the beginning of the line in multiline statements
  // https://eslint.org/docs/rules/operator-linebreak
  "operator-linebreak": ["error", "before", { overrides: { "=": "none" } }],

  // disallow padding within blocks
  "padded-blocks": [
    "error",
    {
      blocks: "never",
      classes: "never",
      switches: "never",
    },
    {
      allowSingleLineBlocks: true,
    },
  ],

  // Prefer use of an object spread over Object.assign
  // https://eslint.org/docs/rules/prefer-object-spread
  "prefer-object-spread": "error",

  // require quotes around object literal property names
  // https://eslint.org/docs/rules/quote-props.html
  "quote-props": [
    "error",
    "as-needed",
    { keywords: false, unnecessary: true, numbers: false },
  ],

  // enforce spacing before and after semicolons
  "semi-spacing": ["error", { before: false, after: true }],

  // Enforce location of semicolons
  // https://eslint.org/docs/rules/semi-style
  "semi-style": ["error", "last"],

  // require or disallow space before blocks
  "space-before-blocks": "error",

  // require or disallow spaces inside parentheses
  "space-in-parens": ["error", "never"],

  // Require or disallow spaces before/after unary operators
  // https://eslint.org/docs/rules/space-unary-ops
  "space-unary-ops": [
    "error",
    {
      words: true,
      nonwords: false,
      overrides: {},
    },
  ],

  // require or disallow a space immediately following the // or /* in a comment
  // https://eslint.org/docs/rules/spaced-comment
  "spaced-comment": [
    "error",
    "always",
    {
      line: {
        exceptions: ["-", "+"],
        markers: ["=", "!", "/"], // space here to support sprockets directives, slash for TS /// comments
      },
      block: {
        exceptions: ["-", "+"],
        markers: ["=", "!", ":", "::"], // space here to support sprockets directives and flow comment types
        balanced: true,
      },
    },
  ],

  // Enforce spacing around colons of switch statements
  // https://eslint.org/docs/rules/switch-colon-spacing
  "switch-colon-spacing": ["error", { after: true, before: false }],

  // Require or disallow spacing between template tags and their literals
  // https://eslint.org/docs/rules/template-tag-spacing
  "template-tag-spacing": ["error", "never"],

  // require or disallow the Unicode Byte Order Mark
  // https://eslint.org/docs/rules/unicode-bom
  "unicode-bom": ["error", "never"],

  // disallow deletion of variables
  "no-delete-var": "error",

  // disallow labels that share a name with a variable
  // https://eslint.org/docs/rules/no-label-var
  "no-label-var": "error",

  // disallow specific globals
  "no-restricted-globals": [
    "error",
    {
      name: "isFinite",
      message:
        "Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite",
    },
    {
      name: "isNaN",
      message:
        "Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan",
    },
  ],
  // .concat(require("confusing-browser-globals"))

  // disallow shadowing of names such as arguments
  "no-shadow-restricted-names": "error",

  // disallow use of undeclared variables unless mentioned in a /*global */ block
  "no-undef": "error",

  // disallow use of undefined when initializing variables
  "no-undef-init": "error",

  /** -------- typescript-eslint 插件的规则 ---------**/

  "@typescript-eslint/adjacent-overload-signatures": "error",
  "@typescript-eslint/ban-ts-comment": "error",
  "@typescript-eslint/ban-types": "error",
  "@typescript-eslint/explicit-module-boundary-types": "warn",
  "@typescript-eslint/no-empty-interface": "error",
  "@typescript-eslint/no-explicit-any": "warn",
  "@typescript-eslint/no-extra-non-null-assertion": "error",
  "@typescript-eslint/no-inferrable-types": "error",
  "@typescript-eslint/no-misused-new": "error",
  "@typescript-eslint/no-namespace": "error",
  "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
  "@typescript-eslint/no-non-null-assertion": "warn",
  "@typescript-eslint/no-this-alias": "error",
  "@typescript-eslint/no-var-requires": "error",
  "@typescript-eslint/prefer-as-const": "error",
  "@typescript-eslint/prefer-namespace-keyword": "error",
  "@typescript-eslint/triple-slash-reference": "error",
  "@typescript-eslint/await-thenable": "error",
  "@typescript-eslint/no-floating-promises": "error",
  "@typescript-eslint/no-for-in-array": "error",
  "@typescript-eslint/no-misused-promises": "error",
  "@typescript-eslint/no-unnecessary-type-assertion": "error",
  "@typescript-eslint/no-unsafe-assignment": "error",
  "@typescript-eslint/no-unsafe-call": "error",
  "@typescript-eslint/no-unsafe-member-access": "error",
  "@typescript-eslint/no-unsafe-return": "error",
  "@typescript-eslint/prefer-regexp-exec": "error",
  "@typescript-eslint/restrict-plus-operands": "error",
  "@typescript-eslint/restrict-template-expressions": "error",
  "@typescript-eslint/unbound-method": "error",

  /** ------ import ------- 规则 */
  // ensure imports point to files/modules that can be resolved
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
  "import/no-unresolved": ["error", { commonjs: true, caseSensitive: true }],

  // ensure named imports coupled with named exports
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md#when-not-to-use-it
  "import/named": "error",

  // ensure default import coupled with default export
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md#when-not-to-use-it
  "import/default": "off",

  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/namespace.md
  "import/namespace": "off",

  // Helpful warnings:

  // disallow invalid exports, e.g. multiple defaults
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md
  "import/export": "error",

  // do not allow a default import name to match a named export
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
  "import/no-named-as-default": "error",

  // warn on accessing default export property names that are also named exports
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md
  "import/no-named-as-default-member": "error",

  // disallow use of jsdoc-marked-deprecated imports
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-deprecated.md
  "import/no-deprecated": "off",

  // Ensure consistent use of file extension within the import path
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
  "import/extensions": [
    "error",
    "ignorePackages",
    {
      js: "never",
      mjs: "never",
      jsx: "never",
      ts: "never",
      tsx: "never",
    },
  ],

  // Append 'ts' and 'tsx' extensions to Airbnb 'import/no-extraneous-dependencies' rule
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
  "import/no-extraneous-dependencies": [
    "error",
    {
      optionalDependencies: false,
      devDependencies: [
        "test/**", // tape, common npm pattern
        "tests/**", // also common npm pattern
        "spec/**", // mocha, rspec-like pattern
        "**/__tests__/**", // jest pattern
        "**/__mocks__/**", // jest pattern
        "test.{js,jsx}", // repos with a single test file
        "test-*.{js,jsx}", // repos with multiple top-level test files
        "**/*{.,_}{test,spec}.{js,jsx}", // tests where the extension or filename suffix denotes that it is a test
        "**/jest.config.js", // jest config
        "**/jest.setup.js", // jest setup
        "**/vue.config.js", // vue-cli config
        "**/webpack.config.js", // webpack config
        "**/webpack.config.*.js", // webpack config
        "**/rollup.config.js", // rollup config
        "**/rollup.config.*.js", // rollup config
        "**/gulpfile.js", // gulp config
        "**/gulpfile.*.js", // gulp config
        "**/Gruntfile{,.js}", // grunt config
        "**/protractor.conf.js", // protractor config
        "**/protractor.conf.*.js", // protractor config
        "**/karma.conf.js", // karma config
      ].reduce((result, devDep) => {
        const toAppend = [devDep];
        const devDepWithTs = devDep.replace(/\bjs(x?)\b/g, "ts$1");
        if (devDepWithTs !== devDep) {
          toAppend.push(devDepWithTs);
        }
        return [...result, ...toAppend];
      }, []),
    },
  ],

  // Forbid mutable exports
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md
  "import/no-mutable-exports": "error",

  // Module systems:
  // disallow AMD require/define
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-amd.md
  "import/no-amd": "error",

  // Style guide:
  // disallow non-import statements appearing before import statements
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
  "import/first": "error",

  // disallow duplicate imports
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
  "import/no-duplicates": "error",

  // ensure absolute imports are above relative imports and that unassigned imports are ignored
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
  // TODO: enforce a stricter convention in module import order?
  "import/order": ["error", { groups: [["builtin", "external", "internal"]] }],

  // Require a newline after the last import/require in a group
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
  "import/newline-after-import": "error",

  // Require modules with a single export to use a default export
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
  "import/prefer-default-export": "error",

  // Forbid import of modules using absolute paths
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md
  "import/no-absolute-path": "error",

  // Forbid require() calls with expressions
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md
  "import/no-dynamic-require": "error",

  // Forbid Webpack loader syntax in imports
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md
  "import/no-webpack-loader-syntax": "error",

  // Prevent importing the default as if it were named
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-default.md
  "import/no-named-default": "error",

  // Forbid a module from importing itself
  // https://github.com/benmosher/eslint-plugin-import/blob/44a038c06487964394b1e15b64f3bd34e5d40cde/docs/rules/no-self-import.md
  "import/no-self-import": "error",

  // Forbid cyclical dependencies between modules
  // https://github.com/benmosher/eslint-plugin-import/blob/d81f48a2506182738409805f5272eff4d77c9348/docs/rules/no-cycle.md
  "import/no-cycle": ["error", { maxDepth: "∞" }],

  // Ensures that there are no useless path segments
  // https://github.com/benmosher/eslint-plugin-import/blob/ebafcbf59ec9f653b2ac2a0156ca3bcba0a7cf57/docs/rules/no-useless-path-segments.md
  "import/no-useless-path-segments": ["error", { commonjs: true }],

  /** ---- node 规则 ---------- */

  // require all requires be top-level
  // https://eslint.org/docs/rules/global-require
  "global-require": "error",

  // disallow use of the Buffer() constructor
  // https://eslint.org/docs/rules/no-buffer-constructor
  "no-buffer-constructor": "error",

  // disallow use of new operator with the require function
  "no-new-require": "error",

  // disallow string concatenation with __dirname and __filename
  // https://eslint.org/docs/rules/no-path-concat
  "no-path-concat": "error",

  /** ---------- airbnb-typescript ----------  */

  // Replace Airbnb 'brace-style' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
  "brace-style": "off",
  "@typescript-eslint/brace-style": [
    "error",
    "1tbs",
    { allowSingleLine: true },
  ], // enforce one true brace style

  // Replace Airbnb 'camelcase' rule with '@typescript-eslint/naming-convention'
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
  camelcase: "off",
  // The `@typescript-eslint/naming-convention` rule allows `leadingUnderscore` and `trailingUnderscore` settings. However, the existing `no-underscore-dangle` rule already takes care of this.
  "@typescript-eslint/naming-convention": [
    "error",
    // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables (23.10)
    {
      selector: "variable",
      format: ["camelCase", "PascalCase", "UPPER_CASE"],
    },
    // Allow camelCase functions (23.2), and PascalCase functions (23.8)
    {
      selector: "function",
      format: ["camelCase", "PascalCase"],
    },
    // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
    {
      selector: "typeLike",
      format: ["PascalCase"],
    },
  ],

  // Replace Airbnb 'comma-dangle' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-dangle.md
  // The TypeScript version also adds 3 new options, all of which should be set to the same value as the base config
  "comma-dangle": "off",
  "@typescript-eslint/comma-dangle": [
    "error",
    {
      arrays: "always-multiline",
      objects: "always-multiline",
      imports: "always-multiline",
      exports: "always-multiline",
      functions: "always-multiline",
      enums: "always-multiline",
      generics: "always-multiline",
      tuples: "always-multiline",
    },
  ],

  // Replace Airbnb 'comma-spacing' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
  "comma-spacing": "off",
  "@typescript-eslint/comma-spacing": ["error", { before: false, after: true }],

  // Replace Airbnb 'dot-notation' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
  "dot-notation": "off",
  "@typescript-eslint/dot-notation": ["error", { allowKeywords: true }],

  // Replace Airbnb 'func-call-spacing' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
  "func-call-spacing": "off",
  "@typescript-eslint/func-call-spacing": ["error", "never"],

  // Replace Airbnb 'indent' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
  indent: "off",
  "@typescript-eslint/indent": [
    "error",
    2,
    {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      // MemberExpression: null,
      FunctionDeclaration: {
        parameters: 1,
        body: 1,
      },
      FunctionExpression: {
        parameters: 1,
        body: 1,
      },
      CallExpression: {
        arguments: 1,
      },
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
      ignoredNodes: [
        "JSXElement",
        "JSXElement > *",
        "JSXAttribute",
        "JSXIdentifier",
        "JSXNamespacedName",
        "JSXMemberExpression",
        "JSXSpreadAttribute",
        "JSXExpressionContainer",
        "JSXOpeningElement",
        "JSXClosingElement",
        "JSXFragment",
        "JSXOpeningFragment",
        "JSXClosingFragment",
        "JSXText",
        "JSXEmptyExpression",
        "JSXSpreadChild",
      ],
      ignoreComments: false,
    },
  ],

  // Replace Airbnb 'keyword-spacing' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
  "keyword-spacing": "off",
  "@typescript-eslint/keyword-spacing": [
    "error",
    {
      before: true,
      after: true,
      overrides: {
        return: { after: true },
        throw: { after: true },
        case: { after: true },
      },
    },
  ],

  // Replace Airbnb 'lines-between-class-members' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
  "lines-between-class-members": "off",
  "@typescript-eslint/lines-between-class-members": [
    "error",
    "always",
    { exceptAfterSingleLine: false },
  ],

  // Replace Airbnb 'no-array-constructor' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
  "no-array-constructor": "off",
  "@typescript-eslint/no-array-constructor": "error",

  // Replace Airbnb 'no-dupe-class-members' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
  "no-dupe-class-members": "off",
  "@typescript-eslint/no-dupe-class-members": "error",

  // Replace Airbnb 'no-empty-function' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
  "no-empty-function": "off",
  "@typescript-eslint/no-empty-function": [
    "error",
    {
      allow: ["arrowFunctions", "functions", "methods"],
    },
  ],

  // Replace Airbnb 'no-extra-parens' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-parens.md
  "no-extra-parens": "off",
  "@typescript-eslint/no-extra-parens": [
    "off",
    "all",
    {
      conditionalAssign: true,
      nestedBinaryExpressions: false,
      returnAssign: false,
      ignoreJSX: "all", // delegate to eslint-plugin-react
      enforceForArrowConditionals: false,
    },
  ],

  // Replace Airbnb 'no-extra-semi' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
  "no-extra-semi": "off",
  "@typescript-eslint/no-extra-semi": "error",

  // Replace Airbnb 'no-implied-eval' and 'no-new-func' rules with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md
  "no-implied-eval": "off",
  "no-new-func": "off",
  "@typescript-eslint/no-implied-eval": "error",

  // Replace Airbnb 'no-loop-func' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loop-func.md
  "no-loop-func": "off",
  "@typescript-eslint/no-loop-func": "error",

  // Replace Airbnb 'no-magic-numbers' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
  "no-magic-numbers": "off",
  "@typescript-eslint/no-magic-numbers": [
    "off",
    {
      ignore: [],
      ignoreArrayIndexes: true,
      enforceConst: true,
      detectObjects: false,
    },
  ],

  // Replace Airbnb 'no-redeclare' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-redeclare.md
  "no-redeclare": "off",
  "@typescript-eslint/no-redeclare": "error",

  // Replace Airbnb 'no-shadow' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
  "no-shadow": "off",
  "@typescript-eslint/no-shadow": "error",

  // Replace Airbnb 'no-throw-literal' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
  "no-throw-literal": "off",
  "@typescript-eslint/no-throw-literal": "error",

  // Replace Airbnb 'no-unused-expressions' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
  "no-unused-expressions": "off",
  "@typescript-eslint/no-unused-expressions": [
    "error",
    {
      allowShortCircuit: false,
      allowTernary: false,
      allowTaggedTemplates: false,
    },
  ],

  // Replace Airbnb 'no-unused-vars' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": [
    "error",
    { vars: "all", args: "after-used", ignoreRestSiblings: true },
  ],

  // Replace Airbnb 'no-use-before-define' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
  "no-use-before-define": "off",
  "@typescript-eslint/no-use-before-define": [
    "error",
    { functions: true, classes: true, variables: true },
  ],

  // Replace Airbnb 'no-useless-constructor' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
  "no-useless-constructor": "off",
  "@typescript-eslint/no-useless-constructor": "error",

  // Replace Airbnb 'quotes' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
  quotes: "off",
  "@typescript-eslint/quotes": ["error", "single", { avoidEscape: true }],

  // Replace Airbnb 'semi' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
  semi: "off",
  "@typescript-eslint/semi": ["error", "always"],

  // Replace Airbnb 'space-before-function-paren' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
  "space-before-function-paren": "off",
  "@typescript-eslint/space-before-function-paren": [
    "error",
    {
      anonymous: "always",
      named: "never",
      asyncArrow: "always",
    },
  ],

  // Replace Airbnb 'no-return-await' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
  "no-return-await": "off",
  "@typescript-eslint/return-await": "error",

  // Replace Airbnb 'space-infix-ops' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-infix-ops.md
  "space-infix-ops": "off",
  "@typescript-eslint/space-infix-ops": "error",

  // Replace Airbnb 'object-curly-spacing' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/object-curly-spacing.md
  "object-curly-spacing": "off",
  "@typescript-eslint/object-curly-spacing": ["error", "always"],
};
