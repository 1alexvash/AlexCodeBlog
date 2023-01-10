import { setAdmin } from "redux/slices/admin";
import { useAppDispatch } from "redux/typesHooks";

import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

interface Props {
  children: JSX.Element;
}

const getAdmin = (): boolean | undefined => {
  return localStorage.admin === "true";
};

const getInitialAdmin = (): boolean => getAdmin() || false;

const AdminProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useIsomorphicLayoutEffect(() => {
    const admin = getInitialAdmin();

    dispatch(setAdmin(admin));
  }, [dispatch]);

  return children;
};

export default AdminProvider;
