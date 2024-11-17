import { StyleSheet, Text, View, Pressable, TextInput, Modal, FlatList, Alert } from 'react-native';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const App = () => {
    const [showMoney, setShowMoney] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');
    const [inputAmount, setInputAmount] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [money, setMoney] = useState(0);
    const [editIndex, setEditIndex] = useState(-1);
    const [editAmount, setEditAmount] = useState('');

    const handleButtonPress = (type) => {
        setModalType(type);
        setModalVisible(true);
        setInputAmount('');
    };

    const handleSubmit = () => {
        if (inputAmount) {
            const amount = parseInt(inputAmount);
            const newMoney = modalType === 'masuk' ? money + amount : money - amount
            setMoney(newMoney);
            
            setTransactions([
                ...transactions,
                {
                    type: modalType,
                    amount: amount,
                    date: new Date()
                }
            ]);
            setModalVisible(false);
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditAmount(transactions[index].amount.toString());
        setModalVisible(true);
        setModalType(transactions[index].type);
        setInputAmount(transactions[index].amount.toString())
    }

    const handleSubmitEdit = () => {
        if (!inputAmount) return;
    
        const newAmount = parseInt(inputAmount, 10);
    
      
        setTransactions(prevTransactions => {
            const updatedTransactions = [...prevTransactions];
    
            const oldItem = updatedTransactions[editIndex];
    
            let updatedMoney = money;
            if (oldItem.type === 'masuk') {
                updatedMoney -= oldItem.amount;
            } else {
                updatedMoney += oldItem.amount;
            }
            if (modalType === 'masuk') {
                updatedMoney += newAmount;
            } else {
                updatedMoney -= newAmount;
            }
            setMoney(updatedMoney);
    
    
            updatedTransactions[editIndex] = { ...oldItem, amount: newAmount };
            return updatedTransactions;
    
        });
    
    
        setEditIndex(-1);
        setModalVisible(false);
        setInputAmount('');
    };

    const handleDelete = (index) => {
        Alert.alert(
            'Confirm Delete',
            'Apakah anda yakin untuk menghapus transaksi ini?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setTransactions(prevTransactions => {  // Functional form of setState!
                            const updatedTransactions = [...prevTransactions];
                            const deletedItem = updatedTransactions.splice(index, 1)[0];

                            // Recalculate money
                            const updatedMoney = deletedItem.type === 'masuk' ? money - deletedItem.amount : money + deletedItem.amount;

                            setMoney(updatedMoney);
                            return updatedTransactions; // Return updated array
                        });
                    }
                }
            ]
        )
    }

    const renderTransaction = ({ item, index }) => (
        <>
        <View style={styles.transactionItem}>
            <Text style={styles.transactionType}>{item.type === 'masuk' ? 'Uang Masuk' : 'Uang Keluar'}</Text>
            <Text style={styles.transactionAmount}>Rp. {item.amount.toLocaleString()}</Text>
            <Text style={styles.transactionDate}>{format(item.date, 'dd MMMM yyyy', { locale: id })}</Text>
        </View>
        <View style={styles.transactionButton}> 
            <Pressable onPress={() => handleEdit(index)}>
                <Text>Edit</Text>
            </Pressable>
            <Pressable onPress={() => handleDelete(index)}>
                <Text>Delete</Text>
            </Pressable>
        </View>
        </>
    )
;
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
                <Text style={styles.moneyText}>Rp. {showMoney ? money.toLocaleString() + ',-' : '********'}</Text>
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
                            value={inputAmount}
                            onChangeText={setInputAmount}
                        />
                        <View style={styles.modalButtonContainer}>
                            <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalButtonText}>Batal</Text>
                            </Pressable>
                            <Pressable style={styles.modalButton} onPress={editIndex === -1 ? handleSubmit : handleSubmitEdit}>
                                <Text style={styles.modalButtonText}>{editIndex === -1 ? 'Submit' : 'Simpan'}</Text>
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

            <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={(item, index) => index.toString()}
                style={styles.transactionList}
            />


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


    transactionList: {
        marginTop: 20,
        width: '100%',
    },
    transactionItem: {
        flexDirection: 'column',
        justifiyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    transactionType: {},
    transactionAmount: {},
    transactionDate: {},

    moneyText: {
        fontSize: 20,
    },
});