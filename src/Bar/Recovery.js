import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import Pagination from "./Pagination";

class recoveryBar extends React.Component {
  render() {
    const historyDates = this.props.data;

    let chartData = [];

    const recovered = historyDates[0].recovered;
    for (let key in recovered) {
      chartData.push({
        date: key,
        recovery: recovered[key],
      });
    }

    var dataRecovery = [];
    for (let key in recovered) {
      dataRecovery.push(recovered[key]);
    }

    var date = [];
    for (let key in recovered) {
      date.push(key);
    }

    var newData = [];
    var numbers2 = [];
    var preValue;
    dataRecovery.map(myFunction);

    function myFunction(value0) {
      if (preValue) {
        numbers2.push(value0 - preValue);
      }
      preValue = value0;
    }

    dataRecovery.shift();

    for (let key in dataRecovery) {
      newData.push({
        date: date[key],
        dailyDIFF: numbers2[key],
      });
    }

    return (
      <>
        <div className="row">
          <div className="col-md-8 col-12">
     
            <div className="chartBar">
              <ResponsiveBar
                data={newData}
                keys={["dailyDIFF"]}
                indexBy="date"
                margin={{ top: 0, right: 0, bottom: 48, left: 41 }}
                padding={0.3}
                colors={{ scheme: "category10" }}
                borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 2,
                  tickPadding: 7,
                  tickRotation: -35,
                  legendPosition: "middle",
                  legendOffset: 0,
                }}
                axisLeft={{
                  tickSize: 0,
                  tickPadding: 5,
                  tickRotation: 0,
                  legendPosition: "middle",
                  legendOffset: -40,
                }}
                enableLabel={false}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
              />
            </div>
          </div>
          <div className="col-md-4 col-12">
          <div className='text-center'>   Top 5
           </div>
            <List recovered={this.props.recovered} />
          </div>
        </div>
      </>
    );
  }
}
export default recoveryBar;

class List extends React.Component {
  state = {
    currentCountries: [],
    currentPage: null,
  };

  onPageChanged = (data) => {
    const recoveryData = this.props.recovered.slice(1);
    const { currentPage, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentCountries = recoveryData.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentCountries });
  };
  render() {
    const { currentCountries } = this.state;

    const recoveryData = this.props.recovered;

    const totalCountries = recoveryData.length;

    recoveryData.sort(function (a, b) {
      return b.recovered - a.recovered;
    });

    if (totalCountries === 0) return null;

    return (
      <>
        <div className=" ">
          {currentCountries.map((country) => (
            <CountryCard
              key={country.country}
              country={country.country}
              recovered={country.recovered}
            />
          ))}
          <div className="mx-auto d-block ">
            <Pagination
              totalRecords={totalCountries}
              pageLimit={6}
              pageNeighbours={1}
              onPageChanged={this.onPageChanged}
            />
          </div>
        </div>
      </>
    );
  }
}

const CountryCard = (props) => {
  return (
    <>
      <div className="mapData">
        {props.country}
        <span className=" lvalue">{props.recovered}</span>
      </div>
    </>
  );
};