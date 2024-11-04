import React from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function ListItem({ input }) {
    return (
        <View style={styles.container}>
            <View style={styles.listItem}>
                <Text style={styles.judul}>
                    Uang Masuk
                </Text>
                <Text style={styles.jumlah}>
                    {input.jumlah}
                </Text>
                <Text style={styles.tanggal}>
                    {input.jumlah}
                </Text>
                <Pressable style={styles.button} onPress={() => toogleItemStatus(item.id)}>
                    <Ionicons name="chevron-back-outline" size={24} color="#6C757D" />
                </Pressable>
                <Pressable style={styles.button} onPress={() => deleteTask(item.id)}>
                    <Ionicons name="trash-outline" size={24} color="#6C757D" />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    judul: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    jumlah: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    tanggal: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        backgroundColor: '#FF9D3D',
        padding: 10,
        borderRadius: 5,
    },
});