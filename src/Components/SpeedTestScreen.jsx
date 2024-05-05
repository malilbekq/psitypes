import TextField from "./TextField";
import './SpeedTestScreen.css'
import Header from "./Header";
import TestData from "./TestData";

const SpeedTestScreen = () => {
    return (
        <div className="container-app">
            <Header />
            <TextField />
            <TestData />
        </div>
    );
}

export default SpeedTestScreen;