import React, { Component } from 'react';
import Colorscale from './Colorscale.js';
import chroma from 'chroma-js';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {COLORSCALE_TYPES, COLORSCALE_DESCRIPTIONS, BREWER, CMOCEAN, CUBEHELIX, SCALES_WITHOUT_LOG,
    DEFAULT_SCALE, DEFAULT_SWATCHES,DEFAULT_BREAKPOINTS, DEFAULT_START, DEFAULT_LOG_BREAKPOINTS,
    DEFAULT_ROTATIONS, DEFAULT_GAMMA, DEFAULT_LIGHTNESS, DEFAULT_NCOLORS} from './constants.js';

import './ColorscalePicker.css';

const Handle = Slider.Handle;
        
export default class ColorscalePicker extends Component {

    constructor(props) {
      	super(props);

        this.state = {
            nSwatches: this.props.nSwatches || DEFAULT_SWATCHES,
            colorscale: this.props.colorscale || DEFAULT_SCALE,
            previousColorscale: this.props.colorscale || DEFAULT_SCALE,
            colorscaleType: 'sequential',
            log: false,
            logBreakpoints: DEFAULT_LOG_BREAKPOINTS,
            customBreakpoints: DEFAULT_BREAKPOINTS,
            previousCustomBreakpoints: null,
            cubehelix: {
                start: DEFAULT_START,
                rotations: DEFAULT_ROTATIONS,
            }
        };

        this.getColorscale = this.getColorscale.bind(this);
        this.onClick = this.onClick.bind(this);
        this.setColorscaleType = this.setColorscaleType.bind(this);
        this.updateCubehelixStart = this.updateCubehelixStart.bind(this);
        this.updateCubehelixRotations = this.updateCubehelixRotations.bind(this);
        this.updateCubehelix = this.updateCubehelix.bind(this);
        this.toggleLog = this.toggleLog.bind(this);
        this.handle = this.handle.bind(this);
    }

    componentDidMount() {
        this.setState({colorscaleOnMount: this.props.colorscale})
    }

    handle = (props) => {
        const { value, dragging, index, ...restProps } = props;
        return (
                <Tooltip
                    prefixCls='rc-slider-tooltip'
                    overlay={value}
                    visible={dragging}
                    placement='top'
                    key={index}
                >
                    <Handle value={value} {...restProps} />
                </Tooltip>
        );
    };

    getColorscale = (colorscale, nSwatches, logBreakpoints, log) => {
    /*
     * getColorscale() takes a scale, modifies it based on the input
     * parameters, and returns a new scale
     */
        // helper function repeats a categorical colorscale array N times
        let repeatArray = (array, n) => {
            let arrays = Array.apply(null, new Array(n)); 
            arrays = arrays.map(function() { return array });
            return [].concat.apply([], arrays);
        }

        let cs = chroma.scale(colorscale)
            .mode('lch');

        if (log) {
            const logData = Array(nSwatches).fill().map((x,i)=>i+1);           
            cs = cs.classes(chroma.limits(logData, 'l', logBreakpoints));
        }

        let discreteScale = cs.colors(nSwatches);

        // repeat linear categorical ("qualitative") colorscales instead of repeating them
        if (!log && this.state.colorscaleType === 'categorical') {
            discreteScale = repeatArray(colorscale, nSwatches).slice(0, nSwatches);
        }

        return discreteScale;
    }

    toggleLog = () => {
        const cs = this.getColorscale(this.state.previousColorscale, 
                                      this.state.nSwatches, 
                                      this.state.logBreakpoints, 
                                      !this.state.log);

        this.setState({log: !this.state.log, colorscale: cs});

        this.props.onChange(cs);
    }

    onClick = (newColorscale, start, rot) => {
        const bp = this.state.customBreakpoints;
        const prevBp = this.state.previousCustomBreakpoints;

        if (bp === prevBp && this.state.colorscaleType === 'custom') {
            return;
        }

        const cs = this.getColorscale(newColorscale, 
                                      this.state.nSwatches, 
                                      this.state.logBreakpoints,
                                      this.state.log);

        let previousColorscale = newColorscale;
        if (this.state.colorscaleType === 'custom') {
            previousColorscale = this.state.previousColorscale;
        }

        if(!start && !rot) {
            this.setState({
                previousColorscale: previousColorscale,
                colorscale: cs,
                previousCustomBreakpoints: this.state.colorscaleType === 'custom' ? this.state.customBreakpoints : null,
            });
        }
        else {
            this.setState({
                previousColorscale: previousColorscale,
                colorscale: cs,
                previousCustomBreakpoints: null,
                cubehelix: {
                    start: start,
                    rotations: rot
                }
            });            
        }
        this.props.onChange(cs);
    }

