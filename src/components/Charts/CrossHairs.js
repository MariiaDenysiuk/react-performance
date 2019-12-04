import React from "react";

class CrossHairs extends React.Component {
    render() {
        const { x, y } = this.props;
        console.log(this.props)
        const style = { pointerEvents: "none", stroke: "#ccc" };
        if (x && y) {
            return (
                <g>
                    <line style={style} x1={0} y1={y} x2={this.props.width} y2={y} />
                    <line style={style} x1={x} y1={0} x2={x} y2={this.props.height} />
                </g>
            );
        } else {
            return <g />;
        }
    }
}

export default CrossHairs;
