import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { AVPlaybackSource, AVPlaybackStatus, Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Memo } from "@/app/(days)/day7/memos";

const MemoListItem = ({ memo }: { memo: Memo }) => {
  const [sound, setSound] = useState<Sound>();
  const [status, setStatus] = useState<AVPlaybackStatus>();

  async function loadSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      { uri: memo.uri },
      { progressUpdateIntervalMillis: 1000 / 60 },
      onPlaybackStatusUpdate
    );
    setSound(sound);

    sound.setOnAudioSampleReceived((sample) =>
      console.log(JSON.stringify(sample, null, 2))
    );
  }

  useEffect(() => {
    loadSound();
  }, [memo]);

  useEffect(() => {
    if (status?.isLoaded && sound && status.didJustFinish) {
      sound?.setPositionAsync(0);
    }
  }, [status, sound]);

  async function onPlaybackStatusUpdate(status: AVPlaybackStatus) {
    setStatus(status);
  }

  async function playSound() {
    if (!sound) {
      return;
    }

    if (status?.isLoaded && status.isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const formatMillis = (millis: number) => {
    const minutes = Math.floor(millis / (1000 * 60));
    const seconds = Math.floor((millis % (1000 * 60)) / 1000);

    return `${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
  };

  const isPlaying = status?.isLoaded ? status.isPlaying : false;
  const position = status?.isLoaded ? status.positionMillis : 0;
  const duration = status?.isLoaded ? status.durationMillis : 1;

  const progress = position / duration;

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    left: `${progress * 100}%`,
  }));

  console.log(memo);

  //   const lines = memo.metering.slice(0, 10);
  let lines = [];
  let numLines = 50;

  for (let i = 0; i < numLines; i++) {
    const meteringIndex = Math.floor((i * memo.metering.length) / numLines);
    const nextMeteringIndex = Math.ceil(
      ((i + 1) * memo.metering.length) / numLines
    );
    const values = memo.metering.slice(meteringIndex, nextMeteringIndex);
    const average = values.reduce((sum, a) => sum + a, 0) / values.length;
    // lines.push(memo.metering[meteringIndex]);
    lines.push(average.valueOf());
  }

  memo.metering.forEach((db, index) => {});

  return (
    <View style={styles.container}>
      <FontAwesome5
        onPress={playSound}
        name={isPlaying ? "pause" : "play"}
        size={20}
        color={"gray"}
      />

      <View style={styles.playbackContainer}>
        {/* <View style={styles.playbackBackground} /> */}

        <View style={styles.wave}>
          {lines.map((db, index) => (
            <View
              style={[
                styles.waveLine,
                {
                  height: interpolate(db, [-60, 0], [5, 50], Extrapolate.CLAMP),
                  backgroundColor:
                    progress > index / lines.length ? "royalblue" : "gainsboro",
                },
              ]}
            />
          ))}
        </View>

        {/* <Animated.View
          style={[styles.playbackIndicator, animatedIndicatorStyle]}
        /> */}

        <Text
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            color: "gray",
            fontFamily: "Inter",
            fontSize: 12,
          }}
        >
          {/* {duration}; */}
          {formatMillis(position || 0)} / {formatMillis(duration || 0)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 15,

    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  playbackContainer: {
    flex: 1,
    height: 80,
    justifyContent: "center",
  },
  playbackBackground: {
    height: 3,
    backgroundColor: "gainsboro",
    borderRadius: 5,
  },
  playbackIndicator: {
    width: 10,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: "royalblue",
    position: "absolute",
  },

  wave: { flexDirection: "row", gap: 3, alignItems: "center" },
  waveLine: {
    flex: 1,
    height: 30,
    backgroundColor: "gainsboro",
    borderRadius: 20,
  },
});

export default MemoListItem;
