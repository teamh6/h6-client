import { RootContextProvider } from "./context";
import { RootNavigation } from "./navigations";

const App = () => {
  return (
    <RootContextProvider>
      <RootNavigation />
    </RootContextProvider>
  );
};
export default App;
