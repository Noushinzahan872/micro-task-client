import { useEffect, useState } from "react";

const useUserRole = (email) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:3000/users/${email}`)
        .then(res => res.json())
        .then(data => {
          setUserData(data);
          setLoading(false);
        });
    }
  }, [email]);

  return { userData, loading };
};

export default useUserRole;
