import HomeIcon from '@/assets/images/HomeIcon.svg';
import LuggageIcon from '@/assets/images/LuggageIcon.svg';
import NearByIcon from '@/assets/images/NearByIcon.svg';
import ProfileIcon from '@/assets/images/ProfileIcon.svg';
import { height, width } from '@/components/global';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
export default function TabLayout() {
  const tabs = [
    { name: 'home', title: "Home", icon: HomeIcon },
    { name: 'luggage', title: "Moving Luggage", icon: LuggageIcon },
    { name: 'nearBy', title: "NearBy", icon: NearByIcon },
    { name: 'profile', title: "Profile", icon: ProfileIcon },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false, // Optional: remove if you want titles
        tabBarStyle: {
          height: height * 0.09,
        },
      }}
    >
      {tabs.map((Tab, index) => {
        const Icon = Tab.icon;
        return (
          <Tabs.Screen
            key={index}
            name={Tab.name}
            
            options={{
              title: Tab.title,
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    // padding: 6,
                    // borderRadius: 12, // make it rounded
                    // borderWidth: focused ? 2 : 0,
                    // borderColor: focused ? '#007aff' : 'transparent',
                  }}
                >
                  <Icon
                    width={width * 0.06}
                    height={width * 0.06}
                    // fill={focused ? '#007aff' : '#000'}
                  />
                </View>
              ),
              tabBarLabel: ({ focused }) => (
                <Text className='text-center' style={{ color: focused ? 'green' : '#999', fontSize: width * 0.026 }}>
                  {Tab.title}
                </Text>
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}
