import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import {Formik} from 'formik';
import * as yup from 'yup';
import { TextInput } from 'react-native-paper';


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
    <View style={styles.container}>
      <Text style={styles.title}>Create your Account</Text>
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
                left={<TextInput.Icon name='message' />}
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
                left={<TextInput.Icon name='message' />}
              />
            </View>
            {errors.name && (
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
                left={<TextInput.Icon name='message' />}
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
            <View style={styles.goRegister}>
              <Text style={{marginRight: 5, textAlign: 'center'}}>
                have an account?
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('LoginScreen')}>
                <Text style={{color: '#000', fontWeight: 'bold'}}>
                  Login
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
  container: {flex: 1, paddingHorizontal: 16, backgroundColor: '#ffffff' },
  title: {
    fontSize: 43,
    fontWeight: '600',
    color: '#000',
    marginTop: 71,
    marginBottom: 10,
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
    marginTop: 17
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
