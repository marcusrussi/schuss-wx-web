import React from 'react'
import GenerateFakeData from './FakeDataFactory'

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
  Highlight
} from 'react-vis'

export default function SnowView(props) {
  const fakeData = GenerateFakeData(200)

  const [ lastDrawLocation, setLastDrawLocation ] = React.useState(null);

  console.log(fakeData);

  let bars = [];

  for (let i = 0; i < fakeData.length - 1; i++) {
    bars.push(
      <AreaSeries
        data={
          [fakeData[i], fakeData[i+1]]
        }
      />
    );
  }

  return (
    <XYPlot
      xDomain={
        lastDrawLocation && [
          lastDrawLocation.left,
          lastDrawLocation.right
        ]
      }
      width={750}
      height={300}
      getX={d => d.time}
      getY={d => d.pressure}
      xType="time"
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="Date" />
      <YAxis title="Depth (in)" />
      {bars}
      <Highlight
        enableY={false}
	onBrushEnd={area => setLastDrawLocation(area)}
	onDrag={area => {
	  setLastDrawLocation({
	      bottom: lastDrawLocation.bottom + (area.top - area.bottom),
	      left: lastDrawLocation.left - (area.right - area.left),
	      right: lastDrawLocation.right - (area.right - area.left),
	      top: lastDrawLocation.top + (area.top - area.bottom)
	  })
        }}
      />
    </XYPlot>
  );
}
