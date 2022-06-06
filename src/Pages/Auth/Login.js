import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
} from 'react-native';
import database from '@react-native-firebase/database';
import {Formik} from 'formik';
import * as yup from 'yup';

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
          <>
            <View style={[styles.inputContainer, {marginTop: 10}]}>
              <TextInput
                name="email"
                placeholder="Email Address"
                style={styles.textInput}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
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
              <Text style={styles.btnText}>Login Now</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{color: '#000', marginRight: 5}}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={{color: '#b12441', fontWeight: 'bold'}}>
                  Register Now
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  inputs: {
    borderBottomColor: 'black',
    color: 'black',
    paddingLeft: 10,
    flex: 1,
  },
  inputContainer: {
    borderRadius: 5,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    marginBottom: 10,
    borderColor: '#f6f6f6',
    borderWidth: 2,
    width: '90%',
  },
  btn: {
    backgroundColor: '#b12441',
    width: '90%',
    height: 50,
    borderRadius: 5,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },
  errorText: {fontSize: 12, color: 'red'}
});
