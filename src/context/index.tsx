import { createContext, useContext, useReducer, useEffect } from "react";

import { translations } from "../components/language/translate";
import { IAuthData } from "../types/auth";

interface IUserData {
  name: string;
  bio: string;
  email: string;
  privateKey: string;
  address: string;
}

export type AppState = {
  allNFT: string[];
  collectionNFT: string[];
  userInfo?: IUserData;
  usersInfo: IUserData[];
  auth: IAuthData;
  lang: string;
};

type ActionType<S, T> = {
  type: S;
  payload?: T;
};

type AuthState = ActionType<"auth", IAuthData>;

type Actions = AuthState;

interface IAppContext extends AppState{
  translateLang: (txt: string) => string;
  logout: () => void;
  dispatch: React.Dispatch<Actions>;
};

const INIT_STATE = {
  allNFT: [],
  collectionNFT: [],
  userInfo: undefined,
  usersInfo: [],
  auth: {
    id: "",
    isAuth: false,
    authMode: "",
    phoneNumber: "",
    nickname: "",
    email: "",
    address: "",
    biography: "",
    spotifyUrl: "",
    signer: {},
    privateKey: "",
    genres: [],
    videoTitle: "",
    videoUrl: "",
  },
  lang: "en",
};

const initialContext = {
  ...INIT_STATE,
  translateLang: (txt: string) => {
    return "";
  },
  logout: () => {},
  dispatch: () => {},
};

const BlockchainContext = createContext<IAppContext>(initialContext);

export function useBlockchainContext() {
  return useContext(BlockchainContext);
}

function reducer(state, { type, payload }) {
  return {
    ...state,
    [type]: payload,
  };
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  useEffect(() => {
    // checkPrice();
    // setTimeout(() => {
    //   checkPrice();
    // }, 15000);

    let savedLang = localStorage.getItem("lang");
    if (savedLang) setLanguage({ newLang: savedLang });
    else setLanguage({ newLang: "en" });
  }, []);

  // set language
  const setLanguage = (props) => {
    const { newLang } = props;
    dispatch({
      type: "lang",
      payload: newLang,
    });

    localStorage.setItem("lang", newLang);
  };

  const translateLang = (txt: string) => {
    return translations[state.lang][txt];
  };

  const logout = async () => {
    localStorage.clear();
  };

  return (
    <BlockchainContext.Provider
      value={{
        ...state,
        dispatch,
        setLanguage,
        translateLang,
        logout,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
}
