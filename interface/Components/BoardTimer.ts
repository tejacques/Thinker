import React = require('react')
import Utils = require('../Utils')

class BoardTimer extends React.Component<
    { active: boolean; style: React.CSSProperties },
    { remaining: number; startTime: number }> {
    time = 30000
    state = {
        remaining: this.props.active ? this.time : 0,
        startTime: (+new Date()),
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.active && nextProps.active) {
            this.setState({
                remaining: this.time,
                startTime: (+new Date()),
            })
        }
    }
    render() {
        if (this.props.active && this.state.remaining > 0) {
            var seconds = Utils.pad(2, '0', Math.max((this.state.remaining / 1000) | 0, 0))
            var rest = Utils.pad(2, '0', Math.max(((this.state.remaining % 1000) / 10) | 0, 0))
            return React.DOM.span(
                { style: this.props.style },
                React.DOM.text(null, seconds + ':' + rest))
        } else {
            return React.DOM.span(
                { style: this.props.style },
                React.DOM.text(null, '--:--'))
        }
    }
    interval: any
    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 33)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    tick() {
        if (this.props.active && this.state.remaining > 0) {
            var elapsed = (+new Date()) - this.state.startTime
            this.setState({
                remaining: this.time - elapsed,
                startTime: this.state.startTime,
            })
        }
    }
}

export = BoardTimer