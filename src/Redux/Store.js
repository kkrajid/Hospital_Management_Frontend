
import { combineReducers } from "redux";
import { createStore } from "redux";
import otpReducer from "./Reducers/otpReducer"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

const rootReducer = combineReducers({
    otpVerification: otpReducer,
})

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };
