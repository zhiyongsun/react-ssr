/**
 * Created by zhiyong on 10/18/17.
 */
import React from 'react';
import './header.less';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
          <a className="list-group-item" href="#/">
            <i className="fa fa-home fa-fw" aria-hidden="true"></i>&nbsp; Home</a>
      </header>
    )
  }
}

export default Header;
