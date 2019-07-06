import React, { Component } from 'react'
import Time from './lib'
import 'antd/dist/antd.css';
class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
       
      };
  }
  onOpeningsChange(e) {
    // console.log(e)
    this.setState({openings:e});
}
  render() {
    return (<div>
      <Time
        onChange={this.onOpeningsChange.bind(this)}
        invalidopenings={this.state.invalidopenings}
        data={this.state.openings}
        canOverlap={true}
        />
                            
    </div>)
  }
}

export default App;
