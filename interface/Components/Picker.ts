import React = require('react')
import ReactUtils = require('../ReactUtils')

type p = React.Props<any>

interface PickerProps<TPicked> {
    style?: React.CSSProperties
    choices: TPicked[]
    onPicked: (picked: TPicked) => void
    stopPropagation?: boolean
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
                React.DOM.li({
                    key: index, style: { float: 'left' },
                    onClick: (e) => {
                        if (this.props.stopPropagation === true) {
                            e.stopPropagation()
                        }
                        this.onPicked(this.props.choices[index])
                    },
                }, choice)
            )
        )
    }
}

export = Picker