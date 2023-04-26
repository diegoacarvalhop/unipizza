import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';
import FinishOrder from '../pages/FinishOrder';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export type StackParamsList = {
  Dashboard: undefined;
  Order: {
    table: string | undefined;
    order_id: string;
  };
  FinishOrder: {
    table: string | undefined;
    order_id: string
  }
}

const Stack = createNativeStackNavigator<StackParamsList>();

export default function AppRoutes() {

  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="FinishOrder"
        component={FinishOrder}
        options={{
          title: 'Finalizando',
          headerTitleStyle: {
            fontSize: 25,
            color: '#FFF'
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#1D1D2E'
          },
          headerLeft: () => (
            <Feather
              name='arrow-left'
              size={35}
              onPress={() => navigation.goBack()}
              title="Voltar"
              color="#FF3F4B"
            />
          ),
        }} />
    </Stack.Navigator>
  )
}