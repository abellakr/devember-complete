import { View, Text } from "react-native";
import React from "react";
import { Marker, MarkerPressEvent } from "react-native-maps";

export type Apartment = {
  latitude: number;
  longitude: number;
  title: string;
  rating: number;
  price: number;
};

const CustomMarker = ({
  apartment,
  onPress,
}: {
  apartment: Apartment;
  onPress: (event: MarkerPressEvent) => Apartment;
}) => {
  return (
    <Marker
      onPress={onPress}
      coordinate={{
        latitude: apartment.latitude,
        longitude: apartment.longitude,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 5,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 20,
        }}
      >
        <Text style={{ fontFamily: "InterBold" }}>$ {apartment.price}</Text>
      </View>
    </Marker>
  );
};

export default CustomMarker;
