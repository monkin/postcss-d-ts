# [postcss-d-ts](https://github.com/askirmas/postcss-d-ts) [<img src="https://raw.githubusercontent.com/askirmas/postcss-d-ts/master/images/postcss-d-ts.svg" alt="logo" height="51px" align="right" />](https://github.com/askirmas/postcss-d-ts)

[PostCSS] plugin to generate [`.d.ts`](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)  of all used CSS classes and ids in imported stylesheets

[![build@ci](https://github.com/askirmas/postcss-d-ts/workflows/build/badge.svg)](https://github.com/askirmas/postcss-d-ts/actions) [![codecov](https://codecov.io/gh/askirmas/postcss-d-ts/branch/master/graph/badge.svg?token=TFJ9TMJ3YJ)](https://codecov.io/gh/askirmas/postcss-d-ts) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=askirmas_postcss-d-ts&metric=alert_status)](https://sonarcloud.io/dashboard?id=askirmas_postcss-d-ts) [![Maintainability](https://api.codeclimate.com/v1/badges/f6a1ef03e39733e2827c/maintainability)](https://codeclimate.com/github/askirmas/postcss-d-ts/maintainability) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/askirmas/postcss-d-ts/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/askirmas/postcss-d-ts/?branch=master) [![DeepScan grade](https://deepscan.io/api/teams/13158/projects/16299/branches/346523/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=13158&pid=16299&bid=346523) [![CodeFactor](https://www.codefactor.io/repository/github/askirmas/postcss-d-ts/badge)](https://www.codefactor.io/repository/github/askirmas/postcss-d-ts)

[![dependencies Status](https://status.david-dm.org/gh/askirmas/postcss-d-ts.svg)](https://david-dm.org/askirmas/postcss-d-ts) [![version](https://img.shields.io/npm/v/postcss-d-ts)](https://www.npmjs.com/package/postcss-d-ts) [![license](https://img.shields.io/npm/l/postcss-d-ts)](https://github.com/askirmas/postcss-d-ts/blob/master/LICENSE)


<p align="center"><a href="https://github.com/askirmas/postcss-d-ts/blob/master/images/postcss-d-ts.gif"><img src="https://raw.githubusercontent.com/askirmas/postcss-d-ts/master/images/postcss-d-ts.gif" width="50%;" align=/></a></p>

## Installation

```bash
npm install postcss-d-ts
```

## Goal

Provide [contract](https://en.wikipedia.org/wiki/Design_by_contract) between JS and CSS.

## Compatibility

For PostCss v8 use  [`"postcss-d-ts"`](https://github.com/askirmas/postcss-d-ts/blob/master/__recipes__/next_10/postcss.config.js#L12), for v7 [`"postcss-d-ts/dist/7"`](https://github.com/askirmas/postcss-d-ts/blob/master/__recipes__/next_9/postcss.config.json)

## Demonstration

**If you’re not familiar with PostCss – start with [#PostCss Usage](#postcss-usage)**

CSS content:

```css
.class1 { ... }
.class2 { ... }
```

Generated declaration from template (i.e. default [./src/\_css-template.d.ts](https://github.com/askirmas/postcss-d-ts/blob/master/src/_css-template.d.ts)):

```typescript
export type CssIdentifiersMap = {
  "class1": string|undefined
  "class2": string|undefined
}

declare const identifiersMap: CssIdentifiersMap

export default identifiersMap
```

Thus, in Component (i.e. React):

```tsx
import moduleClasses from "./some.module.css"

const {
  class1,
  class2,
  //@ts-expect-error - we have only .class1 and .class2
  class3
} = moduleClasses

export default function Component() {
    return <div className={`${class1} ${class2}`}/>
}
```

or

```tsx
// No CSS-modules at all
import type { CssIdentifiersMap } from "./some.css"

const {
  class1,
  class2,
  //@ts-expect-error - we have only .class1 and .class2
  class3
} = {} as CssIdentifiersMap

export default function Component() {
    return <div className={classNames({class1, class2})}/>
}

// Better to use `react-classnaming` https://www.npmjs.com/package/react-classnaming
// not this function
function classNames(classes: Record<string, string|undefined>) {
  return Object.keys(classes).join(" ")
}
```

## With CSS libraries

In [./\_\_typing\_\_/](https://github.com/askirmas/postcss-d-ts/blob/master/__typing__/) results of applying to some popular libraries: [bootstrap v3](https://github.com/askirmas/postcss-d-ts/blob/master/__typing__/bootstrap3.SHOULD.d.ts), [bootstrap v4](https://github.com/askirmas/postcss-d-ts/blob/master/__typing__/bootstrap4.SHOULD.d.ts), [material v10](https://github.com/askirmas/postcss-d-ts/blob/master/__typing__/material10.SHOULD.d.ts), [tailwind v2](https://github.com/askirmas/postcss-d-ts/blob/master/__typing__/tailwind2.SHOULD.d.ts).

## Basic options

### `template: string`

Local path to a custom template for declarations generating.

- Default: *[./src/\_css-template.d.ts](https://github.com/askirmas/postcss-d-ts/blob/master/src/_css-template.d.ts)*

```typescript
export type CssIdentifiersMap = {
  "__identifier__": string|undefined
}

declare const identifiersMap: CssIdentifiersMap

export default identifiersMap
```

- Example: *[./\_\_func\_\_/template--custom\_path/template.d.ts](https://github.com/askirmas/postcss-d-ts/blob/master/__func__/template--custom_path/)*

```typescript
import type { CSSProperties } from "react";
interface Styled {
  __identifier__: Record<string, CSSProperties>;
}
declare const styled: Styled;
export default styled;
export declare const __identifier__: CSSProperties;
```

### `identifierKeyword: string`
The word in `d.ts` template to be replaced with CSS classes, ids, etc.

```diff
// postcss.config.js
module.exports = {
  plugins: {
    "postcss-d-ts", {
+     identifierKeyword: "data"
    }
  }
}
```

```diff
// _css-template.d.ts
export type CssIdentifiersMap = {
-  "__identifier__": string|undefined
+  "data": string|undefined
}
```

### Other options

Full list in different formats

- JSON schema [./\_\_recipes\_\_/next\_9/postcss.config.json](https://github.com/askirmas/postcss-d-ts/blob/299955b1335037b759dd2a0960db9df2816bd326/__recipes__/next_9/postcss.config.json):
  - https://askirmas.github.io/postcss-d-ts/schema.json
  - *<u>./node_modules/postcss-d-ts/dist/schema.json</u>*

- TypeScript

```typescript
import { Options } from "postcss-d-ts/dist/options.types"
```

- JSDoc [./\_\_recipes\_\_/next\_10/postcss.config.js](https://github.com/askirmas/postcss-d-ts/blob/master/__recipes__/next_10/postcss.config.js)

```javascript
/** @type {{
 *  plugins: Array<
*    ["postcss-d-ts", import("postcss-d-ts/dist/options.types").Options]
 *  >
 * }}
 */
module.exports = {
  plugins: [
    ["postcss-d-ts", {}]
  ]
}
```

## Additional examples

*TBD Clone from specs*

- *https://github.com/askirmas/postcss-d-ts/blob/master/__spec__/next_10/pages/index.tsx*
- *https://github.com/askirmas/postcss-d-ts/blob/master/__func__/basic.SHOULD.d.ts*

## PostCss Usage

[PostCSS]: https://github.com/postcss/postcss

Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you already use PostCSS, add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
    require('autoprefixer'),
+   require('postcss-d-ts'),
  ]
}
```

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

[official docs]: https://github.com/postcss/postcss#usage
