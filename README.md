#React time period picker // react time range picker 
Simple react component to select time ranges

## Getting Started

Package allows to select certain time ranges or periods.

```
import React, { Component } from 'react'
import Time from 'react-time-period-picker'

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
       
      };
  }
  onOpeningsChange(e) {
    this.state.openings = e;
    this.setState(this.state);
}
  render() {
    return (<div>
      <Time
        onChange={this.onOpeningsChange.bind(this)}
        data={this.state.openings}
        />
                            
    </div>)
  }
}
export default App;
```
## props

| Prop | Description | Default
| --- | --- | -- |
| data | List of time ranges (Array of objects with start and end times)  | Array [] |
| canOverlap | Allow to overlap time ranges | false |
| className | --- | ""
| invalidOverlapText | Invalid message on Overlap | Time cannot be overlaped |
| equalRangeText | invalid message in equal time periods | Time cannot be equal | 
## Acknowledgments
*antd
*moment