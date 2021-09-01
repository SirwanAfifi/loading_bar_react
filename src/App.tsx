import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { ReactComponent as Linear } from "./assets/LinearLoading.svg";
import { ReactComponent as Circular } from "./assets/CircularLoading.svg";
import { getUsers } from "./services/user";
import { User } from "./types/User";

function App() {
  let timer: number;
  const [progress, setProgress] = useState(0);
  const { data, isLoading } = useQuery<User[]>("users", () => getUsers(), {
    onSuccess: () => clearInterval(timer),
  });

  useEffect(() => {
    timer = setInterval(() => {
      setProgress((prev) => {
        if (prev === 100) {
          return 0;
        }
        return Math.min((prev + Math.random() * 20) % 100, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      {isLoading && <TopbarLoading value={progress} />}
      {isLoading && <Circular className="circular" />}
      {data && (
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const TopbarLoading = styled(Linear)<{ value?: number }>`
  #progress rect {
    transition: width 0.5s;
    width: ${(props) => (props.value && `${props.value}px`) || "unset"};
  }
`;

export default App;
