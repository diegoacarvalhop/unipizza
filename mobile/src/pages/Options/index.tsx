import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';
import { Feather } from '@expo/vector-icons';
import { api } from '../../services/api';
import { TableProps } from '../Dashboard';
import Toggle from '../../components/Switch';
import Switch from '../../components/Switch';

export default function Options() {
    const { user, signOut } = useContext(AuthContext);

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [tables, setTables] = useState<TableProps[] | []>([]);
    const [tablesNotification, setTablesNotification] = useState(true);
    const [searchTable, setSearchTable] = useState(true);

    const [toggleIsOn, setToggle] = useState(false);

    setTimeout(async function () {
        setSearchTable(!searchTable);
    }, 50);

    useEffect(() => {
        async function getTablesNotification() {
            const notification = await api.get('/tables/notification');
            setTables(notification.data);

            if (tables.length === 0) {
                setTablesNotification(false);
            } else {
                setTablesNotification(true);
            }
        }

        getTablesNotification();
    }, [searchTable]);

    async function handleLogOut() {
        await signOut();
    }

    function openDashboard() {
        navigation.navigate('Dashboard');
    }

    function openTable() {
        navigation.navigate('Table', { tables: tables });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/uni_pizza_logo.png')}
            />
            <View style={styles.header}>
                <View style={styles.user}>
                    <TouchableOpacity>
                        <Feather name="user" size={28} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.userText}>{user.name}</Text>
                </View>
                <TouchableOpacity
                    onPress={handleLogOut}>
                    <Feather name="log-out" size={28} color="#FF3F4B" />
                </TouchableOpacity>
            </View>
            <View style={styles.containerContent}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={openDashboard}>
                    <Text style={styles.buttonText}>Novo Pedido</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        tablesNotification === true && openTable()
                    }}>
                    <View style={styles.notification}>
                        <Text style={styles.buttonText}>Mesas</Text>
                        {
                            tablesNotification && (
                                <Feather name="bell" size={25} color="#101026" style={{ marginLeft: 18 }} />
                            )
                        }
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}>
                    <Text style={styles.buttonText}>Gerar Conta</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: '45%',
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '29%'
    },

    notification: {
        flexDirection: 'row',
        paddingHorizontal: '5%',
        alignItems: 'center'
    },

    header: {
        paddingTop: 30,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: '5%',
        alignItems: 'center'
    },

    user: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    userText: {
        color: '#FFF',
        fontSize: 28,
        marginLeft: '10%'
    },

    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
    },

    containerContent: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
    },

    button: {
        width: '90%',
        height: 40,
        backgroundColor: '#3FFFA3',
        borderRadius: 10,
        marginVertical: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold'
    }
})