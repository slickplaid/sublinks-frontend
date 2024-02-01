'use client';

import SublinksApi from '@/utils/client';
import React, {
  createContext, useEffect, useMemo, useState
} from 'react';
import { MyUserInfo } from 'sublinks-js-client';

interface UserContextState {
  myUser?: MyUserInfo;
  saveMyUserFromSite: () => void;
}

export const UserContext = createContext<UserContextState>({
  saveMyUserFromSite: () => {}
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [myUser, setMyUser] = useState<MyUserInfo>();

  const saveMyUserFromSite = async () => {
    const site = await SublinksApi.Instance().Client().getSite();

    if (site.my_user) {
      setMyUser(site.my_user);
    }
  };

  useEffect(() => {
    saveMyUserFromSite();
  }, []);

  const providerValue = useMemo((): UserContextState => ({
    myUser,
    saveMyUserFromSite
  }), [myUser]);

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};

export default UserProvider;
