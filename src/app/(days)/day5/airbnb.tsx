import { View, Text, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Stack } from "expo-router";
import apartments from "@assets/data/day5/apartments.json";
import CustomMarker from "@/components/day5/CustomMarker";
import ApartmentListItem from "@/components/day5/ApartmentListItem";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

const AirbnbScreen = () => {
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // variables
  const snapPoints = useMemo(() => [80, "50%", "90%"], []);

  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        // initialRegion={mapRegion}
        region={mapRegion}
      >
        {apartments.map((apartment) => {
          return (
            <CustomMarker
              key={apartment.id}
              apartment={apartment}
              onPress={() => setSelectedApartment(apartment)}
            />
          );
        })}
      </MapView>

      {selectedApartment && (
        <View>
          <ApartmentListItem
            apartment={selectedApartment}
            containerStyle={{
              position: "absolute",
              bottom:
                typeof snapPoints[0] === "number" ? snapPoints[0] + 10 : 100,
              left: 10,
              right: 10,
            }}
          />
        </View>
      )}

      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        onChange={(index) => console.log("on change: ", index)}
        onAnimate={(from, to) => console.log(`From: ${from} to ${to}`)}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.listTitle}>Over {apartments.length} places</Text>
          <BottomSheetFlatList
            data={apartments}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            renderItem={({ item }) => <ApartmentListItem apartment={item} />}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  listTitle: {
    textAlign: "center",
    fontFamily: "InterSemi",
    fontSize: 16,
    marginVertical: 10,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
  },
});

export default AirbnbScreen;
