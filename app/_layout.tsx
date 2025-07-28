import { store } from "@/redux/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import "../global.css";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)"  options={{headerShown:false}} />
      </Stack>
    </Provider>
  );
}
