import React, { useState } from 'react'
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native'
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import { StylesAlertConfim } from './AlertConfirmStyles';

interface IAlertConfirmProps {
    show: boolean;
    onClose: () => void;
    textConfirm: string;
    onConfirm: () => void;
    title: string;
    message: string;
    isDanger?: boolean; // Opcional: porque se usa como prop booleana sin valor (isDanger en vez de isDanger={true})
}


export const AlertConfirm = ({
    show,
    onClose,
    textConfirm,
    onConfirm,
    title,
    message,
    isDanger,
}: IAlertConfirmProps) => {

    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        try {
            setLoading(true);
            await onConfirm();
            onClose();
        } catch (error) {
            console.error('Error on confirm:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                visible={show}
                transparent
                animationType="fade"
                onRequestClose={onClose}
            >
                <View style={StylesAlertConfim.overlay}>
                    <View style={StylesAlertConfim.container}>
                        <Text style={StylesAlertConfim.title}>{title}</Text>
                        <Text style={StylesAlertConfim.message}>{message}</Text>

                        <View style={StylesAlertConfim.buttons}>
                            <TouchableOpacity style={StylesAlertConfim.cancelButton} onPress={onClose}>
                                <Text style={StylesAlertConfim.cancelText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    StylesAlertConfim.confirmButton,
                                    isDanger && StylesAlertConfim.dangerButton,
                                    loading && StylesAlertConfim.disabledButton,
                                ]}
                                onPress={handleConfirm}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={StylesAlertConfim.confirmText}>{textConfirm}</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>

    )
}
