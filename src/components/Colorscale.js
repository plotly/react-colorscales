import React, {Component} from 'react';
import {DEFAULT_SCALE, DEFAULT_SWATCH_WIDTH} from './constants.js';

export default class Colorscale extends Component {
  render() {
    const scale = this.props.colorscale || DEFAULT_SCALE;
    let swatchWidth = DEFAULT_SWATCH_WIDTH;

    if (this.props.width) {
      swatchWidth = this.props.width / scale.length;
    }

    if (this.props.maxWidth) {
      if (swatchWidth * scale.length > this.props.maxWidth) {
        swatchWidth = this.props.maxWidth / scale.length;
      }
    }

    const scaleWidth = this.props.scaleLength
      ? swatchWidth * this.props.scaleLength + 'px'
      : swatchWidth * scale.length + 'px';

    return (
      <div style={{width: '100%'}}>
        {this.props.label ? (
          <div
            style={{
              fontWeight: 600,
              fontSize: '12px',
              color: '#2a3f5f',
              display: 'inline-block',
              width: '70px',
              textAlign: 'start',
            }}
          >
            {this.props.label}
          </div>
        ) : null}
        <div
          style={{
            display: 'inline-block',
            textAlign: 'start',
            width: scaleWidth,
          }}
        >
          <div
            className="colorscale-block"
            style={{
              fontSize: '0px',
              display: 'inline-block',
            }}
            onClick={() =>
              this.props.onClick(scale, this.props.start, this.props.rot)
            }
          >
            {scale.map((x, i) => (
              <div
                key={i}
                className="colorscale-swatch"
                style={{
                  backgroundColor: x,
                  width: '20px',
                  height: '20px',
                  margin: '0 auto',
                  display: 'inline-block',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
