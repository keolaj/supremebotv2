import React from 'react'
class App extends React.Component {
    render() {
        return (<HomeScreen screenProps={this.props.firstName}/>)
    }
}

export default App;