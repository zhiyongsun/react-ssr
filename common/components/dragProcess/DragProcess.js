/**
 * Created by zhiyong on 9/6/17.
 */
/**
 * Created by zhiyong on 7/25/17.
 */
import React from 'react';
import {preventDefault} from '../../utils/utils';
import {isSupportTouch} from '../../utils/env/env';

const decimalFormat = item => item;
class DragProcess extends React.Component {
  static propTypes = {
    /**
     * 初始数据
     */
    startData: React.PropTypes.number.isRequired,
    /**
     * 结束数据
     */
    endData: React.PropTypes.number.isRequired,
    /**
     * 数据梯度
     */
    section: React.PropTypes.number,
    /**
     * 移动是的回调，amount
     */
    cb: React.PropTypes.func,
    /**
     * 已经选择线条的样式
     */
    seletedStyle: React.PropTypes.object,
    /**
     * 已经选择线条的样式
     */
    unit: React.PropTypes.string,
    /**
     * 传入 amount,以控制选择值
     */
    amount: React.PropTypes.number,
    /**
     * 是否是H5
     */
    isH5: React.PropTypes.bool
  };
  static defaultProps = {
    unit: '元',
    isH5: false,
  };

  constructor(props) {
    super(props);
    if (this.props.isH5) {
      require('./dragProcessH5.less')
    } else {
      require('./dragProcessPc.less')
    }
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.init = this.init.bind(this);
    this.handleAmout = this.handleAmout.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);

    this.handleStartCommon = this.handleStartCommon.bind(this);
    this.handleMoveCommon = this.handleMoveCommon.bind(this);
    this.state = {};
  }


  init() {
    this.initialOffSetLeft = this.initialOffSetLeft || this.swipePointParent.offsetLeft;
    this.total = this.total || this.totalLine.offsetWidth;
    this.max = this.max || (this.totalLine.offsetWidth + this.initialOffSetLeft);
  }

  handleStartCommon(e) {
    this.init();
    this.startX = e.clientX;
    this.startLeft = this.swipePointParent.offsetLeft;
  }

  handleMoveCommon(thisX) {
    const
      {
        section,
        cb,
        startData,
        endData,
      } = this.props;
    const
      moveDistance = Math.max(0, Math.min(this.total, (this.startLeft + (thisX - this.startX) - this.initialOffSetLeft))),
      to = Math.min(this.max, Math.max(this.initialOffSetLeft, this.startLeft + (thisX - this.startX))),
      percent = moveDistance / this.total;

    let amount;
    amount = parseInt(percent * (endData - startData), 10) + startData;
    if (section) {
      amount = Math.floor((amount - startData) / section) * section + startData;
    }
    if (cb) {
      cb({amount});
    }
    this.setState({
      amount,
      to,
      moveDistance,
    });
  }

  // 处理pc
  handleMouseDown(e) {
    const event = e || window.event;
    this.handleStartCommon(event);

    document.onmousemove = (e) => {
      const thisX = (e || window.event).clientX;
      this.handleMoveCommon(thisX);
      // 处理滑动过程中,别选中问题
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    };

    document.onmouseup = new Function('this.onmousemove=null');
  }

  // 处理有默认amount数据的情况
  handleAmout(amount, props) {
    this.init();
    const {
      startData,
      endData,
    } = props;

    if (amount && amount >= startData && amount <= endData) {
      let moveDistance;
      if (endData === startData) {
        moveDistance = this.total;
      } else {
        moveDistance = this.total * (amount - startData) / (endData - startData);
      }
      const {} = this.props,
        to = this.initialOffSetLeft + moveDistance;

      this.setState({
        amount,
        moveDistance,
        to,
      })
    }
  }

  // 处理 h5 pad
  handleStart(e) {
    const event = e.changedTouches[0];
    this.handleStartCommon(event);
  }

  handleMove(e) {
    const thisX = e.changedTouches[0].clientX;
    this.handleMoveCommon(thisX);
  }


  componentDidMount() {
    this.windowListener = () => {
      this.handleAmout(this.props.amount, this.props);
    }
    window.addEventListener('load', this.windowListener, false);
    document.body.addEventListener('touchmove', preventDefault, false);
  }


  componentWillReceiveProps(nextprops) {
    let {amount} = nextprops;
    if (amount === null) {
      return
    }
    this.handleAmout(nextprops.amount, nextprops);

  }

  componentWillUnmount() {
    window.removeEventListener('load', this.windowListener);
    document.body.removeEventListener('touchmove', preventDefault, false);
  }

  render() {
    const {
        unit,
        startData,
        endData,
        seletedStyle,
      } = this.props,
      {
        to,
        moveDistance,
      } = this.state;
    let config;
    config = isSupportTouch() ?
      {
        onTouchStart: this.handleStart,
        onTouchMove: this.handleMove,
      } :
      {
        onMouseDown: this.handleMouseDown,
      };
    return (
      <div className="drag-process line-wrapper ">
        <div className="line">
          <div
            className="total-line"
            ref={(totalLine) => this.totalLine = totalLine}
          >&nbsp;</div>
          <div
            className="selected-line"
            ref={selectedLine => this.selectedLine = selectedLine}
            style={Object.assign((seletedStyle || {}), moveDistance !== undefined ? {width: moveDistance} : {})}
          >&nbsp;</div>
          <div
            className="swipe-point"
            ref={swipePointParent => this.swipePointParent = swipePointParent}
            style={to !== undefined ? {left: to} : {}}
            {...config}
          >
            <div className="selected-amount">
              <span className="arrow">&nbsp;</span>
              <div className="value"><span
                className="value-number">{decimalFormat(this.state.amount || startData)}</span>{unit}
              </div>
            </div>
            <div className="selected-point">
              <i className="fa fa-align-justify"></i>
            </div>
            <div
              className="cover"
            >&nbsp;</div>
          </div>

          <div className="amount">
            <span className="value-number">{decimalFormat(startData)}<span>{unit}</span></span>
            <span className="value-number">{decimalFormat(endData)}<span>{unit}</span></span>
          </div>
        </div>

      </div>
    );
  }
}

export default DragProcess;