    updateSwatchNumber = ns => {
        const cs = this.getColorscale(
            this.state.previousColorscale,
            ns,
            this.state.logBreakpoints,
            this.state.log);
        this.setState({
            nSwatches: ns,
            colorscale: cs,
            customBreakpoints: DEFAULT_BREAKPOINTS
        });
        this.props.onChange(cs);
    }

    updateBreakpoints = e => {
        const bp = e.currentTarget.valueAsNumber;

        const cs = this.getColorscale(
            this.state.previousColorscale, 
            this.state.nSwatches,
            bp,
            this.state.log);

        this.setState({
            logBreakpoints: bp,
            colorscale: cs
        });

        this.props.onChange(cs);
    }

    updateBreakpointArray = e => {
        const bpArr = e.currentTarget.value.replace(/,\s*$/, '').split(',').map(Number);       
        this.setState({
            customBreakpoints: bpArr
        });
    }

    updateCubehelixStart = start => {
        const rot = this.state.cubehelix.rotations;
        this.updateCubehelix(start, rot);
    }

    updateCubehelixRotations = rot => {
        const start = this.state.cubehelix.start;
        this.updateCubehelix(start, rot);
    }

    updateCubehelixStartState = start => {
        const ch = this.state.cubehelix;
        ch.start = start;
        this.setState({cubehelix: ch});
    }

    updateCubehelixRotState = rot => {
        const ch = this.state.cubehelix;
        ch.rotations = rot;
        this.setState({cubehelix: ch});
    }

    updateCubehelix = (start, rot) => {
        const newColorscale = chroma.cubehelix()
              .start(start)
              .rotations(this.state.cubehelix.rotations)
              .gamma(DEFAULT_GAMMA)
              .lightness(DEFAULT_LIGHTNESS)
                  .scale()
                  .correctLightness()
                  .colors(DEFAULT_NCOLORS);

        this.onClick(newColorscale, start, rot);
    }
    
    setColorscaleType = csType => {
        if (csType !== this.state.colorscaleType) {
            let isLogColorscale = this.state.log;

            if(SCALES_WITHOUT_LOG.indexOf(csType) >= 0) {
                isLogColorscale = false;
            }

            this.setState({
                colorscaleType: csType,
                log: isLogColorscale,
            });
        }
    }

