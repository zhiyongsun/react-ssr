/**
 * Created by zhiyong on 5/9/17.
 */
import React from 'react';
import './list.less';
class List extends React.Component {
  static propTypes = {
    /**
     * 接受children，
     */
    children: React.PropTypes.element,
    /**
     * 控制是否显示上下border
     */
    border: React.PropTypes.bool,
    /**
     * 用于单独显示borderBottom(border设为false,borderBottom设为true,)
     */
    borderBottom: React.PropTypes.bool,
    /**
     * 配置className
     */
    className: React.PropTypes.string,
  }
  static defaultProps = {
    border: true,
  };
  constructor(props) {
    super(props);
  }
  render() {
    let {children, className, border = true, borderBottom, ...rest} = this.props,
      borderClassName = (border || borderBottom) ? 'border-handle' : '';
    className = className ? `list ${borderClassName} ${className}` : `list ${borderClassName}`;
    className = borderBottom ? `${className} border-bootom` : className;
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }
}
export default List;
