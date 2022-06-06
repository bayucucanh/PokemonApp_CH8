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
import uuid from 'react-native-uuid';
import {Formik} from 'formik';
import * as yup from 'yup';

const Register = props => {

  const registerValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    name: yup
      .string()
      .min(2, 'To Short!')
      .max(50, 'To Long!')
      .required('Required'),
    bio: yup
      .string()
      .min(2, 'To Short!')
      .max(50, 'To Long!')
      .required('Required'),
  });

  const onRegisterWithRDB = async values => {
    if (
      values.name === '' ||
      values.email === '' ||
      values.password === '' ||
      values.bio === ''
    ) {
      Alert.alert('Error', 'Harap isi Semua field');
      return false;
    }
    let data = {
      id: uuid.v4(),
      name: values.name,
      emailId: values.email,
      password: values.password,
      about: values.bio,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&usqp=CAU',
    };
    try {
      database()
        .ref('/users/' + data.id)
        .set(data)
        .then(() => {
          Alert.alert('Success', 'Register Successfully!');
          props.navigation.navigate('LoginScreen');
        });
    } catch (error) {
      Alert.alert('Error', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Formik
        validationSchema={registerValidationSchema}
        initialValues={{email: '', password: '', name: '', bio: ''}}
        onSubmit={values => onRegisterWithRDB(values)}>
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
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <View style={[styles.inputContainer, {marginTop: 10}]}>
              <TextInput
                name="name"
                placeholder="Your Name"
                style={styles.textInput}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                keyboardType="email-address"
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <View style={[styles.inputContainer, {marginTop: 10}]}>
              <TextInput
                name="bio"
                placeholder="Your Bio"
                style={styles.textInput}
                onChangeText={handleChange('bio')}
                onBlur={handleBlur('bio')}
                value={values.bio}
                keyboardType="email-address"
              />
            </View>
            {errors.bio && (
              <Text style={styles.errorText}>{errors.bio}</Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.btn}
              disabled={!isValid}>
              <Text style={styles.btnText}>Register Now</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{color: '#000', marginRight: 5}}>
                have an account?
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('LoginScreen')}>
                <Text style={{color: '#b12441', fontWeight: 'bold'}}>
                  Login Now
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
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
