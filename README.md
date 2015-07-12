

## Kiki An internal library for Sass.

Kiki a library of common mixins, helper classes that are used in projects. It also contains grid.

## Requirements

- [Sass](https://github.com/sass/sass) 3.4+ or [LibSass](https://github.com/sass/libsass) 3.1+

## Installation

```javascript
bower install --save 
```

- Import Kiki settings file at the beginning of your styleshee:
```scss
@import 'kiki-settings';
```
- Import Kiki after import of kiki setting:

```scss
@import 'path_to_bower_components'+kiki/dist/kiki;

e.g. @import '../../bower_components/kiki/dist/kiki';
```

It’s not recommended to add or modify the Kiki files so that you can update them easily.

