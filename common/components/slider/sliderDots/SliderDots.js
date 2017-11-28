/**
 *author zhiyong
 *date  18/11/2016
 */

import React from 'react';

//导入less
import './sliderDots.less'

class SliderDots extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDotClick(i) {
        let option = i - this.props.nowLocal;
        this.props.turn(option);
    }

    render() {
        let dotNodes = [],
            {count, nowLocal} = this.props;
        for (let i = 0; i < count; i++) {
            this.props.custom ? (
                dotNodes[i] = (
                    i === this.props.nowLocal ?
                        (<div key={"dot" + i} className="slider-dot"
                              onClick={this.handleDotClick.bind(this, i)}> {this.props.custom[1]}</div>) :
                        (<div key={"slider-dot" + i} className="slider-dot"
                              onClick={this.handleDotClick.bind(this, i)}> {this.props.custom[0]}</div>)
                )
            ) : (
                dotNodes[i] =
                    (<div key={'dot' + i}
                          className={'slider-dot icono-circle ' + (i === this.props.nowLocal ? "slider-dot-seleted" : "")}
                          onClick={this.handleDotClick.bind(this, i)}></div>)
            )
        }
        return (
            <div className="slider-dots">
                {dotNodes}
            </div>
        )
    }
}

export default SliderDots;