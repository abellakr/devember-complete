import { View } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const AnimatedSplashscreen = ({
  onAnimatedFinish = (isCancelled) => {},
}: {
  onAnimatedFinish?: (isCancelled: boolean) => void;
}) => {
  const animation = useRef<LottieView>(null);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <AnimatedLottieView
        exiting={ZoomOut}
        ref={animation}
        onAnimationFinish={onAnimatedFinish}
        loop={false}
        autoPlay
        style={{
          width: "80%",
          maxWidth: 400,
          // backgroundColor: "#eee",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("@assets/lottie/netflix.json")}
      />
    </View>
  );
};

export default AnimatedSplashscreen;
