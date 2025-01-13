import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Image } from 'react-native';

const Header = ({
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    money,
    showMoney,
    setShowMoney,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Cari"
                    placeholderTextColor="white"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => {
                        const nextType = filterType === 'all' ? 'masuk' : filterType === 'masuk' ? 'keluar' : 'all';
                        setFilterType(nextType);
                    }}
                >
                    <Text style={styles.filterButtonText}>
                        {filterType === 'all' ? 'All' : filterType === 'masuk' ? 'Masuk' : 'Keluar'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.moneyContainer}>
                <Text style={styles.moneyText}>
                    Rp. {showMoney ? money.toLocaleString() + ',-' : '********'}
                </Text>
                <Pressable onPress={() => setShowMoney(!showMoney)} style={styles.toggleButton}>
                    <Image
                        source={showMoney ? require('../assets/view.png') : require('../assets/hide.png')}
                        style={styles.toggleButton}
                    />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#164863',
        padding: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    searchInput: {
        flex: 1,
        padding: 8,
        color: 'white',
        backgroundColor: '#427D9D',
        borderRadius: 8,
        marginRight: 8,
    },
    filterButton: {
        backgroundColor: '#427D9D',
        padding: 8,
        borderRadius: 8,
    },
    filterButtonText: {
        color: 'white',
    },
    moneyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moneyText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    toggleButton: {
        marginLeft: 8,
        height: 20,
        width: 20,
    },
});

export default Header;
