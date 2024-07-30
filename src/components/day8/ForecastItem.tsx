import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { WeatherForecast } from "@/app/(days)/day8/weather";
import dayjs from "dayjs";
import { BlurView } from "expo-blur";

const ForecastItem = ({ forecast }: { forecast: WeatherForecast }) => {
  return (
    <BlurView intensity={50} style={styles.container}>
      <Text style={styles.temp}>{Math.round(forecast.main.temp)}°</Text>
      <Text style={styles.date}>
        {dayjs(forecast.dt * 1000).format("ddd ha")}
      </Text>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "ghostwhite",
    padding: 10,
    aspectRatio: 3 / 4,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderColor: "gainsboro",
    borderWidth: StyleSheet.hairlineWidth,
  },
  temp: {
    fontFamily: "InterBlack",
    fontSize: 35,
    color: "white",
    marginVertical: 10,
  },
  date: {
    fontFamily: "Inter",
    color: "ghostwhite",
    fontSize: 16,
  },
});

export default ForecastItem;
