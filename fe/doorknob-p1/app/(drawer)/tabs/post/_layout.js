import { Stack } from "expo-router";
import testModal1 from "../../../test/testModal";

export default function Layout(){
    return(
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="index" components={testModal1} options={{presentation:'modal'}}/>
        </Stack>
    )
}