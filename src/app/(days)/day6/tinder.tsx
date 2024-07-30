import { Button, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import TinderCard from "@/components/day6/TinderCard";
import { Stack } from "expo-router";
import {
  useAnimatedReaction,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";

const dummyUsers = [
  {
    id: 1,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg",
    name: "Dani",
  },
  {
    id: 2,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/2.jpg",
    name: "Jon",
  },
  {
    id: 3,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/3.jpg",
    name: "Dani",
  },
  {
    id: 4,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/4.jpeg",
    name: "Alice",
  },
  {
    id: 5,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/5.jpg",
    name: "Dani",
  },
  {
    id: 6,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/6.jpg",
    name: "Kelsey",
  },
];

const TinderScreen = () => {
  const [users, setUsers] = useState(dummyUsers);
  const activeIndex = useSharedValue(0);
  const [index, setIndex] = useState(0);

  useAnimatedReaction(
    () => activeIndex.value,
    (value) => {
      if (Math.floor(value) !== index) {
        runOnJS(setIndex)(Math.floor(value));
      }
    }
  );

  useEffect(() => {
    if (index > dummyUsers.length - 2) {
      // console.warn("last 2 remaining fetch more");
      setUsers((users) => [...users, ...dummyUsers.reverse()]);
    }
  }, [index]);

  const onResponse = (res: boolean) => {
    console.log("On Response: ", res);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={{ top: 70, position: "absolute" }}>
        Current index: {index}
      </Text>
      {users.map((user, index) => (
        <TinderCard
          key={`${user.id}-${index}`}
          user={user}
          numOfCards={dummyUsers.length}
          index={index}
          activeIndex={activeIndex}
          onResponse={onResponse}
        />
      ))}
    </View>
  );
};

export default TinderScreen;
