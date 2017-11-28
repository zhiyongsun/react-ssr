/**
 * Created by zhiyong on 10/12/17.
 */
import React from 'react';

class layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {header, main, bottom} = this.props;
    return (
      <div className="layout">
        {header && header}
        {main && main}
        {bottom && bottom}
      </div>
    )
  }
}

export default layout;
