import React from 'react';
import {
  BarChartLine,
  Film,
  People,
  Tv
} from "react-bootstrap-icons";

export default function Statistics() {
  const statisticsList = [
    {
      "icon": Film,
      "number": 20,
      "text": "Movies",
    },
    {
      "icon": Tv,
      "number": 29,
      "text": "Tv Shows",
    },
    {
      "icon": People,
      "number": 989,
      "text": "Users",
    },
    {
      "icon": BarChartLine,
      "number": 129,
      "text": "Views",
    },
  ]
  return (
    <div className='d-flex w-100 container justify-content-around mt-3 col-6 col-sm-4 col-md-3'>
      {statisticsList.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div key={index} className='py-2 rounded-4' style={{width:"170px",borderTop:"1px solid #3dd2cdc5",borderBottom:"1px solid #3dd2cdc5",borderLeft:"1px solid white",borderRight:"1px solid white"}}>
            <div className='d-flex align-items-center justify-content-center'>
              <IconComponent className=" fs-3 color me-3" />
              <span className='sec-color fs-2 font'>{item.number}</span>
            </div>
            <em className='sec-color font text-center fs-5 d-block'>{item.text}</em>
          </div>
        )
      })}
    </div>
  )
}
