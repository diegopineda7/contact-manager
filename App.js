import { createAppContainer, createStackNavigator } from "react-navigation";
import { Home } from "./screens/Home";
import { AddNewContact } from "./screens/AddNewContact";
import { EditContact } from "./screens/EditContact";
import { ViewContact } from "./screens/ViewContact";

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Add: {screen: AddNewContact},
  Edit: {screen: EditContact},
  View: {screen: ViewContact},
},
{
  navigationOptions: {
    headerTintColor: '#fff',
    headerTitleStyle: {
      backgroundColor: '#390359',
      color: '#fff'
    }
  }
});

const App = createAppContainer(MainNavigator);
export default App;
