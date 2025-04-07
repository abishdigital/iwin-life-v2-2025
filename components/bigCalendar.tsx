import { Button, Modal, Pressable, StyleSheet, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-native-big-calendar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';

interface EventModalProps {
    isVisible: boolean;
    onClose: () => void;
    events: any[];
}

const BigCalendar: React.FC<EventModalProps> = ({ isVisible, onClose, events }) => {

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const [mode, setMode] = useState<'month' | 'week' | 'day'>('month');
    const [date, setDate] = useState(new Date());
    const [eventsCalendar, setEventsCalendar] = useState<any[]>([]);

    const handleToday = () => {
        setDate(new Date());
    };

    const handleNext = () => {
        const newDate = new Date(date);
        if (mode === 'month') newDate.setMonth(newDate.getMonth() + 1);
        if (mode === 'week') newDate.setDate(newDate.getDate() + 7);
        if (mode === 'day') newDate.setDate(newDate.getDate() + 1);
        setDate(newDate);
    };

    const handleBack = () => {
        const newDate = new Date(date);
        if (mode === 'month') newDate.setMonth(newDate.getMonth() - 1);
        if (mode === 'week') newDate.setDate(newDate.getDate() - 7);
        if (mode === 'day') newDate.setDate(newDate.getDate() - 1);
        setDate(newDate);
    };

    const getTodayWithFormattedTime = (date: string, time: string) => {
        const currentDate = new Date(date);
        const [timePart, modifier] = time.split(' ');
        let [hours, minutes] = timePart.split(':').map(Number);

        if (modifier === 'PM' && hours < 12) {
            hours += 12;
        } else if (modifier === 'AM' && hours === 12) {
            hours = 0;
        }

        currentDate.setHours(hours, minutes, 0, 0);

        return currentDate.toISOString();
    }

    const setEventsBasedConditions = (data: any) => {
        const updatedEvents: any = [...events, ...data];
        setEventsCalendar(updatedEvents.map((value: any, index: number) => {
            let start, end;

            if (value.date) {
                const time = value.time?.split('–') || [];

                if (value.time === 'All day' || value.time === 'Time not specified') {
                    start = new Date(getTodayWithFormattedTime(value.date, '1:00 AM'));
                    end = new Date(getTodayWithFormattedTime(value.date, '11:59 PM'));
                } else if (time.length > 1) {
                    start = new Date(getTodayWithFormattedTime(value.date, time[0].trim()));
                    end = new Date(getTodayWithFormattedTime(value.date, time[1].trim()));
                } else {
                    start = new Date(getTodayWithFormattedTime(value.date, value.time));
                    end = new Date(getTodayWithFormattedTime(value.date, value.time));
                }
            } else {
                start = new Date(value.startTime);
                end = new Date(value.endTime);
            }

            return { title: value.name, start, end };
        }));
    }

    useEffect(() => {
        if (events) {
            setEventsBasedConditions(events)
        }
    }, [events])

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

                            <View className='flex-row justify-between font-viga my-4 gap-1'>
                                {/* Navigation Buttons */}
                                <View className='flex-row justify-start gap-1 font-viga'>
                                    <button className='font-viga p-2 text-sm bg-cyan-500 text-white rounded-md' onClick={handleBack}>Back</button>
                                    <button className='font-viga p-2 text-sm bg-cyan-500 text-white rounded-md' onClick={handleToday}>Today</button>
                                    <button className='font-viga p-2 text-sm bg-cyan-500 text-white rounded-md' onClick={handleNext}>Next</button>
                                </View>

                                {/* View Switcher */}
                                <View className='flex-row justify-end gap-1 font-viga'>
                                    <button className='font-viga p-2 text-sm bg-cyan-500 text-white rounded-md' onClick={() => setMode('month')}>Month</button>
                                    <button className='font-viga p-2 text-sm bg-cyan-500 text-white rounded-md' onClick={() => setMode('week')}>Week</button>
                                    <button className='font-viga p-2 text-sm bg-cyan-500 text-white rounded-md' onClick={() => setMode('day')}>Day</button>
                                </View>
                            </View>

                            {/* Calendar Component */}
                            <Calendar
                                events={eventsCalendar}
                                height={600}
                                mode={mode}
                                date={date}
                                swipeEnabled={true}
                                showTime={mode !== 'month'}
                            />
                        </Pressable>
                    </View>
                </Pressable>
            </View>
        </Modal>
    )
}

export default BigCalendar;

const styles = StyleSheet.create({
    modalContent: {
        width: '100%',
        maxWidth: 1500,
    },
});