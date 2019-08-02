import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView, Keyboard, AsyncStorage, Alert } from 'react-native';
import { Form, Item, Input, Label, Button } from "native-base";

export default class AdddNewContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: ''
    }
  }

  static navigationOptions = {
    title: 'Add New Contact'
  };

  saveContact = async () => {
    if (this.state.firstName !== '' &&
        this.state.lastName !== '' &&
        this.state.phone !== '' &&
        this.state.email !== '' &&
        this.state.address !== '')
    {
      var contact = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address
      };
      await AsyncStorage.setItem(
        Date.now().toString(),
        JSON.stringify(contact)
      )
      .then(() => {this.props.navigation.goBack();})
      .catch(error => {console.log(error)});

    } else {
      Alert.alert('All fields are required!');
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {Keyboard.dismiss}}
      >
        <ScrollView style={styles.container}>
          <Form>
            <Item style={styles.inputItem}>
              <Label>First Name</Label>
              <Input
                style={styles.container}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='default'
                onChangeText={firstName => this.setState({firstName})}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Last Name</Label>
              <Input
                style={styles.container}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='default'
                onChangeText={lastName => this.setState({lastName})}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Phone Number</Label>
              <Input
                style={styles.container}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='number-pad'
                onChangeText={phone => this.setState({phone})}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Email</Label>
              <Input
                style={styles.container}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='email-address'
                onChangeText={email => this.setState({email})}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Address</Label>
              <Input
                style={styles.container}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='default'
                onChangeText={address => this.setState({address})}
              />
            </Item>
          </Form>
          <Button full rounded
            style={styles.button}
            onPress={() => {this.saveContact()}}
          >
            <Text style={styles.buttonText}>Save</Text>
          </Button>
          <View style={styles.empty}></View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  inputItem: {
    margin: 0
  },
  button: {
    backgroundColor: "#390359",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  empty: {
    height: 500,
    backgroundColor: "#fff"
  }
});
