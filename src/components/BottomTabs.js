import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {AddWordScreen} from '../screens/AddWord/AddWordScreen';
import {BottomNavigation, BottomNavigationTab, Icon} from '@ui-kitten/components';
import {accentColor, errorColor, infoColor, successColor} from '../constants';
import {TestScreen} from '../screens/Test/TestScreen';
import {ProfileScreen} from '../screens/Profile/ProfileScreen';
import {MyWordsScreen} from '../screens/MyWords/MyWordsScreen';

const {Navigator, Screen} = createBottomTabNavigator();
const AddWordStack = createStackNavigator();
const TestStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const stackOptions = {
    headerShown: false,
    cardStyleInterpolator: Platform.OS === 'android' && CardStyleInterpolators.forHorizontalIOS,
};

const AddWordStackScreen = () => {
    return (
        <AddWordStack.Navigator
            screenOptions={stackOptions}>
            <AddWordStack.Screen name="AddWord" component={AddWordScreen}/>
        </AddWordStack.Navigator>
    );
};


const TestStackScreen = () => {
    return (
        <TestStack.Navigator
            screenOptions={stackOptions}>
            <AddWordStack.Screen name="Test" component={TestScreen}/>
        </TestStack.Navigator>
    );
};


const ProfileStackScreen = () => {
    return (
        <AddWordStack.Navigator
            screenOptions={stackOptions}>
            <ProfileStack.Screen name="Profile" component={ProfileScreen}/>
            <ProfileStack.Screen name="MyWords" component={MyWordsScreen}/>
        </AddWordStack.Navigator>
    );
};

const AddWordIcon = ({selected, ...props})  => (
    <Icon {...props} fill={selected ? successColor : infoColor} name='at-outline'/>
);

const TestIcon = ({selected, ...props})  => (
    <Icon {...props} fill={infoColor} name='award-outline'/>
);

const ProfileIcon = ({selected, ...props}) => (
    <Icon {...props} fill={infoColor} name='person-outline'/>
);


const BottomTabBar = ({...props}) => {
    console.log(props);
    return <View style={s.tabs}>
        <BottomNavigation
            selectedIndex={props.state.index}
            onSelect={index => {
                props.navigation.navigate(props.state.routeNames[index]);
            }}>
            <BottomNavigationTab icon={AddWordIcon}/>
            <BottomNavigationTab icon={TestIcon}/>
            <BottomNavigationTab icon={ProfileIcon}/>
        </BottomNavigation>
    </View>;
};

export const BottomTabs = ({}) => {
    return (
        <Navigator
                   tabBar={props => <BottomTabBar {...props} />}>
            <Screen name='AddWord'
                    component={AddWordStackScreen}
            />
            <Screen name='Test' component={TestStackScreen}/>
            <Screen name='Profile' component={ProfileStackScreen}/>
        </Navigator>
    );
};

const s = StyleSheet.create({
    tabs: {
        // borderTopColor: errorColor,
        // borderTopWidth: 1,
        // backgroundColor: accentColor
    },
});
