import { Image, Modal, StyleSheet, Text, Pressable, View, useColorScheme } from 'react-native'
import React from 'react'
import { images } from '@/constants/images';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface EventModalProps {
    isVisible: boolean;
    onClose: () => void;
    event: any;
}

const EventModal: React.FC<EventModalProps> = ({ isVisible, onClose, event }) => {

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
    };

    const getHastags = (name: string) => {
        return name ? `#${name.split(' ').join(' #')}` : ``;
    }

    const getKeywords = (name: string) => {
        return name ? `${name.split(' ').join(', ')}` : ``;
    }

    return (
        <Modal visible={isVisible} onRequestClose={onClose} transparent animationType="slide" className={`m-0 flex items-center justify-center`}>
            <View className="modalContainer">
                <Pressable onPress={onClose}>
                    <View className={`mx-auto p-5 rounded-lg ${isDarkMode ? 'bg-black' : 'bg-white'}`} style={styles.modalContent}>
                        <Pressable>
                            <View className={`flex-row items-center justify-between`}>
                                <Text className={`font-viga w-full ${isDarkMode ? 'text-white' : 'text-black'}`}>Event Details</Text>
                                <Pressable onPress={onClose}>
                                    <Icon name="close" size={20} color={`${isDarkMode ? 'white' : 'black'}`} className={`cursor-pointer`} />
                                </Pressable>
                            </View>
                            <View style={styles.imageContainer}>
                                <Image defaultSource={images.notFound} source={event?.imageURL} style={styles.mainImage}></Image>
                            </View>
                            <Text className={`text-lg font-bold flex flex-row items-center font-viga ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                {event?.name} <Image defaultSource={images.securityIcon}></Image>
                            </Text>
                            <Text className={`text-grayCustom flex flex-row items-center font-viga`} style={styles.mt5}>
                                <Image defaultSource={images.calendarIcon}></Image>
                                {(event?.startTime || event?.date) && formatDate(event?.startTime ?? event?.date)} -
                                {(event?.endTime || event?.date) && formatDate(event?.endTime ?? event?.date)}
                            </Text>
                            <Text className={`text-grayLightCustom font-viga`} style={styles.mt5}>
                                {event?.details}
                            </Text>
                            <Text className={`text-grayCustom font-bold font-viga`} style={styles.mt5}>Hashtags</Text>
                            <Text className={`text-grayLightCustom font-viga`} style={styles.mt3}>{getHastags(event?.name)}</Text>
                            <Text className={`text-grayCustom font-bold font-viga`} style={styles.mt5}>Keywords</Text>
                            <Text className={`text-grayLightCustom font-viga`} style={styles.mt3}>{getKeywords(event?.name)}</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </View>
        </Modal>
    )
}

export default EventModal;

const styles = StyleSheet.create({
    modalContent: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: 'red'
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1.5,
        overflow: 'hidden',
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 8,
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    mt5: {
        marginTop: 5
    },
    mt3: {
        marginTop: 3
    }
});