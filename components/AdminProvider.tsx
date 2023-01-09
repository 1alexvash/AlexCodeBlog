import { Admin, setAdmin } from "redux/slices/admin";
import { useAppDispatch } from "redux/typesHooks";

import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

interface Props {
  children: JSX.Element;
}

const getAdmin = (): Admin | undefined => {
  return JSON.parse(localStorage.admin);
};

const getInitialAdmin = (): Admin => getAdmin() || false;

const AdminProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useIsomorphicLayoutEffect(() => {
    const admin = getInitialAdmin();

    dispatch(setAdmin(admin));
  }, [dispatch]);

  return children;
};

export default AdminProvider;
