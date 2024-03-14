import logo from './logo.svg';
import './App.css';
import {SideMenu} from './components/SideMenu';
function App() {

  return (
    <div className="App">
      <header className="App-header">

        {/*顶部信息栏*/}
        <div className="Top-info" style={{margin:"5vh",display:"flex",flexDirection:"row",height: 10,alignItems:"center"}}>
          <img src={logo} className="App-logo" alt="logo" />
          <>这是一个测试</>
        </div>

        {/*主界面部分*/}
        <div className="Body" style={{width:"100vw",display:"flex",flexDirection:"row",alignItems:"flex-start",background:"yellow"}}>
          {/*侧边导航栏*/}
          <SideMenu className="Side-menu" />
            {/*主界面*/}
          <div
              className="Main-content"
              style={{
                flex: 1,
                width: "85vw",
                height: '100vh',
                background: 'blue',
              }}
            >
          </div>
        </div>



        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>*/}
        {/*  Edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        {/*<a*/}
        {/*  className="App-link"*/}
        {/*  href="https://reactjs.org"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Learn React*/}
        {/*</a>*/}
      </header>



    </div>
  );
}

export default App;
