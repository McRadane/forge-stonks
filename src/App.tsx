import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Crafts } from './craft/Crafts';
import { OptionsSwitcher } from './options/OptionsSwitcher';
import { persistor, store } from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <OptionsSwitcher />
          <Crafts />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
