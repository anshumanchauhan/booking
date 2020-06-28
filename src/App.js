import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { AppointmentPicker } from 'react-appointment-picker';
import "react-datepicker/dist/react-datepicker.css";
import './App.css'
export default class App extends Component {
  state = {
    loading: false,
    continuousLoading: false
  };
  
  addAppointmentCallback = ({
    addedAppointment: { day, number, time, id },
    addCb
  }) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(
          `Added appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        addCb(day, number, time, id);
        this.setState({ loading: false });
      }
    );
  };
 
  removeAppointmentCallback = ({ day, number, time, id }, removeCb) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(
          `Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        removeCb(day, number);
        this.setState({ loading: false });
      }
    );
  };
 
  addAppointmentCallbackContinuousCase = ({
    addedAppointment: { day, number, time, id },
    addCb,
    removedAppointment: params,
    removeCb
  }) => {
    this.setState(
      {
        continuousLoading: true
      },
      async () => {
        if (removeCb) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          console.log(
            `Removed appointment ${params.number}, day ${params.day}, time ${params.time}, id ${params.id}`
          );
          removeCb(params.day, params.number);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(
          `Added appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        addCb(day, number, time, id);
        this.setState({ continuousLoading: false });
      }
    );
  };
 
  removeAppointmentCallbackContinuousCase = (
    { day, number, time, id },
    removeCb
  ) => {
    this.setState(
      {
        continuousLoading: true
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(
          `Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        removeCb(day, number);
        this.setState({ continuousLoading: false });
      }
    );
  };
 
  render() {
    const [startDate, setStartDate] = React.useState(new Date( ));
    const [endDate, setEndDate] = React.useState(new Date( ));
    const days = [
      [
        { id: 1, number: 1, isSelected: true, periods: 2 },
        { id: 2, number: 2 },
        null,
        { id: 3, number: '3', isReserved: true },
        { id: 4, number: '4' },
        null,
        { id: 5, number: 5 },
        { id: 6, number: 6 }
      ],
      [
        { id: 7, number: 1, isReserved: true, periods: 3 },
        { id: 8, number: 2, isReserved: true },
        null,
        { id: 9, number: '3', isReserved: true },
        { id: 10, number: '4' },
        null,
        { id: 11, number: 5 },
        { id: 12, number: 6 }
      ],
      [
        { id: 13, number: 1 },
        { id: 14, number: 2 },
        null,
        { id: 15, number: 3, isReserved: true },
        { id: 16, number: '4' },
        null,
        { id: 17, number: 5 },
        { id: 18, number: 6 }
      ],
      [
        { id: 19, number: 1 },
        { id: 20, number: 2 },
        null,
        { id: 21, number: 3 },
        { id: 22, number: '4' },
        null,
        { id: 23, number: 5 },
        { id: 24, number: 6 }
      ],
      [
        { id: 25, number: 1, isReserved: true },
        { id: 26, number: 2 },
        null,
        { id: 27, number: '3', isReserved: true },
        { id: 28, number: '4' },
        null,
        { id: 29, number: 5 },
        { id: 30, number: 6, isReserved: true }
      ]
      
    ];
    const { loading, continuousLoading } = this.state;
    return (
      <div className="App">
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
<div class="header">
  Booking
</div>
<div class="box">
  <section>
          <img src="https://image.shutterstock.com/image-illustration/illustration-international-passengers-infrared-thermal-600w-1640970700.jpg" class="img"/>
          <div class="div1">
            <p>Anshuman Chauhan</p>
            <p>
              <span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
            </p>
            <p><i class="fa font-size">&#xf041;</i> </p>
          </div>
          
  </section>
</div>
<div class="box1">
  <span class="head1">11 November 2019</span>
  <div class="select">
  <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
  </div>
  <div class="head2">Monday</div>
</div>
<div class="box2">
<AppointmentPicker
          addAppointmentCallback={this.addAppointmentCallback}
          removeAppointmentCallback={this.removeAppointmentCallback}
          initialDay={new Date('2018-05-05')}
          days={days}
          maxReservableAppointments={3}
          alpha
          visible
          selectedByDefault
          loading={loading}
        />
</div>
<button class="button">Proceed To Pay</button>
    </div>
     
    );
  }
}