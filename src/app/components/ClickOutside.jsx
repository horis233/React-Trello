import * as React from "react";
import onClickOutside from "react-onclickoutside";


class ClickOutsideWrapper extends React.Component {
  handleClickOutside = () => this.props.handleClickOutside();
  render = () => this.props.children;
}

export default onClickOutside(ClickOutsideWrapper);
