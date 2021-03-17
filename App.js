/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// In App.js in a new project

import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import TodoScreen from './src/screens/Todos'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

// function TodoScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Todos</Text>
//     </View>
//   )
// }

function MapScreen() {
  return (
    <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
    </MapView>
  </View>
  )
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const HomeStack = createStackNavigator();

const HomeTabNav = createMaterialTopTabNavigator()

const HomeTabs = () => (
  <HomeTabNav.Navigator>
    <HomeTabNav.Screen name="Home" component={HomeScreen} />
    <HomeTabNav.Screen name="Map" component={MapScreen} />
  </HomeTabNav.Navigator>
)


const HomeGroup = () => (
  <HomeStack.Navigator initialRouteName="Home">
    <HomeStack.Screen name="Home" component={HomeTabs} />
    <HomeStack.Screen name="Details" component={DetailsScreen} />
  </HomeStack.Navigator>
)

const BottomTab = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeGroup}
      options={{
        // tabBarLabel: 'Main',
        tabBarIcon: ({ focused, color, size }) => {
          return <Ionicons name="home" size={size} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="Todos"
      component={TodoScreen}
      options={{
        tabBarLabel: 'Tasks',
        tabBarIcon: ({ focused, color, size }) => {
          return <Ionicons name="checkmark-circle-outline" size={size} color={color} />;
        },
      }}
    />
    <Tab.Screen name="Settings" component={SettingsScreen}
      options={{
        // tabBarLabel: 'Main',
        tabBarIcon: ({ focused, color, size }) => {
          return <Ionicons name="settings-outline" size={size} color={color} />;
        },
      }} />
  </Tab.Navigator>
)






function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={BottomTab} />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
   // width: 400,
    //justifyContent: 'flex-end',
    //alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

export default App;