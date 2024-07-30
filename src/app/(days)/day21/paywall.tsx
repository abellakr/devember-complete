import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Purchases, {
  PurchasesOffering,
  PurchasesPackage,
} from "react-native-purchases";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Package = ({ item }: { item: PurchasesPackage | any }) => {
  const onPressed = async () => {
    try {
      const purchaseMade = await Purchases.purchasePackage(item);
      if (
        typeof purchaseMade.customerInfo.entitlements.active["Premium"] !==
        undefined
      ) {
        Alert.alert("you purchased premium goofy");
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        Alert.alert("Purchase cancelled");
      }
    }
  };

  return (
    <Pressable onPress={onPressed} style={styles.package}>
      <Text style={styles.packageDuration}>
        {item.packageType === "ANNUAL" ? "Yearly" : ""}
        {item.packageType === "MONTHLY" ? "Monthtly" : ""}
      </Text>
      <Text style={styles.packagePrice}>{item.product.priceString}</Text>
    </Pressable>
  );
};

const Paywall = () => {
  const [offering, setOffering] = useState<PurchasesOffering | null>();

  const fetchOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      console.log(JSON.stringify(offerings.current, null, 2));

      if (offerings.current !== null) {
        //display current offering
        setOffering(offerings.current);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchOfferings();
  }, []);

  //   if (!offering) {
  //     return <Text>Failed to fetch the offering</Text>;
  //   }

  const monthly = {
    packageType: "MONTHLY",
    product: { priceString: "$8.99", subscriptionPeriod: "P1M" },
  };
  const yearly = {
    packageType: "ANNUAL",
    product: { priceString: "$22.99", subscriptionPeriod: "P1Y" },
  };

  return (
    <View style={styles.page}>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Unlock PRO Access</Text>
        <Text style={styles.subTitle}>All premium features</Text>

        <View style={styles.packages}>
          {/* {offering?.availablePackages.map((item) => (
            <Package key={item.identifier} item={item} />
          ))} */}
          <Package item={monthly} />
          <Package item={yearly} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#EF4951",
    flex: 1,
  },
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginVertical: 30,
  },
  subTitle: {
    fontSize: 16,
    color: "gainsboro",
  },
  packages: { flexDirection: "row", gap: 10, marginTop: 50 },
  package: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  packageDuration: {},
  packagePrice: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Paywall;
