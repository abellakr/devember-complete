import { View, Text, Button } from "react-native";
import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

const ProtectedScreen = () => {
  const { signOut } = useAuthenticator();

  return (
    <View>
      <Text style={{ fontFamily: "InterBold", fontSize: 30 }}>
        Protected Screen
      </Text>
      <Text style={{ fontFamily: "InterSemi", fontSize: 20, color: "gray" }}>
        You should only see this page if you are Authenticated{" "}
      </Text>

      <Button title="Sign out" onPress={() => signOut()} />
    </View>
  );
};

export default ProtectedScreen;
