import React, { Component } from 'react';
import { TimePicker,Icon } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

const format = 'HH:mm';

class TimeRangePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
           start:false,
           end:false,
           range:this.props.data ? this.props.data :[],
        };  
    }

    onChange(state,e) {
        var prevState = this.state;
        prevState[state] = e;
        prevState.invalidOverlap  = false;
        prevState.equalRange  = false;
        prevState.invalidRange = false
        this.setState(prevState);
    }

    checkTime(start, end, startTime, endTime) {
        if(((start < endTime) && (start > startTime)) ||
        ((end > startTime) && (end < endTime)) ||
         ((startTime > start) && (startTime < end)) ||
          ((endTime > start) && (endTime < end))) {
            return true;
        }
        return false;
    }

    checkOpenings() { 
        var valid = true;
        var start = moment(this.state.start).format('HH')*3600 +  moment(this.state.start).format('mm')*60;
        var end = moment(this.state.end).format('HH')*3600 + moment(this.state.end).format('mm')*60;
        if(start === end) {
            this.setState({equalRange:true})
            return false;
        }
        if(!this.props.canOverlap){
            var endTime = '';
            var startTime = ''
            this.state.range.map(function(data) {
                endTime = moment(data.end, 'HH:mm').format('HH')*3600 + moment(data.end, 'HH:mm').format('mm')*60;
                startTime = moment(data.start, 'HH:mm').format('HH')*3600 + moment(data.start , 'HH:mm').format('mm')*60;
                if(end < start) {
                    if(this.checkTime(start, 0, startTime, endTime)) {
                        valid = false
                    }
                    if(this.checkTime(0, end, startTime, endTime)) {
                        valid = false
                    }
                }
                else if(endTime < startTime) {
                    if(this.checkTime(start, end, startTime, 0)) {
                        valid = false
                    }
                    if(this.checkTime(start, end, 0, endTime)) {
                        valid = false
                    }
                }
                else {
                    if(this.checkTime(start, end, startTime, endTime)) {
                        valid = false
                    }
                }
            }.bind(this))
            if(!valid) {
                this.setState({invalidOverlap:true})
            }
        }
        
        return valid;
    }

    addTime() {
        var prevState = this.state;
        if(this.state.start && this.state.end && (this.state.range.length < 8)) {
            if(this.checkOpenings()) {
                prevState.range.push({start:moment(this.state.start).format('HH:mm'),end:moment(this.state.end).format('HH:mm')});
                prevState.start = false;
                prevState.end = false;
                this.props.onChange(prevState.range);
            }      
        }  else {
            this.setState({invalidRange:true});
        }
    }

    getTimeData() {
        return this.state.range.map((data,index) => {
            return (<div className="date_range_tags" key={index}>
                        {data.start} - {data.end} 
                        <Icon className='time_picker_remove_icon' type="close" theme="outlined" onClick={this.remove.bind(this,index)} />
                    </div>)
        })
    }

    remove(index) {
        this.state.range.splice(index,1);
        this.state.maxRange = false;
        this.state.invalidOverlap  = false;
        this.state.equalRange  = false;
        this.props.onChange(this.state.range);
    }

    render() {
        // this.state.range = this.props.openings ? this.props.openings : this.state.range
        return(
            <div className={this.props.className}>
                <div className="timepicker_container">
                    <TimePicker 
                        value={this.state.start} 
                        format={format} 
                        onChange={this.onChange.bind(this,'start')}
                        placeholder={'Select time'}/> 
                    <div className="react_time_padding"><span>-</span></div>
                    <TimePicker  
                        value={this.state.end} 
                        format={format} 
                        onChange={this.onChange.bind(this,'end')}
                        placeholder={'Select time'}/>
                    {this.state.invalidOverlap && <span className='invalid'> {this.props.invalidOverlapText ? this.props.invalidOverlapText : 'Time cannot be overlaped'}</span>}
                    {this.state.equalRange && <span className='invalid'>{this.props.equalRangeText ? this.props.equalRangeText : 'Time cannot be equal' }</span>}
                    {/* {this.state.invalidRange && <span className='invalid'>'Select Time</span>} */}
                    {/* {this.props.invalidopenings && (!this.state.maxRange && !this.state.invalidOverlap && !this.state.equalRange && !this.state.invalidRange) && <span className='invalid'>"Select a time range" /></span>} */}
                    <span className="react_time_padding tick margin-left-16" onClick={this.addTime.bind(this)}><Icon type="check" theme="outlined"  /></span>
                </div>
                {this.getTimeData()}
            </div>    
        )
    }
}



export default TimeRangePicker; 