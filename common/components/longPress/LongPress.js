/**
 * Created by zhiyong on 26/08/2017.
 */
import React from 'react';
import './longPress.less';

class LongPress extends React.Component {
  constructor(props) {
    super(props);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.addClass = this.addClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
    this.state = {className: 'press-item'};
  }

  addClass() {
    this.setState({className: 'press-item press'});
  }

  removeClass() {
    this.setState({className: 'press-item'});
  }

  handleTouchStart(e) {
    this.startX = e.changedTouches[0].pageX;
    this.startY = e.changedTouches[0].pageY;
    this.current = new Date();
    this.currentItem = e.currentTarget;
    this.timer = setTimeout(() => {
      this.now = true
      this.addClass();
    }, 200);

  }

  handleTouchMove(e) {
    const disX = Math.abs(parseInt(e.changedTouches[0].pageX) - parseInt(this.startX)) > 8,
      disY = Math.abs(parseInt(e.changedTouches[0].pageY) - parseInt(this.startY)) > 8;

    if (disX || disY) {
      clearTimeout(this.timer);
      this.removeClass();
    }
  }

  handleTouchEnd(e) {
    clearTimeout(this.timer);
    this.removeClass();
    // 处理点击颜色变化
    if (new Date() - this.current < 200 && Math.abs(parseInt(e.changedTouches[0].pageX) - parseInt(this.startX)) < 20 && Math.abs(parseInt(e.changedTouches[0].pageY) - parseInt(this.startY)) < 20) {
      this.addClass();
      setTimeout(() => {
        this.removeClass();
      }, 50);

      setTimeout(() => {
        location.href = '/';
      }, 100);
    }
  }

  render() {
    const {data} = this.props;
    return (
      <div className="long-press">
        <a
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onTouchCancel={this.handleTouchEnd}
          className={this.state.className}
        >
          {data.name}
        </a>
      </div>
    );
  }
}

export default LongPress;
