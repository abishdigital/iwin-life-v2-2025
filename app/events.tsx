import { ActivityIndicator, FlatList, Image, StyleSheet, Text, Pressable, useWindowDimensions, View, useColorScheme } from 'react-native';
import React, { useState, useEffect, Fragment } from 'react';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/searchBar';
import { useFetchEvents } from '@/hooks/useFetchEvents';
import EventModal from '@/components/eventModal';
import { DarkTheme } from '@react-navigation/native';

const Events = () => {

    const { width } = useWindowDimensions();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const dynamicStyles = {
        mainImage: {
            width: width > 768 ? 130 : 110,
            height: width > 768 ? 100 : 80,
        },
        titleText: {
            fontSize: width > 768 ? 25 : 21,
        },
        dateText: {
            fontSize: width > 768 ? 20 : 18,
        },
        descriptionText: {
            fontSize: width > 768 ? 18 : 16,
        },
    }

    const [pageCount, setPageCount] = useState<number>(1);
    const [limitCount] = useState<number>(10);
    const [allEvents, setAllEvents] = useState<any[]>([]);
    const { getEvents, events, loading, error } = useFetchEvents();
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const day = (dateString: string) => {
        const date = new Date(dateString);
        return date.getDate().toString().padStart(2, '0');
    };

    const month = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    };

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
    };

    useEffect(() => {
        getEvents({ pageCount, limitCount });
    }, [pageCount]);

    useEffect(() => {
        if (events.length > 0) {
            setAllEvents(prevEvents => [...prevEvents, ...events]);
        }
    }, [events]);

    const loadMoreEvents = () => {
        if (!loading) {
            setPageCount(prevPage => prevPage + 1);
        }
    };

    const openModal = (event: any) => {
        setSelectedEvent(event);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedEvent(null);
        setModalVisible(false);
    };

    return (
        <Fragment>
            <View className={`flex-1 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                <View className={`flex-row items-center gap-2 ${isDarkMode ? 'bg-black' : 'bg-white'} px-3.5 py-3 w-full`}>
                    <Image source={images.logo} style={styles.logo} className={`cursor-pointer`} />
                    <SearchBar />
                    <Image source={icons.filter} className={`cursor-pointer ${!isDarkMode && 'invert'}`} />
                </View>

                <FlatList
                    className="p-4"
                    data={allEvents}
                    keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                    renderItem={({ item }) => (
                        <Pressable className="mb-4 border-2 border-white rounded-lg p-2.5 cursor-pointer shadow-cardBoxShadow" onPress={() => openModal(item)}>
                            <View className="flex-row items-center gap-3">

                                <Image
                                    source={item.imageURL ? { uri: item.imageURL } : images.notFound}
                                    style={dynamicStyles.mainImage}
                                    defaultSource={images.notFound}
                                    className="rounded-md"
                                />

                                <View className="flex-1">
                                    <Text className={`font-viga ${isDarkMode ? 'text-white' : 'text-black'}`} style={dynamicStyles.titleText} numberOfLines={1} ellipsizeMode="tail">
                                        {item.name}
                                    </Text>
                                    <View className='flex-row items-center'>
                                        <Image defaultSource={images.calendarIcon} style={styles.calendarIcon}></Image>
                                        <Text className="text-grayCustom font-viga" style={dynamicStyles.dateText} numberOfLines={1} ellipsizeMode="tail">
                                            {(item.startTime || item.date) && formatDate(item.startTime ?? item.date)} - {(item.endTime || item.date) && formatDate(item.endTime ?? item.date)}
                                        </Text>
                                    </View>
                                    <Text className="text-grayLightCustom font-viga" style={dynamicStyles.descriptionText} numberOfLines={2} ellipsizeMode="tail">
                                        {item.details}
                                    </Text>
                                </View>

                            </View>
                        </Pressable>
                    )}
                    onEndReached={loadMoreEvents}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loading ? <ActivityIndicator size="large" color="white" /> : null}
                />
            </View>

            <EventModal isVisible={isModalVisible} onClose={closeModal} event={selectedEvent} />
        </Fragment>
    );
};

export default Events;

const styles = StyleSheet.create({
    logo: {
        width: 60,
        height: 60,
    },
    calendarIcon: {
        width: 20,
        height: 20
    }
});
