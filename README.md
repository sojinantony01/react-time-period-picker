#React time period picker 
Simple react component to select multiple time ranges

## Getting Started

Package allows to select certain time ranges or periods.

```
data = {
    {start: "03:06", end: "03:10"},
    {start: "03:11", end: "03:18"},
    ...
}
```
![alt text](https://raw.githubusercontent.com/sojinantony01/react-time-period-picker/master/public/img/Screenshot%20from%202019-06-08%2000-42-59.png)

![alt text](https://raw.githubusercontent.com/sojinantony01/react-time-period-picker/master/public/img/Screenshot%20from%202019-07-06%2014-02-23.png)

```
import React, { Component } from 'react'
import Time from 'react-time-period-picker'
import  './react-time-period-picker/dist/time.css'
class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
       
      };
  }
  onOpeningsChange(e) {
    this.setState({openings:e});
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
Use your on css for better UI
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