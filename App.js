import { StyleSheet, Text, View, Pressable, TextInput, Modal } from 'react-native'
import React, { useState } from 'react'

const App = () => {
    const [showMoney, setShowMoney] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');

    const handleButtonPress = (type) => {
        setModalType(type);
        setModalVisible(true);
    }

    return (
        <View style={styles.container}>

            <View style={styles.searchBar}>
                <Text style={styles.searchLabel}>Search</Text>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Cari"
                /> 
                {/* <Icon name="search" size={20} color="gray" style={styles.searchIcon} /> */}
            </View>

            <View style={styles.moneyContainer}>
                {showMoney && (<Text>Rp. 2.000.000</Text>)}
                <Pressable onPress={ () => setShowMoney(!showMoney)} style={styles.toggleButton}>
                    <Text>{showMoney? 'Hide' : 'Show'}</Text>
                    {/* <Icon name="eye" size={20} color="white" /> */}
                </Pressable>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.centeredModal}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>{modalType === 'masuk' ? 'Uang Masuk' : 'Uang Keluar'}</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder={modalType === 'masuk' ? 'Jumlah Uang Masuk' : 'Jumlah Uang Keluar'}
                            keyboardType="numeric"
                        />
                        <View style={styles.modalButtonContainer}>
                            <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalButtonText}>Batal</Text>
                            </Pressable>
                            <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalButtonText}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => handleButtonPress('masuk')}>
                    {/* <Icon name="arrow-left" size={20} color="gray" style={styles.buttonIcon} /> */}
                    <Text style={styles.buttonText}>Uang Masuk</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => handleButtonPress('keluar')}>
                    <Text style={styles.buttonText}>Uang Keluar</Text>
                    {/* <Icon name="arrow-up" size={20} color="gray" style={styles.buttonIcon} /> */}
                </Pressable>
            </View>

        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#263d5c',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },

    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    searchLabel: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        padding: 8,
    },
    searchIcon: {
        marginLeft: 8,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#3e526b',
        borderRadius: 8,
        marginHorizontal: 9
    },
    buttonText: {
        marginLeft: 8,
    },
    buttonIcon: {

    },

    moneyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    toggleButton: {
        padding: 8,
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset:{
            width: 0,
            height: 2,  
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    
    centeredModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalTitle: {
        marginBotton: 15,
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalInput: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        width: 280,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    modalButton: {
        paddingVertical: 8,
        backgroundColor: '#263d5c',
        marginHorizontal: 9,
        borderRadius: 8,
        width: 120,
    },
    modalButtonText: {
        color: 'white',
        textAlign: 'center',
    },

});