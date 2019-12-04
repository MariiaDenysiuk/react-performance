import React from "react";
import PropTypes from "prop-types";

/**
 * This takes a single child and inserts a prop 'width' on it that is the
 * current width of the this container. This is handy if you want to surround
 * a chart or other svg diagram and have this drive the chart width.
 */
export default class Resizable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: 0 };
        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize() {
        if (this.container) {
            this.setState({
                width: this.container.offsetWidth
            });
        }
    }

    render() {
        const child = React.Children.only(this.props.children);
        const childElement = this.state.width
            ? React.cloneElement(child, { width: this.state.width })
            : null;
        return (
            <div
                ref={c => {
                    this.container = c;
                }}
                {...this.props}
            >
                {childElement}
            </div>
        );
    }
}

Resizable.propTypes = {
    children: PropTypes.node
}; 