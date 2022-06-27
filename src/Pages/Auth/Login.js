import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import database from '@react-native-firebase/database';
import {Formik} from 'formik';
import * as yup from 'yup';
import { TextInput } from 'react-native-paper';


const Login = ({navigation}) => {
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  const onLoginRDB = values => {
    try {
      database()
        // Pilih file users
        .ref('/users/')
        .orderByChild('emailId')
        // sama dengan email
        .equalTo(values.email)
        // setiap data yang kita terima kita eksekusi
        .once('value')
        // Jika success maka
        .then(async snapshot => {
          // Jika value snapshot kosong
          if (snapshot.val() == null) {
            Alert.alert('Invalid Email Id');
            return false;
          }
          // user data diisi oleh object value snapshot
          let userData = Object.values(snapshot.val())[0];
          // Jika password tidak sama
          if (userData?.password != values.password) {
            Alert.alert('Error', 'Invalid Password!');
            return false;
          }
          console.log('User data: ', userData);
          navigation.replace('HomeScreen', {userData: userData});
        });
      // Jika error maka alert error
    } catch (error) {
      Alert.alert('Error', 'Not Found User');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to your Account</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={values => onLoginRDB(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <View> 
            <View style={[styles.inputContainer, {marginTop: 10}]}>
              
              <TextInput
                name="email"
                placeholder="Email"
                label='Email'
                style={styles.inputs}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                mode="outlined"
                activeOutlineColor='#000'
                outlineColor='#544'
                left={<TextInput.Icon name='message' />}
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <View style={[styles.inputContainer, {marginTop: 10}]}>
              <TextInput
                style={styles.inputs}
                name="password"
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
                mode="outlined"
                label='Password'
                activeOutlineColor='#000'
                outlineColor='#544'
                left={<TextInput.Icon name='message' />}
              />
            </View>
            {errors.password && (
              <Text style={styles.errorText}>
                {errors.password}
              </Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.btn}
              disabled={!isValid}>
              <Text style={styles.btnText}>Sign In</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', marginVertical: 20, color: '#000', fontWeight: '600' }}>or continue with</Text>
            <View style={styles.goRegister}>
              <Text style={{marginRight: 5, textAlign: 'center'}}>
                Dont have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={{color: '#000', fontWeight: 'bold'}}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 16, backgroundColor: '#ffffff' },
  title: {
    fontSize: 43,
    fontWeight: '600',
    color: '#000',
    marginTop: 71,
    marginBottom: 90,
    maxWidth: '90%'
  },
  inputs: {
    borderBottomColor: 'black',
    color: 'black',
    paddingLeft: 10,
    backgroundColor: '#F6F8FC',
  },
  inputContainer: {
    borderRadius: 15,
    height: 54,
    // flexDirection: 'row',
    // alignItems: 'center',
   
    marginBottom: 10,
    borderColor: '#F6F8FC',
    borderWidth: 2,
    width: '100%',
  },
  btn: {
    backgroundColor: '#000',
    width: '100%',
    height: 50,
    borderRadius: 100,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    marginTop: 2,
    textTransform: 'capitalize'
  },
  errorText: {fontSize: 12, color: 'red', marginLeft: 5, marginTop: 5},
  goRegister: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  }
});
