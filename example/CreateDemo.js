import React, { Component } from 'react';

class CreateDemo extends Component {
    constructor(props){
        super(props);
        this.state = this.initState;
    }
    initState = {
        name: ""
    }
    render() {
        let {name} = this.state;
        return (
            <div>
                <input value={name} onChange={this.onChangeValue} />
                {name}
                <button type="button" onClick={this.submitValue}>ahihih</button>
            </div>
        );
    }
    onChangeValue = event => {
        this.setState({
            name: event.target.value
        });
    }
    submitValue = () => {
        const {onChangeInput} = this.props;
        onChangeInput(this.state.name);
    }
}

export default CreateDemo;