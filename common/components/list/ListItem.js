/**
 * Created by zhiyong on 5/9/17.
 */
import React from 'react';
import TouchActive from '../touchActive/TouchActive'
class Item extends React.Component {
  static propTypes = {
    /**
     * 接受children，是item主要显示内容
     */
    children: React.PropTypes.element,
    /**
     * 控制是否显示底部border
     */
    border: React.PropTypes.bool,
    /**
     * 配置除了children之外右侧显示内容
     */
    extra: React.PropTypes.element,
    /**
     * 配置跳转链接
     */
    href: React.PropTypes.string,
    /**
     * 配置右侧的icon
     */
    icon: React.PropTypes.string,
    /**
     * 配置icon方向
     */
    iconDirection: React.PropTypes.string
  }
  static defaultProps = {
    border: true,
  };
  constructor(props) {
    super(props);
  }
  render() {
    let {
        children,
        border = true,
        icon,
        extra,
        iconDirection,
        className,
        ...rest
      } = this.props,
      borderClassName = border ? 'border-handle' : '',
      defaultClassName = `list-item  ${borderClassName} `;
    className = className ? `${defaultClassName} ${className}` : defaultClassName;
    return (
      <TouchActive {...rest}>
        <div className={className}>
          {children !== undefined && <div className="item-content">{children}</div>}
          {
            (extra || icon) ?
              <div
                className={`extra-child`}
              >{extra}</div> : null
          }
          {
            icon ? <div
              className={`${icon ? `right-icon ${icon || ''}` : ''} ${iconDirection ? `direction-${iconDirection}` : ''}`}></div> : null
          }
        </div>
      </TouchActive>
    )
  }
}
Item.propTypes = {
  /**
   * 定制化类名
   */
  className: React.PropTypes.string
}
export default Item;
