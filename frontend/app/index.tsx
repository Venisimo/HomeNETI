import React from "react";
import Navigate from "../src/navigate";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
export default function Index() {
  return (
    <NavigationIndependentTree>
      <Navigate />
    </NavigationIndependentTree>
  )
}
