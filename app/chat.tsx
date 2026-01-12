import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../src/theme';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

export default function ChatScreen() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hello! I am your Health Assistant. How can I help you today?', sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const flatListRef = useRef<FlatList>(null);

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate Bot Response
        setTimeout(() => {
            let botText = "I see. Could you tell me more?";
            if (input.toLowerCase().includes('heart') || input.toLowerCase().includes('cardio')) {
                botText = "It sounds like you might need to see a Cardiologist. Dr. Wilson is highly recommended. Would you like to view her profile?";
            } else if (input.toLowerCase().includes('headache') || input.toLowerCase().includes('pain')) {
                botText = "Persistent headaches can be serious. I suggest consulting a Neurologist like Dr. Michael Brown.";
            } else if (input.toLowerCase().includes('appointment')) {
                botText = "You can book an appointment by selecting a doctor from the Home screen.";
            }

            const botMsg: Message = { id: (Date.now() + 1).toString(), text: botText, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    useEffect(() => {
        flatListRef.current?.scrollToEnd();
    }, [messages]);

    const renderItem = ({ item }: { item: Message }) => (
        <View style={[
            styles.messageBubble,
            item.sender === 'user' ? styles.userBubble : styles.botBubble
        ]}>
            <Text style={[
                styles.messageText,
                item.sender === 'user' ? styles.userText : styles.botText
            ]}>{item.text}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>AI Health Assistant</Text>
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type your health concern..."
                        value={input}
                        onChangeText={setInput}
                        placeholderTextColor={Colors.textLight}
                    />
                    <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                        <Ionicons name="send" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightBorder,
        backgroundColor: Colors.card,
    },
    backBtn: {
        padding: Spacing.xs,
        marginRight: Spacing.sm,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
    },
    list: {
        padding: Spacing.md,
        paddingBottom: Spacing.xl,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: Spacing.md,
        borderRadius: 16,
        marginBottom: Spacing.md,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.primary,
        borderBottomRightRadius: 4,
    },
    botBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#E9ECEF',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 22,
    },
    userText: {
        color: '#fff',
    },
    botText: {
        color: Colors.text,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.lightBorder,
        backgroundColor: Colors.card,
    },
    input: {
        flex: 1,
        height: 44,
        backgroundColor: Colors.background,
        borderRadius: 22,
        paddingHorizontal: Spacing.md,
        marginRight: Spacing.sm,
        fontSize: 16,
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
