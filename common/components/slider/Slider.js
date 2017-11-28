/**
 *author zhiyong
 *date  18/11/2016
 */

import React from 'react';
import SliderArrows from './sliderArrows/SliderArrows'
import SliderDots from './sliderDots/SliderDots'
import './slider.less'

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowLocal: this.props.infinite ? 1 : 0,
      left: 0,
      transitionSpeed: this.props.transitionSpeed,
      itemWidth: 0,
      totalWidth: 0,
    };
    this.turn = this.turn.bind(this);
    this.autoPlay = this.autoPlay.bind(this);
    this.pauseAutoPlay = this.pauseAutoPlay.bind(this);
    this.handelTouchStart = this.handelTouchStart.bind(this);
    this.handelTouchEnd = this.handelTouchEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.init = this.init.bind(this);
    this.handleTransform = this.handleTransform.bind(this);
    this.Angle = this.Angle.bind(this);
  }

  init() {
    let children = this.handleChildren(this.props.children);
    this.itemWidth = this.sliderContainer.parentNode && this.sliderContainer.parentNode.clientWidth;
    this.totalWidth = this.itemWidth * this.handleChildren(this.props.children).length
  }

  handleChildren(arr) {
    let result = Array.isArray(arr) ? arr : [arr];
    if (this.props.infinite && result.length > 1) {
      result = [result[result.length - 1], ...result, result[0]]
    }
    return result
  }

  Angle(x1, x2, y1, y2) {
    return Math.atan((y2 - y1) / (x2 - x1)) * 180 / Math.PI;
  }

  turn(option) {
    this.init();
    let count = this.handleChildren(this.props.children).length,
      newLocal = option + this.state.nowLocal;
    if (newLocal < 0) {
      newLocal = newLocal + count;
    }
    if (newLocal >= count) {
      newLocal = newLocal - count;
    }
    let left = this.itemWidth * newLocal;
    this.setState({
      transitionSpeed: this.props.transitionSpeed
    })
    this.handleTransform(left);

    this.setState({
      nowLocal: newLocal
    })
  }

  handleTransform(left, transitionDuration) {
    let sliderNode = this.sliderContainer.style;
    if ('transform' in document.documentElement.style || 'WebkitTransform' in document.documentElement.style) {
      sliderNode.WebkitTransform = 'translate3d(' + -left + 'px,0,0)';
      sliderNode.transform = 'translate3d(' + -left + 'px,0,0)';
    } else {
      sliderNode.left = -left + "px";
    }
  }

  autoPlay() {
    if (this.props.autoPlay) {
      this.autoPlayFlag = setInterval(()=> {
        this.turn(1)
      }, this.props.autoPlaySpeed)
    }
  }

  pauseAutoPlay() {
    if (this.autoPlayFlag) {
      clearInterval(this.autoPlayFlag)
    }
  }

  handelTouchStart(e) {
    this.pauseAutoPlay();
    this.startX = e.changedTouches[0].pageX;
    this.startY = e.changedTouches[0].pageY;
  }

  handleTouchMove(e) {
    this.setState({
      transitionSpeed: 0
    })
    let sliderNode = this.sliderContainer.style,
      angle = Math.abs(this.Angle(this.startX, e.changedTouches[0].pageX, this.startY, e.changedTouches[0].pageY));
    this.angle = angle;
    if (angle > 45) {
    } else {
      if (this.state.nowLocal + 1 == this.handleChildren(this.props.children).length || this.state.nowLocal == 0) {
        let left = -e.changedTouches[0].pageX + this.startX + (this.state.nowLocal ) * this.itemWidth
        this.handleTransform(left);
      } else {
        let left = -e.changedTouches[0].pageX + this.startX + (this.state.nowLocal ) * this.itemWidth
        this.handleTransform(left);
      }
    }
  }

  handelTouchEnd(e) {
    var slideRange = this.startX - e.changedTouches[0].pageX,
      option;
    if (!this.props.loop && this.angle <= 45 && Math.abs(slideRange) > 20) {
      //处理左滑动,
      if (slideRange > 0) {
        if (this.state.nowLocal + 1 == this.handleChildren(this.props.children).length) {
          option = 0;
        } else {
          option = 1;
        }
        // 处理右滑动
      } else if (slideRange < 0) {
        if (this.state.nowLocal == 0) {
          option = 0;
        } else {
          option = -1;
        }
      }
    } else {
      option = 0;
    }
    this.setState({
      transitionSpeed: this.props.transitionSpeed
    })
    let count = this.handleChildren(this.props.children).length,
      newLocal = option + this.state.nowLocal;
    if (newLocal < 0) {
      newLocal = newLocal + count;
    }
    if (newLocal >= count) {
      newLocal = newLocal - count;
    }
    let left = newLocal * this.itemWidth;
    setTimeout(()=> {
      this.handleTransform(left);
    }, 0)
    this.setState({
      nowLocal: newLocal
    })
  }

  componentDidMount() {
    this.autoPlay();
    this.init();
  }

  componentWillReceiveProps() {
    this.init();
  }

  componentWillUnmount() {
    this.pauseAutoPlay();
  }

  render() {
    let {countNumber, className} = this.props;
    let children = this.handleChildren(this.props.children),
      count = children.length;
    //根据配置，定义dots
    var dotsNode = this.props.dots ?
      <SliderDots turn={this.turn} count={count} nowLocal={this.state.nowLocal}
                  custom={this.props.dotsCustom}/> : '';
    //根据配置，定制化arrows
    var arrowsNode = this.props.arrows ?
      <SliderArrows
        turn={this.turn}
        custom={this.props.arrowsCustom ? this.props.arrowsCustom : ''}
        nowLocal={this.state.nowLocal}
        hiddenArrows={this.props.hiddenArrows}
        count={count}
        arrowActive={this.props.arrowActive}
      /> : '';

    //根据配置，设置node
    var itemsNode = [];
    if (this.props.fade) {
      children && children.map((item, index)=> {
        itemsNode[index] = (
          <li key={'item' + index}
              className={'slider-item slider-fade ' + (index === this.state.nowLocal ? 'slider-item-active' : '')}>{item}</li>
        )
      })
    } else {
      children && children.map((item, index)=> {
        itemsNode[index] = (
          <li key={'item' + index} style={{width: 100 / count + "%"}}
              className={'slider-item ' + (index === this.state.nowLocal ? '' : '')}>{item}</li>
        )
      })
    }

    //根据配置，设置style
    let ulStyle;
    if (this.props.fade) {
      ulStyle = {
        width: "100%"
      }
    } else {
      if ('transform' in document.documentElement.style || 'WebkitTransform' in document.documentElement.style) {
        ulStyle = {
          WebkitTransform: 'translate3d(' + -this.state.left + 'px,0,0)',
          transform: 'translate3d(' + -this.state.left + 'px,0,0)',
          WebkitTransitionDuration: this.state.transitionSpeed + "ms",
          MozTransitionDuration: this.state.transitionSpeed + "ms",
          transitionDuration: this.state.transitionSpeed + "ms",
          width: count * 100 + "%"
        }
      } else {
        ulStyle = {
          left: -this.state.left + "px",
          WebkitTransitionDuration: this.state.transitionSpeed + "ms",
          MozTransitionDuration: this.state.transitionSpeed + "ms",
          transitionDuration: this.state.transitionSpeed + "ms",
          width: count * 100 + "%"
        }
      }
    }

    return (
      <div
        className={className ? `slider ${className}` : `slider`}
        onMouseOver={this.props.pause ? this.pauseAutoPlay : null}
        onMouseOut={this.props.pause ? this.autoPlay : null}>
        <ul ref={(sliderContainer)=> {
          this.sliderContainer = sliderContainer
        }} className="slider-items"
            style={ulStyle} onTouchStart={this.handelTouchStart}
            onTouchEnd={this.handelTouchEnd}
            onTouchMove={this.handleTouchMove}>
          {itemsNode}
        </ul>
        {arrowsNode}
        {dotsNode}
        {countNumber &&
        <div className="count-number">
          <span className="count-now">{this.state.nowLocal + 1}</span>
          <span className="divider">/</span>
          <span className="count-total">{count}</span>
        </div>
        }
      </div>
    )
  }
}

Slider.defaultProps = {
  autoPlaySpeed: 6000,
  transitionSpeed: 300,
  pause: true,
  autoPlay: true,
  dots: true,
  arrows: true,
  fade: false,
  loop: false,
  hiddenArrows: false,
  /*左箭头，右箭头定制化*/
  arrowsCustom: null,
  /*正常的，active定制化*/
  dotsCustom: null,
  //是否是在第一个位置,与最后一个位置时,箭头不能点击,且样式不同
  arrowActive: false,
  //是否显示计数
  countNumber: false,
  infinite: true,
}
export default Slider;
