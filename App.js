import { createAppContainer, createStackNavigator } from "react-navigation";
import  Home  from "./screens/Home";
import  AddNewContact  from "./screens/AddNewContact";
import  EditContact  from "./screens/EditContact";
import  ViewContact from "./screens/ViewContact";

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Add: {screen: AddNewContact},
  Edit: {screen: EditContact},
  View: {screen: ViewContact},
},
{
  defaultNavigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#390359'
    },
    headerTitleStyle: {
      color: '#fff'
    }
  }
});

const App = createAppContainer(MainNavigator);
export default App;
