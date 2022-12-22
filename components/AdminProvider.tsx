import { Admin, defaultPremissions, setAdmin } from "redux/slices/admin";
import { useAppDispatch } from "redux/typesHooks";

import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

interface Props {
  children: JSX.Element;
}

const getStoragePremissions = (): Admin | undefined => {
  return localStorage.admin;
};

const getInitialAdmin = (): Admin =>
  getStoragePremissions() || defaultPremissions;

const AdminProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useIsomorphicLayoutEffect(() => {
    const admin = getInitialAdmin();

    dispatch(setAdmin(admin));
  }, [dispatch]);

  return children;
};

export default AdminProvider;
