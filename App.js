import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import ItemLister from './components/ListItem';
import Input from './components/Input';

export default function App() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, {
      id: Date.now().toString(),
      text: item,
      isCompleted: true
    }]);

  };

  const toggleItemStatus = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.searchBarContainer}>
          <TextInput 
            style={styles.searchBar}
            placeholder="Search"
            onChangeText={setSearchText} 
            value={searchText}
          />
        </View>
        <View style={styles.summary}>
          <Text>
            Rp. 2.000.000
          </Text>
          <Text>
            See
          </Text>
        </View>
        <View>
          <Pressable>
            <Text>
              Uang Masuk
            </Text>
          </Pressable>
          <Pressable>
            <Text>
              Uang Keluar
            </Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={items}
        renderItem={({ data }) => (
          <ItemLister
            Item={data}
            toggleItemStatus={toggleItemStatus}
            deleteItem={deleteItem}
          />
        )}
        keyExtractor={data => data.id}
      />
      <Input addItem={addItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  upperContainer: {
    flex: 1,
    padding: 5,
    backgroundColor: '#164863',
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarContainer: {
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
});