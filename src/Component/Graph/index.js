import React, { useState, useEffect } from "react";
import CanvasJSReact from "../../canvasjs.react";
import currenciesPastRates from "../../StaticData/currenciesPastData";
import { useGlobalContext } from "../../Context";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Graph = ({ currentCurrency }) => {
  const { currenciesCurrentRate } = useGlobalContext();
  const [graphData, setGraphData] = useState([]);
  const [width, setWidth] = useState(() => {
    if (window.innerWidth > 1000) {
      return 600;
    }

    if (window.innerWidth < 345) {
      return 250;
    }

    if (window.innerWidth < 500) {
      return 300;
    }

    if (window.innerWidth < 650) {
      return 430;
    }

    if (window.innerWidth < 720) {
      return 280;
    }

    if (window.innerWidth < 800) {
      return 320;
    }

    if (window.innerWidth < 900) {
      return 420;
    }

    if (window.innerWidth < 1000) {
      return 500;
    }
  });

  const mergeCurrentsRatesWithPastRates = () => {
    return currenciesPastRates.concat(currenciesCurrentRate);
  };

  const setTheGraphData = (tenYearsCurrenciesRate) => {
    const tenYearsCurrenciesRateModified = tenYearsCurrenciesRate.map(
      (item) => {
        const { date, rates } = item;
        return { date, rates: Object.entries(rates) };
      }
    );

    const currentCurrencyTenYearsRate = tenYearsCurrenciesRateModified.map(
      (item) => {
        const { date, rates } = item;
        const filteredItem = rates.filter((obj) => {
          return obj[0] === currentCurrency;
        });
        return { date, rate: filteredItem };
      }
    );

    const graphTenYearsDataPoints = currentCurrencyTenYearsRate.map(
      (item, index) => {
        const { date, rate } = item;
        const year = date.split("-")[0];
        const month = date.split("-")[1];
        const day = date.split("-")[2];
        const value = 1 / rate[0][1];
        return { x: new Date(year, 1 - month, day), y: value };
      }
    );

    setGraphData(graphTenYearsDataPoints);
  };

  useEffect(() => {
    const tenYearsCurrenciesRate = mergeCurrentsRatesWithPastRates();
    setTheGraphData(tenYearsCurrenciesRate);
  }, [currentCurrency]);

  const changeGraphWidthAccordingToWindowSize = () => {
    if (window.innerWidth > 1000) {
      setWidth(600);
    }

    if (window.innerWidth < 345) {
      setWidth(250);
      return;
    }

    if (window.innerWidth < 500) {
      setWidth(300);
      return;
    }

    if (window.innerWidth < 650) {
      setWidth(430);
      return;
    }

    if (window.innerWidth < 720) {
      setWidth(280);
      return;
    }

    if (window.innerWidth < 800) {
      setWidth(320);
      return;
    }

    if (window.innerWidth < 900) {
      setWidth(420);
      return;
    }

    if (window.innerWidth < 1000) {
      setWidth(500);
      return;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", changeGraphWidthAccordingToWindowSize);

    return () => {
      window.removeEventListener(
        "resize",
        changeGraphWidthAccordingToWindowSize
      );
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
