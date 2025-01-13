import React from 'react';
import { FlatList, View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
    const renderTransaction = ({ item, index }) => (
        <View style={styles.transactionItem}>
            <View style={styles.iconContainer}>
                <Image
                    source={
                        item.type === 'masuk'
                            ? require('../assets/arrowout.png')
                            : require('../assets/arrowin.png')
                    }
                    style={styles.icon}
                />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={[styles.type, item.type === 'masuk' ? styles.income : styles.expense]}>
                    {item.type === 'masuk' ? 'Uang Masuk' : 'Uang Keluar'}
                </Text>
                <Text>Rp. {item.amount.toLocaleString() + ',-'}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.date}>
                    {format(new Date(item.date), 'dd MMMM yyyy', { locale: id })}
                </Text>
                <Text style={styles.category}>{item.category}</Text>
            </View>
            <View style={styles.actionContainer}>
                <Pressable onPress={() => onEdit(index)}>
                    <Image source={require('../assets/pen.png')} style={styles.icon} />
                </Pressable>
                <Pressable onPress={() => onDelete(index)}>
                    <Image source={require('../assets/delete.png')} style={styles.icon} />
                </Pressable>
            </View>
        </View>
    );

    return <FlatList data={transactions} renderItem={renderTransaction} keyExtractor={(item) => item.id} />;
};

const styles = StyleSheet.create({
    transactionItem: {
        flexDirection: 'row',
        padding: 12,
        marginBottom: 8,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    iconContainer: {
        marginRight: 8,
    },
    icon: {
        height: 24,
        width: 24,
    },
    detailsContainer: {
        flex: 1,
    },
    type: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    income: {
        color: 'green',
    },
    expense: {
        color: 'red',
    },
    description: {
        fontStyle: 'italic',
    },
    date: {
        fontSize: 12,
        color: 'gray',
    },
    category: {
        fontSize: 12,
        color: 'gray',
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default TransactionList;
