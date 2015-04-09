import React = require('react')
import ReactUtils = require('../ReactUtils')

type p = React.Props<any>

interface PickerProps<TPicked> {
    style?: React.CSSProperties
    choices: TPicked[]
    onPicked: (picked: TPicked) => void
}

interface PickerState<TPicked> {
    picked?: TPicked
}

class Picker<TPicked> extends React.Component<PickerProps<TPicked>, PickerState<TPicked>> {
    onPicked(picked: TPicked) {
        this.props.onPicked(picked)
    }
    render() {
        return React.DOM.ul({
            style: this.props.style,
            className: 'pickerContainer',
        }, this.props.choices.map((choice, index) =>
                React.DOM.li({ style: { float: 'left' }, onClick: () => this.onPicked(this.props.choices[index]) }, choice)
            )
        )
    }
}

export = Picker