    render() {

        let swatchLabel = null;
        let swatchSlider = null;

        if (!this.props.fixSwatches) {
          swatchLabel = (
            <div className='noWrap inlineBlock'>
              <span className='textLabel spaceRight'>Swatches:</span>
              <span className='textLabel spaceRight'>{this.state.nSwatches}</span>
            </div>
          );
          swatchSlider = (
            <Slider
              min={1}
              max={100}
              defaultValue={this.state.nSwatches}
              handle={this.handle}
              onAfterChange={this.updateSwatchNumber}
            />
          );
        }

        return (
            <div className='colorscalePickerContainer'>
                <div className='colorscalePickerTopContainer'>
                    <div className='colorscale-selected'>
                        <Colorscale
                            colorscale={this.state.colorscale}
                            maxWidth={300}
                            onClick={() => {}}                           
                        />
                    </div>
                    <div className='colorscaleControlPanel'>                        
                        <div>
                           {swatchLabel}
                           {SCALES_WITHOUT_LOG.indexOf(this.state.colorscaleType) < 0 &&
                               <div className='noWrap inlineBlock alignTop'>
                                   <span className='textLabel spaceRight spaceLeft'>Log scale</span>
                                   <input 
                                       type='checkbox'
                                       name='log'
                                       value='log'
                                       onChange={this.toggleLog} 
                                       defaultChecked={this.state.log} 
                                       className='spaceRightZeroTop alignMiddle'
                                   />
                                   {this.state.log &&
                                       <span>
                                           <span className='textLabel spaceRight spaceLeft'>Breakpoints: </span>
                                           <input 
                                               type='number'
                                               step='1' min='1' max='10'
                                               value={`${this.state.logBreakpoints}`} 
                                               onChange={this.updateBreakpoints} 
                                           />
                                       </span>
                                   }
                               </div>
                           }
                           {swatchSlider}
                        </div>
                        {this.state.colorscaleType === 'cubehelix' &&
                        <div>
                           <div className='noWrap'>
                               <span className='textLabel'>Start: </span>
                               <span className='textLabel'>{this.state.cubehelix.start}</span>
                               <Slider
                                   min={0}
                                   max={300}
                                   step={1}
                                   value={this.state.cubehelix.start}
                                   onChange={this.updateCubehelixStartState}
                                   onAfterChange={this.updateCubehelixStart}
                                   handle={this.handle}
                               />
                           </div>
                           <div className='noWrap'>
                               <span className='textLabel'>Rotations: </span>
                               <span className='textLabel'>{this.state.cubehelix.rotations}</span>
                               <Slider
                                   min={-1.5}
                                   max={1.5}
                                   step={0.1}
                                   value={this.state.cubehelix.rotations}
                                   onChange={this.updateCubehelixRotState}
                                   onAfterChange={this.updateCubehelixRotations}
                                   handle={this.handle}
                               />
                            </div>
                        </div>
                        }
                        <div className='colorscaleControlsRow'>
                           {COLORSCALE_TYPES.map((x,i) =>
                               <a
                                   key={i}
                                   style={x === this.state.colorscaleType ? {backgroundColor: '#2a3f5f'} : null}
                                   className='colorscaleButton'
                                   onClick={() => {this.setColorscaleType(x)}}
                               >
                                   {x}                  
                               </a>        
                           )}
                       </div>
                       <div>
                           {this.state.colorscaleType === 'custom' &&
                               <div className='colorscaleControlsRow'>
                                    <p className='textLabel zeroSpace'>
                                        Decimals between 0 and 1, or numbers between MIN and MAX of your data, separated by commas:
                                    </p>
                                    <input
                                        type='text'
                                        defaultValue={this.state.customBreakpoints.join(', ')} 
                                        onChange={this.updateBreakpointArray}
                                    />
                                    <p className='textLabel spaceTop'>
                                        {this.state.customBreakpoints.length-1} breakpoints: {this.state.customBreakpoints.join(' | ')}
                                    </p>
                               </div>
                           }
                       </div>
                    </div>
                </div>
                <div className='colorscalePickerBottomContainer'>
                    <p>
                        {COLORSCALE_DESCRIPTIONS[this.state.colorscaleType]}
                    </p>
                    <Colorscale
                        colorscale={this.state.colorscaleOnMount}
                        onClick={this.onClick}
                        label={'RESET'}
                        width={150}
                    />
                    {BREWER.hasOwnProperty(this.state.colorscaleType) && BREWER[this.state.colorscaleType].map((x, i) =>
                        <Colorscale
                            key={i}                            
                            onClick={this.onClick}
                            colorscale={chroma.brewer[x]}
                            label={x}
                        />
                    )}
                    {this.state.colorscaleType === 'cubehelix' && CUBEHELIX.map((x, i) =>
                        <Colorscale
                            key={i}                            
                            onClick={this.onClick}
                            colorscale={chroma.cubehelix()
                                        .start(x.start)
                                        .rotations(x.rotations)
                                        .gamma(DEFAULT_GAMMA)
                                        .lightness(DEFAULT_LIGHTNESS)
                                        .scale()
                                        .correctLightness()
                                        .colors(DEFAULT_NCOLORS)
                            }
                            label={`s${x.start} r${x.rotations}`}
                            start={x.start}
                            rot={x.rotations}
                        />
                    )}
                    {this.state.colorscaleType === 'cmocean' && Object.keys(CMOCEAN).map((x, i) =>
                        <Colorscale
                            key={i}                            
                            onClick={this.onClick}
                            colorscale={CMOCEAN[x]}
                            label={x}
                        />
                    )}
                    {this.state.colorscaleType === 'custom' &&
                        <Colorscale
                            onClick={this.onClick}
                            colorscale={chroma.scale(this.state.previousColorscale)
                                        .classes(this.state.customBreakpoints)
                                        .mode('lch')
                                        .colors(this.state.nSwatches)
                            }
                            maxWidth={200}
                            label='Preview (click to apply)'
                        />
                    }
                </div>
            </div>
        );
    }
}
