# slush-angular-sfdc-webpack 

[![npm version](https://badge.fury.io/js/slush-angular-sfdc-webpack.svg)](https://badge.fury.io/js/slush-angular-sfdc-webpack) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)]()

[![NPM](https://nodei.co/npm/slush-angular-sfdc-webpack.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/slush-angular-sfdc-webpack/)


This is the slush generator for AngularJS (ES6) Apps created in Webpack way and hosted on Salesforce.com


## Getting Started

Install `slush` and `slush-angular-sfdc-webpack` globally:

```bash
$ npm install -g slush slush-angular-sfdc-webpack
```

### Usage

Navigate to your project folder and scaffold AngularJS apps structure

```bash
$ cd my-sfdc-project
$ slush angular-sfdc-webpack:package
```

While creating a package you can enter Salesforce credentials to your project or you need to provide it after package scaffolding. To do that, open `my-sfdc-project/package/config/jsforce.config.js` file and edit it with valid username, password and security token.

Then go to apps folder and create a new application, it will create a Visualforce page with corresponding StaticResource where the application files are stores

```bash
$ cd package/apps
$ slush angular-sfdc-webpack:app
```

>The task for a new application is default, you can run it in the next way -  `$ slush angular-sfdc-webpack`

The generator has different tasks:
- `package`: create a folders structure for AngularJS apps
- `app`: scaffold a new AngularJS application. Run this task from `apps` folder of the package
- `component`: create a folder structure for a component
- `service`: create a new service

## Getting To Know Slush

Slush is a tool that uses Gulp for project scaffolding.

Slush does not contain anything "out of the box", except the ability to locate installed slush generators and to run them with liftoff.

To find out more about Slush, check out the [documentation](https://github.com/slushjs/slush).

## Contributing

See the [CONTRIBUTING Guidelines](https://github.com/henko-okdev/slush-angular-sfdc-webpack/blob/master/CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/henko-okdev/slush-angular-sfdc-webpack/issues).

## License 

The MIT License

Copyright (c) 2017, Ruslan Kurchenko

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

