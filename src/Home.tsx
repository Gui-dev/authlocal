import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'

import { styles } from './style'

export const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const verifyAvailableAuthentication = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync()
    console.log('Compatible: ', compatible)
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync()
    console.log('TYPES: ', types.map(type => LocalAuthentication.AuthenticationType[type]))
  }

  const handleAuthentication = async () => {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync()
    if (!isBiometricEnrolled) {
      return Alert.alert('Login', 'Nenhuma bimetria encontrada. Por favor, cadastre no dispositivo!')
    }
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com Biometria',
      fallbackLabel: 'Biometria não reconhecida'
    })
    setIsAuthenticated(auth.success)
  }

  useEffect(() => {
    verifyAvailableAuthentication()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.text}>
        Hello World: {isAuthenticated ? 'Sim' : 'Não'}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleAuthentication}
      >
        <Text style={styles.buttonText}>
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  )
}
