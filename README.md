# Obi Bootstrap

Custom Bootstrap 4 theme.

## Usage
Add as a dependency in your `package.json`

```json
   "obi-bootstrap": "file:./obi-bootstrap-0.0.0.tgz"
```
Add a `dark` class to your html

```html
<!DOCTYPE html>
<html lang="en" class="dark">
.
.
.
```
### CSS 
```css
@import '~obi-bootstrap/css/obi-bootstrap.css';
```

### SCSS 

```scss
$fa-font-path: '~font-awesome/fonts';
$icon-font-path: '~open-iconic/font/fonts/';
$font-styles-path: '~obi-bootstrap/fonts';
$font-family-base: 'Open Sans', Arial, sans-serif;
@import '~obi-bootstrap/scss/obi-common';

html.dark {
  @import '~obi-bootstrap/scss/dark-variables';
  @import '~bootstrap/scss/bootstrap';
  @import '~obi-bootstrap/scss/class-overrides/index';
}

html.light {
  @import '~obi-bootstrap/scss/light-variables';
  @import '~bootstrap/scss/bootstrap';
  @import '~obi-bootstrap/scss/class-overrides/index';
}
```

## Development

Build package by running the `package` script
```js
 npm run package
 ```
