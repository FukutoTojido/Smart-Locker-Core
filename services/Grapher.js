import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import React from "react";

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};

const emptyLineChart = () => {
	return (
		<LineChart
			data={{
				labels: ["0", "1"],
				datasets: [
					{
						data: [0, 3],
					},
				],
			}}
			width={Dimensions.get("window").width - 50} // from react-native
			height={120}
			yAxisSuffix="g.m-3"
			yAxisInterval={4} // optional, defaults to 1
			chartConfig={chartConfig}
			bezier
			style={{
				marginVertical: 8,
				borderRadius: 16,
			}}
		/>
	);
};

const generateLineChart = ( data ) => {
	console.log(data)
	if (data === undefined || data === null || data === {}) {
		return emptyLineChart();
	}
	// get value of each data point
	const _labels = Object.values(data);
	// get timestamp of each data point
	const _data = Object.keys(data);
	return (
		<LineChart
			data={{
				labels: _labels,
				datasets: [
					{
						data: _data,
					},
				],
			}}
			width={Dimensions.get("window").width} // from react-native
			height={120}
			yAxisLabel="$"
			yAxisSuffix="k"
			yAxisInterval={1} // optional, defaults to 1
			chartConfig={chartConfig}
			bezier
			style={{
				marginVertical: 8,
				borderRadius: 16,
			}}
		/>
	);
}

export default {generateLineChart};
