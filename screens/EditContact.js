import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Keyboard, AsyncStorage, Alert } from 'react-native';
import { Form, Item, Label, Input, Button } from 'native-base';

export default class EditContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      key: ''
    }
  }

  static navigationOptions = {
    title: 'Edit Contact'
  };

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('willFocus', () => {
      var key = this.props.navigation.getParam('key', '');
      this.getContact(key);
    });
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
    .then(
      contactJsonString => {
        var contact = JSON.parse(contactJsonString);
        contact['key'] = key;
        this.setState(contact);
      }
    )
    .catch(error => {
      console.log(error);
    });
  }

  updateContact = async key => {
    if (this.state.firstName !== '' &&
        this.state.lastName !== '' &&
        this.state.phone !== '' &&
        this.state.email !== '' &&
        this.state.address !== '') {
      var contact = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address
      };
      await AsyncStorage.mergeItem(key, JSON.stringify(contact))
      .then(() => {          
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log(error)
      });
    } else {
      Alert.alert('All fields are required!');
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss()
      }}>
        <ScrollView style={styles.container}>
          <Form>
            <Item style={styles.inputItem}>
              <Label>First Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='default'
                value={this.state.firstName}
                onChangeText={firstName => {
                  this.setState({firstName});
                }}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Last Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='default'
                value={this.state.lastName}
                onChangeText={lastName => {
                  this.setState({lastName});
                }}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Phone</Label>
              <Input
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='number-pad'
                value={this.state.phone}
                onChangeText={phone => {
                  this.setState({phone});
                }}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='email-address'
                value={this.state.email}
                onChangeText={email => {
                  this.setState({email});
                }}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Address</Label>
              <Input
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='default'
                value={this.state.address}
                onChangeText={address => {
                  this.setState({address});
                }}
              />
            </Item>
          </Form>
          <Button full rounded
            style={styles.button}
            onPress={() => {
              this.updateContact(this.state.key)
            }}
          >
            <Text style={styles.buttonText}>Update</Text>
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
    margin: 10
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
