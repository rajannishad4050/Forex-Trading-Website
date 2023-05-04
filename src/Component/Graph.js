import React, { useState, useEffect } from "react";
import CanvasJSReact from "../canvasjs.react";
import { HistoricalDataCollection } from "../HistoricalDataCollection";
import { useGlobalContext } from "../Context";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Graph = ({ currentCurrency }) => {
  const { todayCurrenciesRate } = useGlobalContext();
  const [historicalData, setHistoricalData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  // const [graphLoading, setGraphLoading] = useState(true);
  const [width, setWidth] = useState(600);

  const fetchingHistoricalData = async (date) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "currencyscoop.p.rapidapi.com",
        "X-RapidAPI-Key": "bf300f87abmsh24011b6bb15af02p18b479jsn2542ba30b834",
      },
    };

    const historicalData = HistoricalDataCollection();
    // merging currentdateData and historical data
    const newData = historicalData.concat(todayCurrenciesRate);
    setHistoricalData(newData);
  };

  const settingGraphData = () => {
    //converting the rate object in historical data array into an array
    const convertedData = historicalData.map((item) => {
      const { date, rates } = item;
      return { date, rates: Object.entries(rates) };
    });

    // creating an array in which there is only current currency rate
    const filteredCurrentCurrencyArray = convertedData.map((item) => {
      const { date, rates } = item;
      const filteredItem = rates.filter((obj) => {
        return obj[0] == currentCurrency;
      });
      return { date, rate: filteredItem };
    });

    // modifing data so it become usable to use in graph datapoints
    const modifiedData = filteredCurrentCurrencyArray.map((item, index) => {
      const { date, rate } = item;
      const year = date.split("-")[0];
      const month = date.split("-")[1];
      const day = date.split("-")[2];
      const value = 1 / rate[0][1];
      return { x: new Date(year, 1 - month, day), y: value };
    });

    setGraphData(modifiedData);
  };

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setWidth(500);
    }

    if (window.innerWidth < 900) {
      setWidth(420);
    }

    if (window.innerWidth < 800) {
      setWidth(320);
    }

    if (window.innerWidth < 720) {
      setWidth(280);
    }

    if (window.innerWidth < 650) {
      setWidth(430);
    }

    if (window.innerWidth < 500) {
      setWidth(300);
    }

    if (window.innerWidth < 345) {
      setWidth(250);
    }
  }, []);

  useEffect(() => {
    fetchingHistoricalData("2022-06-01");
  }, []);

  useEffect(() => {
    if (historicalData.length > 0) {
      settingGraphData();
      // setGraphLoading(false);
    }
  }, [currentCurrency, historicalData]);

  const resetTheWidthOfChart = () => {
    if (window.innerWidth > 1000) {
      setWidth(600);
    }

    if (window.innerWidth < 1000) {
      setWidth(500);
    }

    if (window.innerWidth < 900) {
      setWidth(420);
    }

    if (window.innerWidth < 800) {
      setWidth(320);
    }

    if (window.innerWidth < 720) {
      setWidth(280);
    }

    if (window.innerWidth < 650) {
      setWidth(430);
    }

    if (window.innerWidth < 500) {
      setWidth(300);
    }

    if (window.innerWidth < 345) {
      setWidth(250);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resetTheWidthOfChart);

    return () => {
      window.removeEventListener("resize", resetTheWidthOfChart);
    };
  }, []);

  const options = {
    width,
    theme: "light2", // "light1", "dark1", "dark2"
    backgroundColor: null,
    axisY: {
      valueFormatString: " ",
      yValueFormatString: "₹####.00",
      includeZero: false,
      gridThickness: 0,
      tickLength: 0,
    },
    axisX: {
      valueFormatString: " ",
      tickLength: 0,
      crosshair: {
        enabled: true,
        lineDashType: "solid",
        thickness: 2,
      },
    },
    toolTip: {
      enabled: true,
      content:
        "<span style='\"'color: black;'\"'>{x}</span>: <span style='\"'color: #21CE99;'\"'>{y}</span>",
    },
    data: [
      {
        type: "spline",
        markerType: "none",
        lineColor: "#21CE99",
        yValueFormatString: "₹####.00",
        dataPoints: graphData,
      },
    ],
  };

  // if (graphLoading) {
  //   return <div className="graph-skeleton"></div>;
  // }

  return (
    <>
      <CanvasJSChart
        className="graph"
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
    </>
  );
};
export default Graph;
