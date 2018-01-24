# React colorscales 🌈

A React UI component for picking and modifying colorscales, based on [Chroma-js](https://gka.github.io/chroma.js/).

Part of Plotly's [React Component Suite](https://plot.ly/products/react/) for building data visualization Web apps and products.

## Demo

👉 [DEMO](http://react-colorscales.getforge.io/)

👉 [Demo source code](https://github.com/plotly/react-colorscales-demo-app)

👉 [Wrapper for Dash apps (Python)](https://github.com/plotly/dash-colorscales/blob/master/README.md)


## Install

`npm install react-colorscales`

`yarn add react-colorscales`


## 🚗 Quick Start

```js
import {Colorscale} from 'react-colorscales';
import ColorscalePicker from 'react-colorscales';

const viridisColorscale = ['#fafa6e', '#9cdf7c', '#4abd8c', '#00968e', '#106e7c', '#2a4858'];

// Show a single colorscale

<Colorscale
    colorscale={viridisColorscale}
    onClick={() => {}}
    width={150}
/>

// Show the colorscale picker with a default colorscale

<ColorscalePicker 
    onChange={this.onChange}
    colorscale={viridisColorscale}
/>
```

## API

### Colorscale component

`<Colorscale />` generates a single color scale palette:

| `prop`         | Description                                                                                | 
| -------------- | ------------------------------------------------------------------------------------------ |
| `onClick`      | Function to be called when colorscale is clicked.                                          |
| `colorscale`   | Colorscale as an array of color strings (HEX or RGB). See Quick Start above.               |
| `width`        | Optional: Width of an individual color swatch. Defaults to 20px.                           |
| `maxWidth`     | Optional: Maximum width of colorscale palette. If set, `maxWidth` overrides swatch `width`. |
| `label`        | Optional: Label positioned on the left side of color scale palette                         |


### ColorscalePicker component

`<ColorscalePicker />` generates a UI panel for selecting a color scale palette:

| `prop`         | Description                                                                                | 
| -------------- | ------------------------------------------------------------------------------------------ |
| `onChange`     | Passes back a new color scale when a scale is chosen or modified.                          |
| `colorscale`   | Default colorscale as an array of color strings (HEX or RGB). See Quick Start above.       |
| `nSwatches`    | Optional: Number of discrete colors or "swatches" in the default color scale.              |
| `fixSwatches`  | Optional: If set to `true`, hides the swatches slider and fixes swatches to `nSwatches.    |

See the [demo app source code](https://github.com/plotly/react-colorscales-demo-app/blob/master/src/App.js) for an example of importing and using these components.


## Features

- Preloaded with ColorBrewer, cmocean, and cube helix color scales
- Log color scales
- Set custom scale breakpoints
- Set the number of discrete colors ("swatches") in a color scale


## Screenshots

![react-colorscales-screenshot](https://github.com/plotly/react-colorscale-picker/raw/master/screenshot.png)


## Credit

- Cynthia Brewer's [ColorBrewer](http://colorbrewer2.org/) colorscales
- Kristen Thyng's [cmocean](http://matplotlib.org/cmocean/) color scales
- Dave Green's [cube helix](https://www.mrao.cam.ac.uk/~dag/CUBEHELIX/) color scales
- Gregor Aisch's [chroma-js](https://github.com/gka/chroma.js/) for easy access to the aforementioned color scales in JavaScript.
