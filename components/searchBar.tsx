import { Image, StyleSheet, TextInput, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants/icons';
import '../app/globals.css';

const SearchBar = () => {

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const [searchText, setSearchText] = useState("");

    return (
        <View className='flex-row gap-1 p-2 flex-1 items-center mx-2 border-2 rounded-xl border-transparent shadow-cardBoxShadow'>
            <Image defaultSource={icons.search} ></Image>
            <TextInput
                onPress={() => { }}
                className={`flex-1 outline-none h-full px-2 font-viga ${isDarkMode ? 'text-white' : 'text-black'}`}
                placeholder='Search'
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor={isDarkMode ? "#FFF" : "rgba(149, 148, 148, 1)"} />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
})