import { RecoilRoot } from "recoil";

import RoutesList from "./routes";
import DebugObserver from "./component/DebugObserver";
import { initRecoilState } from "./recoil/utils";

function App() {
  return (
    <RecoilRoot initializeState={initRecoilState}>
      <DebugObserver />
      <RoutesList />
    </RecoilRoot>

  );
}

export default App;
