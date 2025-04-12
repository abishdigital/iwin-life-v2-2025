import { addEvent } from '@/services/eventsApi';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';

const emptyEvent = {
    name: '',
    date: '',
    time: '',
    location: '',
    details: '',
    contact: '',
    phone: '',
    email: '',
    website: '',
    imageURL: '',
    isBookable: false,
}

const AddEvent = () => {
    const [formData, setFormData] = useState(emptyEvent);

    const [errors, setErrors] = useState({
        name: '',
        date: '',
        time: '',
        location: '',
        details: '',
        contact: '',
        phone: '',
        email: '',
        website: '',
        imageURL: '',
    });

    const handleInputChange = (name: any, value: any) => {
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let validationErrors: any = {};
        let isValid = true;

        if (!formData.name) {
            validationErrors.name = 'Event name is required.';
            isValid = false;
        }
        if (!formData.date) {
            validationErrors.date = 'Event date is required.';
            isValid = false;
        }
        if (!formData.time) {
            validationErrors.time = 'Event time is required.';
            isValid = false;
        }
        if (!formData.location) {
            validationErrors.location = 'Event location is required.';
            isValid = false;
        }
        if (!formData.details) {
            validationErrors.details = 'Event details is required.';
            isValid = false;
        }
        // if (!formData.contact) {
        //     validationErrors.contact = 'Contact person is required.';
        //     isValid = false;
        // }
        // if (!formData.phone) {
        //     validationErrors.phone = 'Phone number is required.';
        //     isValid = false;
        // }
        // if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        //     validationErrors.email = 'Valid email is required.';
        //     isValid = false;
        // }
        if (!formData.website) {
            validationErrors.website = 'Website is required.';
            isValid = false;
        }
        if (!formData.imageURL) {
            validationErrors.imageURL = 'Image URL is required.';
            isValid = false;
        }

        setErrors(validationErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const response = await addEvent(formData);
                if (response.success) {
                    setFormData(emptyEvent)
                    Alert.alert('Success', 'Event added successfully');
                } else {
                    Alert.alert('Failed', 'Event failed successfully');
                }
            } catch (err: any) {
                Alert.alert(err.message);
            }
        } else {
            console.log('Form Validation Failed.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.heading} className="font-viga">Add Event Form</Text>

                <TextInput
                    style={styles.input}
                    className="font-viga"
                    placeholder="Name"
                    value={formData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                />
                {errors.name && <Text style={styles.errorText} className='font-viga'>{errors.name}</Text>}

                <TextInput
                    style={styles.input}
                    className="font-viga"
                    placeholder="Date"
                    value={formData.date}
                    onChangeText={(text) => handleInputChange('date', text)}
                />
                {errors.date && <Text style={styles.errorText} className='font-viga'>{errors.date}</Text>}

                <TextInput
                    style={styles.input}
                    className="font-viga"
                    placeholder="Time"
                    value={formData.time}
                    onChangeText={(text) => handleInputChange('time', text)}
                />
                {errors.time && <Text style={styles.errorText} className='font-viga'>{errors.time}</Text>}

                <TextInput
                    style={styles.input}
                    className="font-viga"
                    placeholder="Location"
                    value={formData.location}
                    onChangeText={(text) => handleInputChange('location', text)}
                />
                {errors.location && <Text style={styles.errorText} className='font-viga'>{errors.location}</Text>}

                <TextInput
                    style={[styles.input, styles.textArea]}
                    className="font-viga"
                    placeholder="Details"
                    value={formData.details}
                    onChangeText={(text) => handleInputChange('details', text)}
                    multiline={true}
                    numberOfLines={4}
                />
                {errors.details && <Text style={styles.errorText} className='font-viga'>{errors.details}</Text>}

                <TextInput
                    style={styles.input}
                    className="font-viga"
                    placeholder="Contact"
                    value={formData.contact}
                    onChangeText={(text) => handleInputChange('contact', text)}
                />
                {errors.contact && <Text style={styles.errorText} className='font-viga'>{errors.contact}</Text>}

                <TextInput
                    style={styles.input}
                    className="font-viga"
                    placeholder="Phone"
                    value={formData.phone}
                    onChangeText={(text) => handleInputChange('phone', text)}
                />
                {errors.phone && <Text style={styles.errorText} className='font-viga'>{errors.phone}</Text>}

                <TextInput
                    style={styles.input}
                    className="font-viga"
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                />
                {errors.email && <Text style={styles.errorText} className='font-viga'>{errors.email}</Text>}

                <TextInput
                    style={styles.input}
                    className="font-viga"
                    placeholder="Website"
                    value={formData.website}
                    onChangeText={(text) => handleInputChange('website', text)}
                />
                {errors.website && <Text style={styles.errorText} className='font-viga'>{errors.website}</Text>}

                <TextInput
                    style={styles.input}
                    className="font-viga"
                    placeholder="Image URL"
                    value={formData.imageURL}
                    onChangeText={(text) => handleInputChange('imageURL', text)}
                />
                {errors.imageURL && <Text style={styles.errorText} className='font-viga'>{errors.imageURL}</Text>}

                <View style={styles.checkboxContainer} className="flex-row items-center gap-2">
                    <Text className="font-viga">Is Bookable:</Text>
                    <Button
                        title={formData.isBookable ? "Yes" : "No"}
                        onPress={() => handleInputChange('isBookable', !formData.isBookable)}
                    />
                </View>

                <Button title="Submit" onPress={handleSubmit} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        paddingBlock: 10,
    },
    checkboxContainer: {
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 5,
        marginTop: -6
    },
});

export default AddEvent;