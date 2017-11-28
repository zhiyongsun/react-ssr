/**
 *author zhiyong
 *date  18/11/2016
 */

import React from 'react';

//导入less
import './sliderArrows.less'

class SliderArrows extends React.Component {
    constructor(props) {
        super(props);
    }

    handleArrowClick(option) {
        this.props.turn(option);
    }

    render() {
        let {arrowActive, count, nowLocal} = this.props,
            className = (function () {
                    if (arrowActive) {
                        return nowLocal == count - 1 || nowLocal == 0 ? 'negative' : ''
                    }
                })() || ''

        let leftArrow, rightArrow;
        leftArrow = (
            <div
                key="index1"
                className={`slider-arrow-left ${nowLocal == 0 ? 'negative' : ''}`}
                onClick={ () => {
                    if (nowLocal == 0) {
                        return
                    }
                    this.handleArrowClick(-1)
                }}>
                {this.props.custom ? this.props.custom[0] : <span className="icono-caretLeft"></span>}
            </div>);
        rightArrow =
            (<div
                    key="index2"
                    className={`slider-arrow-right ${nowLocal == count - 1 ? 'negative' : ''}`}
                    onClick={
                        () => {
                            if (nowLocal == count - 1) {
                                return
                            }
                            this.handleArrowClick(1)
                        }
                    }>
                    {this.props.custom ? this.props.custom[1] : <span className="icono-caretRight"></span>}
                </div>
            )

        leftArrow = this.props.hiddenArrows && this.props.nowLocal == 0 ? '' : leftArrow;
        rightArrow = this.props.hiddenArrows && this.props.nowLocal == this.props.count - 1 ? '' : rightArrow;
        return (
            <div className="slider-arrows">
                {leftArrow}
                {rightArrow}
            </div>
        )
    }
}

export default SliderArrows;