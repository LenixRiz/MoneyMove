import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Picker,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TransactionModal = ({ modalType, transaction, onSubmit, onClose }) => {
    const [inputAmount, setInputAmount] = useState('');
    const [inputCategory, setInputCategory] = useState('');
    const [inputDescription, setInputDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const presetCategories = ['Pemasukan', 'Makanan', 'Transportasi', 'Hiburan', 'Kebutuhan', 'Lainnya'];

    // Populate fields if editing
    useEffect(() => {
        if (modalType === 'edit' && transaction) {
            setInputAmount(transaction.amount.toString());
            setInputCategory(transaction.category);
            setInputDescription(transaction.description);
            setSelectedDate(new Date(transaction.date));
        } else {
            resetFields();
        }
    }, [transaction, modalType]);

    const resetFields = () => {
        setInputAmount('');
        setInputCategory('');
        setInputDescription('');
        setSelectedDate(new Date());
    };

    const handleSubmit = () => {
        if (!inputAmount || !inputCategory) {
            alert('Please fill in all fields!');
            return;
        }

        const transactionData = {
            id: transaction?.id || Date.now().toString(),
            amount: parseInt(inputAmount, 10),
            category: inputCategory,
            description: inputDescription || '',
            date: selectedDate.toISOString(),
            type: modalType === 'add' ? 'masuk' : transaction.type, // Default to 'masuk' for new transactions
        };

        onSubmit(transactionData);
    };

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleDateConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    return (
        <Modal animationType="slide" transparent={true}>
            <View style={styles.centeredModal}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>
                        {modalType === 'add' ? 'Add Transaction' : 'Edit Transaction'}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        keyboardType="numeric"
                        value={inputAmount}
                        onChangeText={setInputAmount}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={inputDescription}
                        onChangeText={setInputDescription}
                    />
                    <Picker
                        selectedValue={inputCategory}
                        onValueChange={(itemValue) => setInputCategory(itemValue)}
                        style={styles.picker}
                    >
                        {presetCategories.map((category) => (
                            <Picker.Item key={category} label={category} value={category} />
                        ))}
                    </Picker>

                    <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
                        <Text style={styles.dateText}>
                            {selectedDate.toDateString()}
                        </Text>
                    </TouchableOpacity>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDateConfirm}
                        onCancel={hideDatePicker}
                        date={selectedDate}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 10,
        borderRadius: 5,
    },
    picker: {
        marginVertical: 10,
    },
    dateButton: {
        padding: 10,
        backgroundColor: '#4287f5',
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    dateText: {
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#164863',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginRight: 5,
    },
    buttonCancel: {
        backgroundColor: '#d9534f',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default TransactionModal;
