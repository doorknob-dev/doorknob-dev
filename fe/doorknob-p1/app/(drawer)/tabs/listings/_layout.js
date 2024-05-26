import { Stack } from "expo-router";
import MainHeader from "../../../components/MainHeader";

export default function Layout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{header: () => <MainHeader/>}}/>
            <Stack.Screen name="addListing" options={{presentation:'modal',headerShown:false}}/>
        </Stack>
    )
}