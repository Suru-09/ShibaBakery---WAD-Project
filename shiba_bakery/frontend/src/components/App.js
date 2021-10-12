import React from "react";
import Signup from "./signup";

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <div className="App">
                <Signup/>
            </div>
        );
    }

}

// return(
//     <div className="App">
//         <Signup/>
//     </div>
// )

//export default App;