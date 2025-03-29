import { Image, StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants/icons';
import '../app/globals.css';

const SearchBar = () => {

    const [searchText, setSearchText] = useState("");

    return (
        <View className='flex-row gap-1 p-2 rounded-full flex-1 items-center mx-2'>
            <Image defaultSource={icons.search} ></Image>
            <TextInput
                onPress={() => { }}
                style={styles.inputSearch}
                className='flex-1 outline-none h-full px-2 font-viga'
                placeholder='Search'
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="#FFF" />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    inputSearch: {
        color: "#fff",
        borderColor: 'transperant',
        borderWidth: 0,
        marginInline:10
    }
})