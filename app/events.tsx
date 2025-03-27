import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/searchBar';

const events = [
    {
        id: 1,
        name: "Sample Event",
        startTime: "2025-04-15T18:00:00",
        endTime: "2025-04-15T20:00:00",
        imageURL: "https://via.placeholder.com/150",
        details: "This is a sample event.",
    },
    {
        id: 2,
        name: "Another Event",
        startTime: "2025-05-01T14:00:00",
        endTime: "2025-05-01T16:00:00",
        imageURL: null,
        details: "Event details go here.",
    },
    {
        id: 2,
        name: "Another Event",
        startTime: "2025-05-01T14:00:00",
        endTime: "2025-05-01T16:00:00",
        imageURL: null,
        details: "Event details go here.",
    },
    {
        id: 2,
        name: "Another Event",
        startTime: "2025-05-01T14:00:00",
        endTime: "2025-05-01T16:00:00",
        imageURL: null,
        details: "Event details go here.",
    },
    {
        id: 2,
        name: "Another Event",
        startTime: "2025-05-01T14:00:00",
        endTime: "2025-05-01T16:00:00",
        imageURL: null,
        details: "Event details go here.",
    },
];

const Events = () => {

    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const showModal = (event: any) => {
        setSelectedEvent(event);
        alert(`Event Selected: ${event.name}`);
    };

    return (
        <View className='flex-1'>
            <View className='flex-row items-center gap-2 bg-black px-3.5 py-3  w-full' >
                <Image source={images.logo} style={styles.logo} className='cursor-pointer'></Image>
                <SearchBar />
                <Image source={icons.filter} className='cursor-pointer'></Image>
            </View>
            <ScrollView className='flex-1 px-4  mt-5'
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    minHeight: "100%"
                }}>
                {events.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => showModal(item)}
                        className="bg-gray-800 p-4 rounded-lg mb-4"
                    >
                        <View className="flex-row">
                            <View className="items-center mr-3">
                                <Image source={images.notFound} style={styles.mainImage} className='rounded-2xl'/>
                            </View>
                            <View className="mt-4">
                                <Text className="text-white text-lg font-bold">{item.name}</Text>
                                <Text className="text-gray-400 text-sm">
                                    {new Date(item.startTime).toLocaleDateString("en-US")} -{" "}
                                    {new Date(item.endTime).toLocaleDateString("en-US")}
                                </Text>
                                <Text className="text-white text-sm">{item.details}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default Events

const styles = StyleSheet.create({
    logo: {
        width: 60,
        height: 60,
    },
    mainImage: {
        width: 120,
        height: 120
    }
})