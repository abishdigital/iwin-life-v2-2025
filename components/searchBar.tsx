import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants/icons';

const SearchBar = () => {

    const [searchText, setSearchText] = useState("");

    return (
        <View className='flex-row p-2 rounded-full flex-1 items-center mx-2'>
            <Image source={icons.search} ></Image>
            <TextInput style={{ fontFamily: "Viga-Regular" }}
                onPress={() => { }}
                className='flex-1 outline-none h-full px-2'
                placeholder='Search'
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="#FFF" />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({})