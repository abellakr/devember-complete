import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  StretchInX,
  StretchOutX,
} from "react-native-reanimated";

const onboardingSteps = [
  {
    icon: "snowflake",
    title: "Welcome #DEVember",
    description: "Daily React Native tutorials during December",
  },
  {
    icon: "people-arrows",
    title: "Learn and grow together",
    description: "Learn by building 24 projects with React Native and Expo",
  },
  {
    icon: "book-reader",
    title: "Education for Children",
    description:
      'Contribute to the fundraiser "Education for Children" to help Save the Children in their effort of providing education to every child.',
  },
];

const OnboardingScreen = () => {
  const [screenIndex, setScreenIndex] = useState(0);

  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const islastScreen = screenIndex === onboardingSteps.length - 1;
    if (islastScreen) endOnboarding();
    else setScreenIndex(screenIndex + 1);
  };

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) endOnboarding();
    else setScreenIndex(screenIndex - 1);
  };

  const endOnboarding = () => {
    setScreenIndex(0);
    router.back();
  };

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
  );

  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <View style={styles.stepIndicatorContainer}>
        {onboardingSteps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.stepIndicator,
              {
                backgroundColor: index === screenIndex ? "#CEF202" : "gray",
                width: index === screenIndex ? 20 : 10,
              },
            ]}
          />
        ))}
      </View>

      <GestureDetector gesture={swipes}>
        <View style={styles.pageContent} key={screenIndex}>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <FontAwesome5
              style={styles.image}
              name={data.icon}
              size={150}
              color="#CEF202"
            />
          </Animated.View>
          <View style={styles.footer}>
            <Animated.Text
              entering={SlideInRight}
              exiting={SlideOutLeft}
              style={styles.title}
              key={screenIndex}
            >
              {data.title}
            </Animated.Text>
            <Animated.Text
              entering={FadeIn.delay(50)}
              exiting={FadeOut}
              style={styles.description}
            >
              {data.description}
            </Animated.Text>

            <View style={styles.buttonsRow}>
              <Pressable onPress={endOnboarding}>
                <Text style={styles.buttonText}>Skip</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={onContinue}>
                <Text style={styles.buttonText}>
                  {screenIndex === 2 ? "End" : "Continue"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </GestureDetector>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    // alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#15141a",

    padding: 20,
  },
  pageContent: {
    flex: 1,
    padding: 20,
  },
  image: { alignSelf: "center", margin: 20, marginTop: 70 },
  title: {
    color: "#fdfdfd",
    fontSize: 50,
    fontFamily: "InterBlack",
    letterSpacing: 1.3,
    marginVertical: 20,
  },
  description: {
    color: "gray",
    fontSize: 20,
    fontFamily: "Inter",
    lineHeight: 28,
  },
  footer: {
    marginTop: "auto",
  },

  buttonsRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#302e38",
    borderRadius: 50,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: "#fdfdfd",
    fontFamily: "InterSemi",
    fontSize: 16,

    padding: 15,
    paddingHorizontal: 25,
  },

  //steps
  stepIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 15,
  },
  stepIndicator: {
    width: 10,
    height: 10,
    backgroundColor: "gray",
    borderRadius: 50,
  },
});

export default OnboardingScreen;
