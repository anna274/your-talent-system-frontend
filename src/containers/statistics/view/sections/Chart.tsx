import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5exporting from '@amcharts/amcharts5/plugins/exporting';
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark';

interface IProps {
  data: string;
  label: string;
}

export const Chart: React.FC<IProps> = ({ data, label }) => {
  useLayoutEffect(() => {
    const parsedData = JSON.parse(data);
    let root = am5.Root.new('chartdiv');

    root.setThemes([am5themes_Dark.new(root)]);

    let exporting = am5exporting.Exporting.new(root, {
      menu: am5exporting.ExportingMenu.new(root, {}),
      dataSource: parsedData,
      filePrefix: label.replace(' ', '_'),
    });

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
        wheelX: 'panX',
        wheelY: 'zoomX',
      }),
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
        }),
        categoryField: 'technology',
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    xAxis.data.setAll(parsedData);

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    );

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: '3 уровень',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'senior',
        categoryXField: 'technology',
        tooltip: am5.Tooltip.new(root, {}),
        // legendLabelText: "[{stroke}]{name}[/]: [bold #888]{categoryX}[/]",
        // legendRangeLabelText: "[{stroke}]{name}[/]",
        // legendValueText: "[bold {stroke}]{valueY}[/]",
        // legendRangeValueText: "[{stroke}]{valueYClose}[/]",
      }),
    );
    series1.columns.template.setAll({
      tooltipText: '{name}, {categoryX}: {valueY}',
      width: am5.percent(90),
      tooltipY: 0,
    });
    series1.data.setAll(parsedData);

    let series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: '2 уровень',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'middle',
        categoryXField: 'technology',
        tooltip: am5.Tooltip.new(root, {}),
        // legendLabelText: "[{stroke}]{name}[/]: [bold #888]{categoryX}[/]",
        // legendRangeLabelText: "[{stroke}]{name}[/]",
        // legendValueText: "[bold {stroke}]{valueY}[/]",
        // legendRangeValueText: "[{stroke}]{valueYClose}[/]",
      }),
    );
    series2.columns.template.setAll({
      tooltipText: '{name}, {categoryX}: {valueY}',
      width: am5.percent(90),
      tooltipY: 0,
    });
    series2.data.setAll(parsedData);

    let series3 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: '1 уровень',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'junior',
        categoryXField: 'technology',
        tooltip: am5.Tooltip.new(root, {}),
        // legendLabelText: "[{stroke}]{name}[/]: [bold #888]{categoryX}[/]",
        // legendRangeLabelText: "[{stroke}]{name}[/]",
        // legendValueText: "[bold {stroke}]{valueY}[/]",
        // legendRangeValueText: "[{stroke}]{valueYClose}[/]",
      }),
    );
    series3.columns.template.setAll({
      tooltipText: '{name}, {categoryX}: {valueY}',
      width: am5.percent(90),
      tooltipY: 0,
    });
    series3.data.setAll(parsedData);

    // // Add legend
    // let legend = chart.children.push(am5.Legend.new(root, {}));
    // legend.data.setAll(chart.series.values);

    // // Add cursor
    // chart.set("cursor", am5xy.XYCursor.new(root, {}));

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: '100%', height: '500px', marginTop: '20px' }}></div>;
};
