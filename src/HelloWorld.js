import React from "react";
import { NativeBaseProvider, Box } from "native-base";

export default function HelloWorld() {
  return (
    <NativeBaseProvider>
      <Box>Hello world</Box>
    </NativeBaseProvider>
  );
}