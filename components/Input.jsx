import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Pressable, Text } from 'react-native';

export default function Input({ addItem }) {
    const [item, setItem] = useState('');

    const handleAddItem = () => {
        if (item.trim()) {
            addItem(item);
            setItem('');
        }
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Add new task"
                placeholderTextColor="#fff"
                value={jumlah}
                onChangeText={setItem}
            />
            <Pressable style={styles.button} onPress={handleAddItem}>
                <Text style={styles.buttonText}>ADD</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        backgroundColor: '#FFBD73',
        color: '#fff',
        fontWeight: 'bold',
        borderColor: '#777777',
        borderWidth: 1,
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#FF9D3D',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});