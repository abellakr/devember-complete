import { View, StyleSheet, Text, Pressable } from "react-native";
import { Link } from "expo-router";

import React from "react";

type DayListItem = {
  day: number;
};

const DayListItem = ({ day }: DayListItem) => {
  return (
    <Link href={`/day${day}`} asChild>
      <Pressable style={styles.box}>
        <Text style={styles.text}>{day}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    gap: 10,
    padding: 10,
  },

  column: {
    gap: 10,
  },

  box: {
    backgroundColor: "#f9ede3",
    flex: 1,
    aspectRatio: 1,

    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#9b4521",
    borderRadius: 20,

    justifyContent: "center", //align on main axis
    alignItems: "center", //allign on cross axis
  },

  text: {
    color: "#9b4521",
    fontSize: 70,
    fontFamily: "AmaticBold",
  },
});

export default DayListItem;
