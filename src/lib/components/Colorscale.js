import React, { Component } from 'react';
import {DEFAULT_SCALE, DEFAULT_SWATCH_WIDTH} from './constants.js';

export default class Colorscale extends Component {

    render() {

        const scale = this.props.colorscale || DEFAULT_SCALE;
        let swatchWidth = DEFAULT_SWATCH_WIDTH;

        if (this.props.width) {
            swatchWidth = this.props.width/scale.length;
        }

        if (this.props.maxWidth) {
            if (swatchWidth*scale.length > this.props.maxWidth) {
                swatchWidth = this.props.maxWidth/scale.length;
            }
        }

        return (
            <div
                className='colorscale-block'
                style={{display:'inline-block', margin:'10px 20px'}}
                onClick={() => this.props.onClick(scale, this.props.start, this.props.rot)}
            >
                <div
                    style={{
                        textAlign: 'center', 
                        fontWeight: 600, 
                        fontSize: '12px', 
                        color: '#2a3f5f', 
                        marginRight: '10px', 
                        marginTop: '4px',
                        verticalAlign: 'top',
                        display: 'inline-block'
                    }}
                >
                    {this.props.label || ''}
                </div>
                {scale.map((x, i) =>
                    <div
                       key={i}
                       className='colorscale-swatch'    
                       style={{
                           backgroundColor: x,
                           width: `${swatchWidth}px`,
                           height: '20px',
                           margin: '0 auto',
                           display: 'inline-block',
                           cursor: 'pointer'
                       }}
                    />
                )}
            </div>
        );
    }
}
