/**
 * Created by zhiyong on 9/5/17.
 */
/**
 * Created by zhiyong on 26/08/2017.
 */
import React from 'react';
import './touchActive.less';

class TouchActive extends React.Component {
  static activeColor = {
    default: '#e8e8e8',
  };
  static propTypes = {
    /**
     * className
     */
    className: React.PropTypes.string,
    /**
     * active classname
     */
    activeClassName: React.PropTypes.string,
    /**
     * active color
     */
    activeColor: React.PropTypes.string,
    /**
     * 组件外层element类型
     */
    type: React.PropTypes.string,
  };

  static defaultProps = {
    activeColor: '#e8e8e8',
    type: 'div',
  };

  constructor(props) {
    super(props);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchCancle = this.handleTouchCancle.bind(this);
    this.addClass = this.addClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
    this.getProps = this.getProps.bind(this);
    this.state = {
      activeClassName: '',
      activeColor: {},
    };
  }
  getProps() {
    const {
      href,
      _blank,
      children,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchCancel,
      className,
      type,
      ...rest
    } = this.props;

    return {
      ...rest,
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd,
      onTouchCancel: this.handleTouchCancle,
      className: `press-item ${className || ''} ${this.state.activeClassName || ''}`,
      style: this.state.activeColor,
    };
  }

  addClass() {
    const {activeClassName, activeColor} = this.props;
    this.setState({
      activeClassName: `${activeClassName || ''}`,
      activeColor: {background: activeColor || ''},
    });
  }

  removeClass() {
    this.setState({
      activeClassName: '',
      activeColor: {},
    });
  }

  handleTouchStart(e) {
    const {onTouchStart} = this.props,
      touches = e.changedTouches[0];
    if (onTouchStart) onTouchStart(e);
    this.startX = touches.pageX;
    this.startY = touches.pageY;
    this.current = new Date();
    this.currentItem = e.currentTarget;
    this.timer = setTimeout(() => {
      this.addClass();
    }, 200);
  }

  handleTouchMove(e) {
    const {onTouchMove} = this.props;
    if (onTouchMove) onTouchMove(e);
    const touches = e.changedTouches[0],
      disX = Math.abs(parseInt(touches.pageX, 10) - parseInt(this.startX, 10)) > 8,
      disY = Math.abs(parseInt(touches.pageY, 10) - parseInt(this.startY, 10)) > 8;

    if (disX || disY) {
      clearTimeout(this.timer);
      this.removeClass();
    }
  }

  handleTouchEnd(e, isTouchEnd = true) {
    if (isTouchEnd) {
      if (this.props.onTouchEnd) this.props.onTouchEnd(e);
    } else {
      if (this.props.onTouchCancel) this.props.onTouchCancel(e);
    }

    clearTimeout(this.timer);
    this.removeClass();
    // 处理点击颜色变化
    const touches = e.changedTouches[0];
    if (new Date() - this.current < 200 && Math.abs(parseInt(touches.pageX, 10) - parseInt(this.startX, 10)) < 20 && Math.abs(parseInt(touches.pageY, 10) - parseInt(this.startY, 10)) < 20) {
      this.addClass();
      setTimeout(() => {
        this.removeClass();
      }, 90);

      setTimeout(() => {
        const {href} = this.props;
        if (href) {
          if (this.props._blank) {
            window.open(href);
          } else {
            location.href = href;
          }
        }
      }, 100);
    }
  }

  handleTouchCancle(e) {
    this.handleTouchEnd(e, false);
  }


  render() {
    let {type} = this.props;
    const {children} = this.props,
      elementProps = this.getProps();
    type = type || 'div';
    return (
      React.createElement(
        type,
        elementProps,
        children
      )
    );
  }
}

export default TouchActive;

